# Vercel Deployment & Environment Setup

Complete guide for deploying to Vercel with dev/prod environment separation.

## Overview

| Branch | Environment | Domain | Supabase Project |
|--------|------------|--------|------------------|
| `main` | Production | `courses.preppeo.com` | Production Supabase |
| `dev` | Preview | `dev.courses.preppeo.com` or `*.vercel.app` | Dev Supabase |

## Quick Setup

### 1. Configure Production Environment Variables

Vercel Dashboard → Settings → Environment Variables → Add:

**Production only:**
```bash
NEXT_PUBLIC_ENVIRONMENT=prod
NEXT_PUBLIC_SUPABASE_URL_PROD=https://ootnqmojcqnzfrtvzzec.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY_PROD=[your-prod-anon-key]
SUPABASE_SERVICE_ROLE_KEY_PROD=[your-prod-service-role-key]
NEXT_PUBLIC_APP_URL=https://courses.preppeo.com
GOOGLE_CLIENT_ID=[your-google-client-id]
GOOGLE_CLIENT_SECRET=[your-google-client-secret]
RAZORPAY_KEY_ID=rzp_live_...
RAZORPAY_KEY_SECRET=[your-razorpay-secret]
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_...
```

### 2. Configure Preview Environment Variables

**Preview only:**
```bash
NEXT_PUBLIC_ENVIRONMENT=dev
NEXT_PUBLIC_SUPABASE_URL_DEV=https://tqeyguvxcsebzhvhzngx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY_DEV=[your-dev-anon-key]
SUPABASE_SERVICE_ROLE_KEY_DEV=[your-dev-service-role-key]
NEXT_PUBLIC_APP_URL=https://dev.courses.preppeo.com
GOOGLE_CLIENT_ID=[your-google-client-id]
GOOGLE_CLIENT_SECRET=[your-google-client-secret]
RAZORPAY_KEY_ID_TEST=rzp_test_...
RAZORPAY_KEY_SECRET_TEST=[your-test-secret]
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_...
```

### 3. Configure Domains

**Production:**
- Settings → Domains → Add `courses.preppeo.com`
- Configure DNS records as shown

**Preview (optional):**
- Settings → Domains → Add `dev.courses.preppeo.com`
- Assign to `dev` branch only

## Deployment Workflow

```bash
# Dev branch → Preview deployment (dev Supabase)
git checkout dev
git push origin dev

# Main branch → Production deployment (prod Supabase)
git checkout main
git merge dev
git push origin main
```

## Environment Detection

The app automatically selects database based on:
1. `NEXT_PUBLIC_ENVIRONMENT` (explicit: `dev` or `prod`)
2. `NODE_ENV` (fallback: `production` → prod, else → dev)

## Verification

**Check environment:**
```bash
# Create debug endpoint: src/app/api/debug/env/route.ts
# Visit: /api/debug/env
```

**Verify deployments:**
- Preview: Should use dev Supabase
- Production: Should use prod Supabase

## Troubleshooting

**Preview using prod database:**
- Check Preview env vars are set correctly
- Ensure `NEXT_PUBLIC_ENVIRONMENT=dev` for Preview
- Redeploy after changes

**Production using dev database:**
- Check Production env vars are set correctly
- Ensure `NEXT_PUBLIC_ENVIRONMENT=prod` for Production
- Verify `_PROD` suffix variables are used

**Env vars not updating:**
- Redeploy after changing variables
- Deployments → Click "..." → Redeploy

## Security

- ✅ Never commit `.env.local` to Git
- ✅ Use separate Supabase projects for dev/prod
- ✅ Use test payment keys in Preview
- ✅ Never share service_role keys publicly

## Related Docs

- [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md) - Local development setup
- [Vercel Docs](https://vercel.com/docs/concepts/projects/environment-variables)

