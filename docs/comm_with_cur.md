[20:55:28.921] Running build in Washington, D.C., USA (East) – iad1
[20:55:28.922] Build machine configuration: 2 cores, 8 GB
[20:55:28.942] Cloning github.com/viditforsv/shriarya_lms_next (Branch: dev, Commit: f021f1f)
[20:55:29.846] Cloning completed: 903.000ms
[20:55:31.464] Restored build cache from previous deployment (A2Vzjhji1gLJRDW4xrXhDFvtUuVr)
[20:55:31.998] Running "vercel build"
[20:55:32.395] Vercel CLI 46.1.1
[20:55:32.736] Installing dependencies...
[20:55:34.009]
[20:55:34.009] up to date in 1s
[20:55:34.009]
[20:55:34.010] 145 packages are looking for funding
[20:55:34.010] run `npm fund` for details
[20:55:34.041] Detected Next.js version: 15.4.6
[20:55:34.045] Running "npm run build"
[20:55:34.158]
[20:55:34.159] > shriarya_lms_next@0.1.0 build
[20:55:34.160] > next build
[20:55:34.160]
[20:55:35.320] ▲ Next.js 15.4.6
[20:55:35.321]
[20:55:35.360] Creating an optimized production build ...
[20:55:51.394] <w> [webpack.cache.PackFileCacheStrategy] Serializing big strings (108kiB) impacts deserialization performance (consider using Buffer instead and decode when needed)
[20:55:51.608] ⚠ Compiled with warnings in 2000ms
[20:55:51.608]
[20:55:51.609] ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
[20:55:51.609] A Node.js API is used (process.versions at line: 34) which is not supported in the Edge Runtime.
[20:55:51.609] Learn more: https://nextjs.org/docs/api-reference/edge-runtime
[20:55:51.610]
[20:55:51.610] Import trace for requested module:
[20:55:51.610] ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
[20:55:51.610] ./node_modules/@supabase/realtime-js/dist/module/index.js
[20:55:51.611] ./node_modules/@supabase/supabase-js/dist/module/index.js
[20:55:51.611] ./node_modules/@supabase/ssr/dist/module/createBrowserClient.js
[20:55:51.611] ./node_modules/@supabase/ssr/dist/module/index.js
[20:55:51.611]
[20:55:51.611] ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
[20:55:51.612] A Node.js API is used (process.versions at line: 35) which is not supported in the Edge Runtime.
[20:55:51.612] Learn more: https://nextjs.org/docs/api-reference/edge-runtime
[20:55:51.612]
[20:55:51.612] Import trace for requested module:
[20:55:51.614] ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
[20:55:51.615] ./node_modules/@supabase/realtime-js/dist/module/index.js
[20:55:51.615] ./node_modules/@supabase/supabase-js/dist/module/index.js
[20:55:51.615] ./node_modules/@supabase/ssr/dist/module/createBrowserClient.js
[20:55:51.615] ./node_modules/@supabase/ssr/dist/module/index.js
[20:55:51.615]
[20:55:51.615] ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
[20:55:51.616] A Node.js API is used (process.versions at line: 36) which is not supported in the Edge Runtime.
[20:55:51.616] Learn more: https://nextjs.org/docs/api-reference/edge-runtime
[20:55:51.616]
[20:55:51.616] Import trace for requested module:
[20:55:51.617] ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
[20:55:51.617] ./node_modules/@supabase/realtime-js/dist/module/index.js
[20:55:51.617] ./node_modules/@supabase/supabase-js/dist/module/index.js
[20:55:51.617] ./node_modules/@supabase/ssr/dist/module/createBrowserClient.js
[20:55:51.618] ./node_modules/@supabase/ssr/dist/module/index.js
[20:55:51.618]
[20:55:51.618] ./node_modules/@supabase/supabase-js/dist/module/index.js
[20:55:51.618] A Node.js API is used (process.version at line: 24) which is not supported in the Edge Runtime.
[20:55:51.618] Learn more: https://nextjs.org/docs/api-reference/edge-runtime
[20:55:51.618]
[20:55:51.618] Import trace for requested module:
[20:55:51.618] ./node_modules/@supabase/supabase-js/dist/module/index.js
[20:55:51.619] ./node_modules/@supabase/ssr/dist/module/createBrowserClient.js
[20:55:51.619] ./node_modules/@supabase/ssr/dist/module/index.js
[20:55:51.620]
[20:56:01.225] ✓ Compiled successfully in 22.0s
[20:56:01.230] Linting and checking validity of types ...
[20:56:10.167]
[20:56:10.167] Failed to compile.
[20:56:10.167]
[20:56:10.167] ./src/app/about/page.tsx
[20:56:10.167] 5:10 Warning: 'Users' is defined but never used. @typescript-eslint/no-unused-vars
[20:56:10.167]
[20:56:10.167] ./src/app/courses/cbse/mathematics/class-10/page.tsx
[20:56:10.168] 236:9 Warning: 'handleLessonClick' is assigned a value but never used. @typescript-eslint/no-unused-vars
[20:56:10.168] 257:9 Warning: 'handlePreviewClick' is assigned a value but never used. @typescript-eslint/no-unused-vars
[20:56:10.168] 358:21 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[20:56:10.168] 563:27 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[20:56:10.168] 649:23 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[20:56:10.168]
[20:56:10.168] ./src/app/courses/example-course/page.tsx
[20:56:10.168] 55:38 Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`. react/no-unescaped-entities
[20:56:10.168]
[20:56:10.168] ./src/app/courses/ibdp/mathematics/analysis-approaches-hl/page.tsx
[20:56:10.168] 5:10 Warning: 'Button' is defined but never used. @typescript-eslint/no-unused-vars
[20:56:10.177] 7:76 Warning: 'Users2' is defined but never used. @typescript-eslint/no-unused-vars
[20:56:10.178] 7:84 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[20:56:10.178]
[20:56:10.179] ./src/app/dashboard/page.tsx
[20:56:10.179] 4:10 Warning: 'RoleGuard' is defined but never used. @typescript-eslint/no-unused-vars
[20:56:10.179]
[20:56:10.180] ./src/app/pricing/page.tsx
[20:56:10.180] 6:17 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[20:56:10.180] 6:23 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[20:56:10.180] 6:33 Warning: 'Users' is defined but never used. @typescript-eslint/no-unused-vars
[20:56:10.181] 6:40 Warning: 'Award' is defined but never used. @typescript-eslint/no-unused-vars
[20:56:10.181] 6:47 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[20:56:10.181]
[20:56:10.182] ./src/app/templates/course-templates/course-page/page.tsx
[20:56:10.182] 4:21 Warning: 'Play' is defined but never used. @typescript-eslint/no-unused-vars
[20:56:10.183] 69:21 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[20:56:10.183] 343:23 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[20:56:10.183] 397:23 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[20:56:10.184]
[20:56:10.184] ./src/app/templates/dashboard-templates/admin-panel/page.tsx
[20:56:10.184] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[20:56:10.184] 5:29 Warning: 'CardDescription' is defined but never used. @typescript-eslint/no-unused-vars
[20:56:10.185] 5:46 Warning: 'CardHeader' is defined but never used. @typescript-eslint/no-unused-vars
[20:56:10.185] 5:58 Warning: 'CardTitle' is defined but never used. @typescript-eslint/no-unused-vars
[20:56:10.185]
[20:56:10.186] ./src/app/templates/dashboard-templates/analytics/page.tsx
[20:56:10.188] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[20:56:10.188] 6:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[20:56:10.188] 7:33 Warning: 'TrendingDown' is defined but never used. @typescript-eslint/no-unused-vars
[20:56:10.189] 7:64 Warning: 'DollarSign' is defined but never used. @typescript-eslint/no-unused-vars
[20:56:10.189]
[20:56:10.189] ./src/app/templates/dashboard-templates/instructor-dashboard/page.tsx
[20:56:10.189] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[20:56:10.190] 5:29 Warning: 'CardDescription' is defined but never used. @typescript-eslint/no-unused-vars
[20:56:10.190] 5:46 Warning: 'CardHeader' is defined but never used. @typescript-eslint/no-unused-vars
[20:56:10.190] 5:58 Warning: 'CardTitle' is defined but never used. @typescript-eslint/no-unused-vars
[20:56:10.190] 7:100 Warning: 'Download' is defined but never used. @typescript-eslint/no-unused-vars
[20:56:10.198]
[20:56:10.199] ./src/app/templates/dashboard-templates/student-dashboard/page.tsx
[20:56:10.199] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[20:56:10.200] 5:29 Warning: 'CardDescription' is defined but never used. @typescript-eslint/no-unused-vars
[20:56:10.200] 5:46 Warning: 'CardHeader' is defined but never used. @typescript-eslint/no-unused-vars
[20:56:10.200] 5:58 Warning: 'CardTitle' is defined but never used. @typescript-eslint/no-unused-vars
[20:56:10.200]
[20:56:10.201] ./src/app/templates/page-templates/about/page.tsx
[20:56:10.201] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[20:56:10.201]
[20:56:10.202] ./src/app/templates/page-templates/contact/page.tsx
[20:56:10.202] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[20:56:10.202]
[20:56:10.202] ./src/app/templates/page-templates/pricing/page.tsx
[20:56:10.203] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[20:56:10.203] 7:28 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[20:56:10.203]
[20:56:10.203] ./src/components/auth/RoleGuard.tsx
[20:56:10.204] 46:31 Error: React Hook "useAuth" is called conditionally. React Hooks must be called in the exact same order in every component render. Did you accidentally call a React Hook after an early return? react-hooks/rules-of-hooks
[20:56:10.204]
[20:56:10.204] ./src/components/ui/header.tsx
[20:56:10.204] 10:10 Warning: 'NAVIGATION_MENU' is defined but never used. @typescript-eslint/no-unused-vars
[20:56:10.204]
[20:56:10.205] ./src/contexts/AuthContext.tsx
[20:56:10.205] 177:6 Warning: React Hook useEffect has a missing dependency: 'fetchProfile'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[20:56:10.205]
[20:56:10.206] ./src/hooks/useCourseAccess.ts
[20:56:10.206] 2:48 Warning: 'CourseAccessConfig' is defined but never used. @typescript-eslint/no-unused-vars
[20:56:10.206]
[20:56:10.206] info - Need to disable some ESLint rules? Learn more here: https://nextjs.org/docs/app/api-reference/config/eslint#disabling-rules
[20:56:10.231] Error: Command "npm run build" exited with 1
