# 🚀 Quick Setup Guide for Testing Authentication

## 1. Environment Setup

Create a `.env.local` file in your project root with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

**Get these from:**

- Supabase Dashboard → Settings → API
- Copy the "Project URL" and "anon public" key

## 2. Google OAuth Setup in Supabase

1. Go to **Authentication → Providers** in your Supabase dashboard
2. Enable **Google** provider
3. Add your Google OAuth credentials:
   - Client ID: Your Google OAuth client ID
   - Client Secret: Your Google OAuth client secret
4. Set redirect URL to: `https://your-project-id.supabase.co/auth/v1/callback`

## 3. Database Setup

Run this SQL in your Supabase SQL editor:

```sql
-- Create profiles table
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  role TEXT DEFAULT 'student' CHECK (role IN ('student', 'instructor', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

## 4. Test the Authentication

1. **Start the dev server:**

   ```bash
   npm run dev
   ```

2. **Visit the test page:**

   - Go to `http://localhost:3000/test-auth`
   - This page shows authentication status and debug info

3. **Test the flow:**
   - Click "Go to Login" → `/auth`
   - Try both email/password and Google OAuth
   - Check the test page to see authentication state
   - Try accessing `/dashboard` (should redirect if not authenticated)

## 5. What to Test

### ✅ Email/Password Auth:

- Sign up with new email
- Sign in with existing credentials
- Check if profile is created in database

### ✅ Google OAuth:

- Click "Sign in with Google"
- Should redirect to Google OAuth
- After auth, should return to your app
- Check if profile is created with Google data

### ✅ Protected Routes:

- Try accessing `/dashboard` without auth → should redirect to `/auth`
- After auth, should be able to access `/dashboard`
- Sign out should redirect to home

### ✅ Session Persistence:

- Refresh page → should maintain login state
- Check browser dev tools → should see Supabase cookies

## 6. Troubleshooting

### Common Issues:

**"Invalid redirect URL" error:**

- Check your Google OAuth redirect URL in Supabase
- Should be: `https://your-project-id.supabase.co/auth/v1/callback`

**"Provider not enabled" error:**

- Make sure Google provider is enabled in Supabase Auth → Providers

**Profile not created:**

- Check if the SQL trigger was created correctly
- Check Supabase logs for any errors

**Middleware redirects not working:**

- Make sure `middleware.ts` is in the root directory
- Check browser console for any errors

## 7. Next Steps

Once authentication is working:

1. Test user roles and permissions
2. Add course management features
3. Implement student progress tracking
4. Add instructor dashboards

## 🆘 Need Help?

- Check Supabase logs in the dashboard
- Use the test page at `/test-auth` for debugging
- Check browser console for client-side errors
- Verify all environment variables are set correctly
