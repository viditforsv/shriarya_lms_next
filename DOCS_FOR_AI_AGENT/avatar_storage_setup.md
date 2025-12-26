# Avatar Storage Setup

The avatar upload feature uses **Supabase Storage** (already configured in your project).

## Setup Steps

### 1. Create the Storage Bucket

Go to your Supabase dashboard and run the SQL script:

**File:** `database_migrations/avatars_storage_setup.sql`

OR manually:

1. Go to **Storage** in your Supabase dashboard
2. Click **Create a new bucket**
3. Use these settings:
   - **Name:** `avatars`
   - **Public:** `Yes` ✅
   - **File size limit:** `5242880` bytes (5MB)
   - **Allowed MIME types:**
     - `image/jpeg`
     - `image/png`
     - `image/gif`
     - `image/webp`

### 2. Storage Policies (RLS)

The SQL script automatically creates the policies, but if you need to add them manually:

#### Allow Users to Upload Their Own Avatars

```sql
CREATE POLICY "Users can upload own avatars"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'avatars' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
```

#### Allow Anyone to View Avatars (Public)

```sql
CREATE POLICY "Anyone can view avatars"
ON storage.objects FOR SELECT
TO public
USING (
  bucket_id = 'avatars'
);
```

#### Allow Users to Update Their Own Avatars

```sql
CREATE POLICY "Users can update own avatars"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'avatars' AND
  (storage.foldername(name))[1] = auth.uid()::text
)
WITH CHECK (
  bucket_id = 'avatars' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
```

#### Allow Users to Delete Their Own Avatars

```sql
CREATE POLICY "Users can delete own avatars"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'avatars' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
```

## How It Works

1. **Upload:** Avatar images are uploaded to Supabase Storage at `avatars/{userId}/avatar_{timestamp}_{randomId}.{ext}`
2. **URL:** Public URLs are generated automatically by Supabase
3. **Storage:** Avatar URL is saved in the `profiles.avatar_url` column (already exists in your schema)
4. **Security:** Users can only upload/update/delete their own avatars based on the folder name

## File Organization

```
avatars/
  ├── {user-id-1}/
  │   ├── avatar_1234567890_abc123.jpg
  │   └── avatar_1234567891_def456.png
  ├── {user-id-2}/
  │   └── avatar_1234567892_ghi789.jpg
  └── ...
```

## No Bunny CDN Required

This implementation uses **Supabase Storage only** (no Bunny CDN configuration needed). It's simpler and already integrated with your existing setup.
