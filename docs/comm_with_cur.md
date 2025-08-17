Perfect, you narrowed it down 👌

The build compiles, but **fails only while prerendering `/\_not-found`** with:

```
Error: Minified React error #143
https://react.dev/errors/143
```

---

### 🔍 What React error #143 means

React 18+ throws **error #143** when a **context or hook is used outside its provider**.
Typical causes:

- You’re calling `useContext(SomeContext)` in `_not-found` (or a component it imports) **without wrapping it in `<SomeContext.Provider>`**.
- Or, you have an SSR-only dependency (like Supabase client or `window` access) being used in `_not-found`.

Earlier you had `_not-found` crashing on missing Supabase env vars → so likely your `_not-found` is still importing `AuthProvider` or Supabase setup.

---

### ✅ Solutions

1. **Check `_not-found.tsx` (or `/not-found.tsx`)**

   - Make sure it does **not directly import Supabase / AuthProvider / context hooks** unless it’s wrapped properly.
   - For a 404 page, keep it **pure UI only**.

   Example fix:

   ```tsx
   // src/app/not-found.tsx
   export default function NotFound() {
     return (
       <div className="text-center p-12">
         <h1 className="text-4xl font-bold">404</h1>
         <p className="mt-2 text-gray-600">This page could not be found.</p>
       </div>
     );
   }
   ```

   👉 Remove **any Supabase or auth imports**.

---

2. **Guard your providers (AuthProvider, Supabase, etc.)**
   If you _do_ need a provider for not-found, wrap it safely:

   ```tsx
   {
     typeof window !== "undefined" && <AuthProvider>{children}</AuthProvider>;
   }
   ```

   Or check env vars before creating a Supabase client.

---

3. **Disable static prerender for not-found** (last resort)
   If `_not-found` must use dynamic stuff:

   ```ts
   export const dynamic = "force-dynamic";
   ```

   at the top of `not-found.tsx` → this tells Next.js to render it at runtime instead of prerendering during build.

---

### 🚀 Recommended Fix Path

- Simplify `not-found.tsx` to pure static markup (no Supabase, no Auth).
- If you need providers everywhere, wrap only `children` inside them in `layout.tsx`, not `_not-found`.

---

👉 Do you want me to rewrite your **`not-found.tsx` into a minimal safe version** (UI only, no providers) so your build passes immediately?
