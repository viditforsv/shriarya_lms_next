Got it—let’s fix this at the DB/RLS layer so any **logged-in user** can enroll in **any free course**, while keeping things safe (no impersonation, no duplicates) and leaving room for admins.

I’ll give you drop-in SQL you can run in Supabase SQL editor.

# 1) Safe helpers (SECURITY DEFINER functions)

These avoid RLS cross-table gotchas inside policies.

```sql
-- 1A) Is current user an admin?
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

grant execute on function public.is_admin() to anon, authenticated;

-- 1B) Is a course free?
create or replace function public.course_is_free(c uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.courses
    where id = c and is_free = true
  );
$$;

grant execute on function public.course_is_free(uuid) to anon, authenticated;

-- 1C) Is current user already enrolled in a course?
create or replace function public.is_enrolled(c uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.enrollments
    where course_id = c and student_id = auth.uid() and is_active = true
  );
$$;

grant execute on function public.is_enrolled(uuid) to anon, authenticated;
```

# 2) Hardening (constraints & defaults)

```sql
-- Prevent duplicate enrollments
alter table public.enrollments
  add constraint enrollments_unique_student_course
  unique (student_id, course_id);

-- Optional: enforce that student_id defaults to the caller
-- (keeps client code simple; policies will still verify)
create or replace function public.set_enrollment_student_to_uid()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.student_id is null then
    new.student_id := auth.uid();
  end if;
  return new;
end;
$$;

drop trigger if exists t_set_enrollment_student_to_uid on public.enrollments;

create trigger t_set_enrollment_student_to_uid
before insert on public.enrollments
for each row execute function public.set_enrollment_student_to_uid();
```

# 3) Enable RLS

```sql
alter table public.courses      enable row level security;
alter table public.enrollments  enable row level security;
alter table public.lessons      enable row level security;
alter table public.resources    enable row level security;
alter table public.profiles     enable row level security;
```

# 4) Policies

## 4A) `profiles` (minimal read so `is_admin()` works if you ever query directly)

If you don’t plan to query `profiles` from the client, you can skip a broad SELECT policy. The helper functions run as definer and don’t need it. But many apps still want self-read:

```sql
-- Users can see their own profile
create policy "profiles: user can select own row"
on public.profiles
for select
to authenticated
using (id = auth.uid());

-- Users can update their own profile (optional)
create policy "profiles: user can update own row"
on public.profiles
for update
to authenticated
using (id = auth.uid());
```

## 4B) `courses`

- Any user (even anon) can _view_ courses list if you like. If you want only logged-in users, change `to authenticated`.

```sql
-- Publicly readable course list (toggle to 'authenticated' if needed)
create policy "courses: anyone can read"
on public.courses
for select
to anon, authenticated
using (true);

-- Admins manage courses
create policy "courses: admins can insert/update/delete"
on public.courses
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());
```

## 4C) `enrollments`

- Key part: allow any **authenticated** user to insert an enrollment **only for themselves** and **only when the course is free**.
- They can read their own enrollments; admins can read all.

```sql
-- Users can see their own enrollments
create policy "enrollments: user can read own"
on public.enrollments
for select
to authenticated
using (student_id = auth.uid() or public.is_admin());

-- Users can enroll into free courses (self only)
create policy "enrollments: user can insert for free courses"
on public.enrollments
for insert
to authenticated
with check (
  -- must be for self
  (student_id = auth.uid() or student_id is null)
  -- only free course
  and public.course_is_free(course_id)
);

-- (Optional) Allow users to cancel (set is_active=false) their own enrollment
create policy "enrollments: user can update own"
on public.enrollments
for update
to authenticated
using (student_id = auth.uid())
with check (student_id = auth.uid());

-- Admins can manage all enrollments
create policy "enrollments: admins full access"
on public.enrollments
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());
```

## 4D) `lessons` and `resources` (access to free content)

- Anyone can see previews (`is_preview = true`).
- Enrolled users (or admins) can view full course content.

```sql
-- LESSONS
create policy "lessons: preview is public"
on public.lessons
for select
to anon, authenticated
using (is_preview = true);

create policy "lessons: enrolled or admin can view"
on public.lessons
for select
to authenticated
using (
  public.is_admin()
  or public.is_enrolled(course_id)
);

-- RESOURCES
create policy "resources: preview is public"
on public.resources
for select
to anon, authenticated
using (exists (
  select 1 from public.lessons l
  where l.id = resources.lesson_id
    and l.is_preview = true
));

create policy "resources: enrolled or admin can view"
on public.resources
for select
to authenticated
using (
  public.is_admin()
  or exists (
    select 1
    from public.lessons l
    where l.id = resources.lesson_id
      and public.is_enrolled(l.course_id)
  )
);
```

# 5) Client-side: minimal insert

With the trigger + policy, your client can simply do:

```ts
// supabase.from('enrollments').insert({ course_id })
```

…and it will:

- set `student_id = auth.uid()` automatically,
- succeed only if the course is free,
- obey the unique constraint (no duplicates).

# 6) Quick debug checklist (if it still fails)

1. **Auth session present?** Make sure the client is logged in (using `supabase.auth.getSession()`).
2. **Course really free?** `select is_free from courses where id = $id;`
3. **RLS enabled?** (`select relrowsecurity from pg_class where relname='enrollments';`)
4. **Conflicting old policies?** Drop or rename legacy policies that might deny inserts.
5. **Unique violation?** You may already be enrolled; check `enrollments` for an existing row.

---

If you want this to work **also for paid courses later**, we can extend the logic to check a `payments` table or `courses.price_cents` with a `has_valid_payment(course_id)` helper—all under the same pattern.
