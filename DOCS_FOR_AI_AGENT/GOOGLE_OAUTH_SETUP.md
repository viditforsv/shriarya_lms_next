# Google OAuth Setup Guide

## 🎯 Overview

This guide will help you enable Google OAuth authentication in both your **Dev** and **Production** Supabase projects.

---

## 📋 Prerequisites

1. Google Cloud Console project with OAuth 2.0 credentials
2. Access to both Dev and Production Supabase projects
3. Google Client ID and Client Secret

---

## 🔧 Step 1: Configure Google Cloud Console

### 1.1 Get Your Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project (or create a new one)
3. Navigate to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth client ID**
5. Configure:
   - **Application type**: Web application
   - **Name**: Preppeo (or your app name)
   - **Authorized JavaScript origins**:
     - `https://ootnqmojcqnzfrtvzzec.supabase.co` (Production)
     - `https://tqeyguvxcsebzhvhzngx.supabase.co` (Dev)
     - `https://courses.preppeo.com` (Production domain)
     - `https://dev.courses.preppeo.com` (Dev domain, if applicable)
   - **Authorized redirect URIs**:
     - `https://ootnqmojcqnzfrtvzzec.supabase.co/auth/v1/callback` (Production)
     - `https://tqeyguvxcsebzhvhzngx.supabase.co/auth/v1/callback` (Dev)
     - `https://courses.preppeo.com/auth/callback` (Production)
     - `https://dev.courses.preppeo.com/auth/callback` (Dev, if applicable)

6. Click **Create**
7. Copy the **Client ID** and **Client Secret**

---

## 🔧 Step 2: Enable Google OAuth in Supabase (Production)

### 2.1 Access Production Supabase Dashboard

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your **Production** project (`ootnqmojcqnzfrtvzzec`)

### 2.2 Enable Google Provider

1. Navigate to **Authentication** → **Providers**
2. Find **Google** in the list
3. Click to expand Google settings
4. Toggle **Enable Google provider** to **ON**
5. Fill in:
   - **Client ID (for OAuth)**: Your Google Client ID
   - **Client Secret (for OAuth)**: Your Google Client Secret
6. Click **Save**

### 2.3 Verify Redirect URL

The redirect URL should be automatically set to:
```
https://ootnqmojcqnzfrtvzzec.supabase.co/auth/v1/callback
```

**Important:** Make sure this exact URL is added to your Google Cloud Console's authorized redirect URIs.

---

## 🔧 Step 3: Enable Google OAuth in Supabase (Dev)

### 3.1 Access Dev Supabase Dashboard

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your **Dev** project (`tqeyguvxcsebzhvhzngx`)

### 3.2 Enable Google Provider

1. Navigate to **Authentication** → **Providers**
2. Find **Google** in the list
3. Click to expand Google settings
4. Toggle **Enable Google provider** to **ON**
5. Fill in:
   - **Client ID (for OAuth)**: Your Google Client ID (can be same or different)
   - **Client Secret (for OAuth)**: Your Google Client Secret (can be same or different)
6. Click **Save**

### 3.3 Verify Redirect URL

The redirect URL should be automatically set to:
```
https://tqeyguvxcsebzhvhzngx.supabase.co/auth/v1/callback
```

**Important:** Make sure this exact URL is added to your Google Cloud Console's authorized redirect URIs.

---

## ✅ Step 4: Verify Configuration

### 4.1 Check Supabase Settings

For both Production and Dev:
- [ ] Google provider is **Enabled**
- [ ] Client ID is set
- [ ] Client Secret is set
- [ ] Redirect URL matches Google Console

### 4.2 Check Google Console

- [ ] Both Supabase callback URLs are in **Authorized redirect URIs**
- [ ] Both Supabase domains are in **Authorized JavaScript origins**
- [ ] Client ID and Secret are correct

### 4.3 Test Authentication

1. **Test on Dev:**
   - Visit your dev/preview URL
   - Click "Sign in with Google"
   - Should redirect to Google and back successfully

2. **Test on Production:**
   - Visit `https://courses.preppeo.com`
   - Click "Sign in with Google"
   - Should redirect to Google and back successfully

---

## 🔍 Troubleshooting

### Error: "Unsupported provider: provider is not enabled"

**Cause:** Google OAuth provider is not enabled in Supabase

**Solution:**
1. Go to Supabase Dashboard → Authentication → Providers
2. Find Google and toggle it **ON**
3. Add Client ID and Client Secret
4. Save changes
5. Try again

### Error: "redirect_uri_mismatch"

**Cause:** Redirect URI in Google Console doesn't match Supabase callback URL

**Solution:**
1. Check Supabase redirect URL (shown in Providers settings)
2. Add exact URL to Google Console's **Authorized redirect URIs**
3. Format: `https://[your-project-ref].supabase.co/auth/v1/callback`
4. Wait a few minutes for changes to propagate
5. Try again

### Error: "invalid_client"

**Cause:** Incorrect Client ID or Client Secret in Supabase

**Solution:**
1. Verify Client ID and Secret in Google Cloud Console
2. Copy them exactly (no extra spaces)
3. Update in Supabase Dashboard → Authentication → Providers → Google
4. Save and try again

### Error: "access_denied"

**Cause:** User denied permission or OAuth consent screen not configured

**Solution:**
1. Go to Google Cloud Console → **APIs & Services** → **OAuth consent screen**
2. Configure consent screen (if not done)
3. Add test users if app is in testing mode
4. Publish app if ready for production

### Google Sign-In Works Locally But Not on Vercel

**Cause:** Environment variables not set correctly in Vercel

**Solution:**
1. Check Vercel environment variables:
   - `GOOGLE_CLIENT_ID` should be set
   - `GOOGLE_CLIENT_SECRET` should be set
2. Verify they're set for both **Production** and **Preview** environments
3. Redeploy after adding variables

---

## 📝 Environment Variables

### Local Development (.env.local)

```bash
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Vercel Production

```bash
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Vercel Preview

```bash
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

**Note:** You can use the same Google OAuth credentials for both dev and prod, or create separate OAuth clients for each environment.

---

## 🔒 Security Best Practices

1. ✅ **Never commit** Client Secret to Git
2. ✅ **Use environment variables** for all credentials
3. ✅ **Rotate secrets** if accidentally exposed
4. ✅ **Use separate OAuth clients** for dev/prod (optional but recommended)
5. ✅ **Restrict redirect URIs** to only your domains
6. ✅ **Monitor OAuth usage** in Google Cloud Console

---

## 📚 Related Documentation

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Vercel Environment Variables](./VERCEL_ENVIRONMENT_SETUP.md)

---

## ✅ Quick Checklist

### Google Cloud Console
- [ ] OAuth 2.0 Client ID created
- [ ] Authorized JavaScript origins added (both Supabase projects)
- [ ] Authorized redirect URIs added (both Supabase callback URLs)
- [ ] OAuth consent screen configured

### Supabase Production
- [ ] Google provider enabled
- [ ] Client ID added
- [ ] Client Secret added
- [ ] Redirect URL verified

### Supabase Dev
- [ ] Google provider enabled
- [ ] Client ID added
- [ ] Client Secret added
- [ ] Redirect URL verified

### Vercel Environment Variables
- [ ] `GOOGLE_CLIENT_ID` set for Production
- [ ] `GOOGLE_CLIENT_SECRET` set for Production
- [ ] `GOOGLE_CLIENT_ID` set for Preview
- [ ] `GOOGLE_CLIENT_SECRET` set for Preview

### Testing
- [ ] Google sign-in works on dev/preview
- [ ] Google sign-in works on production
- [ ] User profile created correctly after sign-in
- [ ] User redirected to correct page after sign-in

---

**Once all steps are complete, Google OAuth should work!** 🚀

