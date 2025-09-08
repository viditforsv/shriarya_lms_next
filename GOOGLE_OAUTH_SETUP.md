# Google OAuth Setup for Local & Production

## 🎯 **Solution: Both Local & Production OAuth Working**

The app now automatically detects the environment and uses the appropriate URL for Google OAuth.

### **How It Works:**

- **Local Development**: Uses `window.location.origin` (e.g., `http://localhost:3000`)
- **Production**: Uses `NEXT_PUBLIC_SITE_URL` environment variable (e.g., `https://courses.shrividhya.in`)

## 🔧 **Required Configuration**

### **1. Google Cloud Console Setup**

Go to [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials

**For your OAuth 2.0 Client ID, add these:**

#### **Authorized JavaScript Origins:**

```
http://localhost:3000
https://courses.shrividhya.in
```

#### **Authorized Redirect URIs:**

```
http://localhost:3000/auth/callback
https://courses.shrividhya.in/auth/callback
```

### **2. Supabase Dashboard Setup**

Go to your Supabase project → Authentication → URL Configuration

#### **Site URLs:**

```
http://localhost:3000
https://courses.shrividhya.in
```

#### **Redirect URLs:**

```
http://localhost:3000/auth/callback
https://courses.shrividhya.in/auth/callback
```

### **3. Environment Variables**

#### **For Local Development (.env.local):**

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

#### **For Production (.env.production or Vercel/Netlify):**

```bash
NEXT_PUBLIC_SITE_URL=https://courses.shrividhya.in
```

## 🚀 **Testing**

### **Local Testing:**

1. Run `npm run dev`
2. Go to `http://localhost:3000/auth`
3. Click "Sign in with Google"
4. Should redirect to Google → back to localhost

### **Production Testing:**

1. Deploy to your hosting platform
2. Go to `https://courses.shrividhya.in/auth`
3. Click "Sign in with Google"
4. Should redirect to Google → back to production URL

## ✅ **Benefits of This Setup:**

- ✅ **Automatic Environment Detection**: No manual switching needed
- ✅ **Both Environments Work**: Local dev + production
- ✅ **No Code Changes**: When deploying, just update environment variables
- ✅ **Debug Logging**: Console logs show which URL is being used
- ✅ **Fallback Safety**: Uses origin as fallback if env var missing

## 🔍 **Debug Information**

Check browser console for these logs:

- `AuthContext - Site URL: [detected URL]`
- `AuthContext - Environment variable: [env var value]`
- `AuthContext - Current location: [window.location.origin]`

This will help you verify the correct URL is being used in each environment.
