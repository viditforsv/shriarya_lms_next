# Fixing OAuth Redirect to Localhost Issue

## Problem

After Google OAuth login, users are being redirected to localhost instead of the deployed domain.

## Root Cause

The issue is likely in the Supabase OAuth configuration, not in the code. Supabase needs to be configured with the correct redirect URLs.

## Solution Steps

### 1. Check Environment Variables

Ensure your `.env.local` has:

```env
NEXT_PUBLIC_SITE_URL=https://courses.shrividhya.in
```

### 2. Fix Supabase OAuth Configuration

Go to your Supabase Dashboard → Authentication → URL Configuration

**Set these URLs:**

- Site URL: `https://courses.shrividhya.in`
- Redirect URLs:
  - `https://courses.shrividhya.in/auth/callback`
  - `http://localhost:3000/auth/callback` (for development)

### 3. Fix Google OAuth Provider

Go to Supabase Dashboard → Authentication → Providers → Google

**Set Redirect URL to:**

```
https://courses.shrividhya.in/auth/callback
```

**NOT:**

```
https://your-project-id.supabase.co/auth/v1/callback
```

### 4. Update Google Cloud Console

In Google Cloud Console → OAuth 2.0 Client IDs:

**Add Authorized redirect URIs:**

- `https://courses.shrividhya.in/auth/callback`
- `http://localhost:3000/auth/callback`

### 5. Test the Fix

1. Clear browser cookies/cache
2. Try Google OAuth login again
3. Should redirect to `https://courses.shrividhya.in/dashboard`

## Debug Information

Check browser console for:

- `AuthContext - Site URL: https://courses.shrividhya.in`
- `AuthContext - Environment variable: https://courses.shrividhya.in`

## Common Mistakes

1. Supabase redirect URL pointing to Supabase domain instead of your app
2. Google OAuth not configured with your production domain
3. Environment variable not set in deployment platform
4. Cached redirect URLs in Supabase

## Deployment Notes

Make sure your deployment platform (Vercel/Netlify) has:

```
NEXT_PUBLIC_SITE_URL=https://courses.shrividhya.in
```
