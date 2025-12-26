# Environment Setup Guide

Complete guide for local development and environment configuration.

## Environments

| Environment | Branch | Location | Supabase | Domain |
|------------|--------|----------|----------|--------|
| Local Dev | `dev` | Local | Dev | `localhost:3000` |
| Vercel Preview | `dev` | Vercel | Dev | `*.vercel.app` |
| Vercel Production | `main` | Vercel | Production | `courses.preppeo.com` |

## Local Development Setup

### 1. Create `.env.local`

```bash
# Environment
NEXT_PUBLIC_ENVIRONMENT=dev

# Dev Supabase
NEXT_PUBLIC_SUPABASE_URL_DEV=https://tqeyguvxcsebzhvhzngx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY_DEV=[your-dev-anon-key]
SUPABASE_SERVICE_ROLE_KEY_DEV=[your-dev-service-role-key]

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Google Auth
GOOGLE_CLIENT_ID=[your-google-client-id]
GOOGLE_CLIENT_SECRET=[your-google-client-secret]

# Razorpay (Test)
RAZORPAY_KEY_ID_TEST=rzp_test_...
RAZORPAY_KEY_SECRET_TEST=[your-test-secret]
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_...
```

### 2. Start Development

```bash
git checkout dev
npm run dev
```

## Environment Detection

The system automatically selects the correct Supabase database:

**Priority:**
1. `NEXT_PUBLIC_ENVIRONMENT` (explicit: `dev` or `prod`)
2. `NODE_ENV` (fallback: `production` → prod, else → dev)

**Dev Environment:**
- Uses `NEXT_PUBLIC_SUPABASE_URL_DEV`
- Uses `NEXT_PUBLIC_SUPABASE_ANON_KEY_DEV`

**Prod Environment:**
- Uses `NEXT_PUBLIC_SUPABASE_URL_PROD`
- Uses `NEXT_PUBLIC_SUPABASE_ANON_KEY_PROD`

## Switching Environments

**For Dev Branch:**
```bash
git checkout dev
# .env.local should have NEXT_PUBLIC_ENVIRONMENT=dev
npm run dev
```

**For Main Branch:**
```bash
git checkout main
# .env.local should have NEXT_PUBLIC_ENVIRONMENT=prod
# Or use production Supabase credentials
npm run dev
```

## Vercel Deployment

See [VERCEL_SETUP.md](./VERCEL_SETUP.md) for Vercel environment configuration.

## Verification

**Check current environment:**
```typescript
// src/app/api/debug/env/route.ts
import { getCurrentEnvironment, getSupabaseUrl } from "@/lib/supabase/env";

export async function GET() {
  return NextResponse.json({
    environment: getCurrentEnvironment(),
    supabaseUrl: getSupabaseUrl(),
  });
}
```

Visit: `/api/debug/env`

## Troubleshooting

**Wrong database connection:**
- Check `NEXT_PUBLIC_ENVIRONMENT` in `.env.local`
- Verify correct `_DEV` or `_PROD` suffix variables
- Restart dev server after changes

**Environment not detected:**
- Ensure `.env.local` exists
- Check variable names match exactly
- Verify no typos in environment value

## Related Docs

- [VERCEL_SETUP.md](./VERCEL_SETUP.md) - Vercel deployment setup

