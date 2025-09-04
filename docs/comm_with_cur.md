[18:20:28.425] Running build in Washington, D.C., USA (East) – iad1
[18:20:28.425] Build machine configuration: 2 cores, 8 GB
[18:20:28.443] Cloning github.com/viditforsv/shriarya_lms_next (Branch: dev, Commit: 0e52369)
[18:20:29.281] Cloning completed: 837.000ms
[18:20:33.660] Restored build cache from previous deployment (86Pg4KgE3zMdeYLXwmVDZSUK3941)
[18:20:34.196] Running "vercel build"
[18:20:34.753] Vercel CLI 47.0.4
[18:20:35.089] Installing dependencies...
[18:20:43.882]
[18:20:43.883] added 2 packages, and changed 18 packages in 9s
[18:20:43.884]
[18:20:43.884] 145 packages are looking for funding
[18:20:43.884] run `npm fund` for details
[18:20:43.918] Detected Next.js version: 15.5.2
[18:20:43.922] Running "npm run build"
[18:20:44.065]
[18:20:44.066] > shriarya_lms_next@0.1.0 build
[18:20:44.066] > next build
[18:20:44.067]
[18:20:44.919] ▲ Next.js 15.5.2
[18:20:44.920]
[18:20:45.016] Creating an optimized production build ...
[18:21:04.093] <w> [webpack.cache.PackFileCacheStrategy] Serializing big strings (108kiB) impacts deserialization performance (consider using Buffer instead and decode when needed)
[18:21:04.284] ⚠ Compiled with warnings in 2.1s
[18:21:04.284]
[18:21:04.285] ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
[18:21:04.286] A Node.js API is used (process.versions at line: 34) which is not supported in the Edge Runtime.
[18:21:04.286] Learn more: https://nextjs.org/docs/api-reference/edge-runtime
[18:21:04.286]
[18:21:04.286] Import trace for requested module:
[18:21:04.287] ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
[18:21:04.287] ./node_modules/@supabase/realtime-js/dist/module/index.js
[18:21:04.287] ./node_modules/@supabase/supabase-js/dist/module/index.js
[18:21:04.287] ./node_modules/@supabase/ssr/dist/module/createServerClient.js
[18:21:04.287] ./node_modules/@supabase/ssr/dist/module/index.js
[18:21:04.287]
[18:21:04.288] ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
[18:21:04.288] A Node.js API is used (process.versions at line: 35) which is not supported in the Edge Runtime.
[18:21:04.288] Learn more: https://nextjs.org/docs/api-reference/edge-runtime
[18:21:04.288]
[18:21:04.288] Import trace for requested module:
[18:21:04.288] ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
[18:21:04.289] ./node_modules/@supabase/realtime-js/dist/module/index.js
[18:21:04.289] ./node_modules/@supabase/supabase-js/dist/module/index.js
[18:21:04.289] ./node_modules/@supabase/ssr/dist/module/createServerClient.js
[18:21:04.289] ./node_modules/@supabase/ssr/dist/module/index.js
[18:21:04.289]
[18:21:04.289] ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
[18:21:04.290] A Node.js API is used (process.versions at line: 36) which is not supported in the Edge Runtime.
[18:21:04.290] Learn more: https://nextjs.org/docs/api-reference/edge-runtime
[18:21:04.290]
[18:21:04.290] Import trace for requested module:
[18:21:04.290] ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
[18:21:04.291] ./node_modules/@supabase/realtime-js/dist/module/index.js
[18:21:04.291] ./node_modules/@supabase/supabase-js/dist/module/index.js
[18:21:04.291] ./node_modules/@supabase/ssr/dist/module/createServerClient.js
[18:21:04.291] ./node_modules/@supabase/ssr/dist/module/index.js
[18:21:04.291]
[18:21:04.292] ./node_modules/@supabase/supabase-js/dist/module/index.js
[18:21:04.292] A Node.js API is used (process.version at line: 24) which is not supported in the Edge Runtime.
[18:21:04.292] Learn more: https://nextjs.org/docs/api-reference/edge-runtime
[18:21:04.292]
[18:21:04.292] Import trace for requested module:
[18:21:04.293] ./node_modules/@supabase/supabase-js/dist/module/index.js
[18:21:04.293] ./node_modules/@supabase/ssr/dist/module/createServerClient.js
[18:21:04.293] ./node_modules/@supabase/ssr/dist/module/index.js
[18:21:04.294]
[18:21:14.013] ✓ Compiled successfully in 26.2s
[18:21:14.016] Linting and checking validity of types ...
[18:21:24.077]
[18:21:24.078] ./src/app/admin/site-administration/page.tsx
[18:21:24.078] 18:3 Warning: 'Globe' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.078] 20:3 Warning: 'Bell' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.079] 25:3 Warning: 'Upload' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.079] 26:3 Warning: 'Trash2' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.079] 28:3 Warning: 'Eye' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.079] 29:3 Warning: 'Edit' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.079]
[18:21:24.080] ./src/app/api/courses/route.ts
[18:21:24.080] 4:28 Warning: 'request' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.080]
[18:21:24.080] ./src/app/api/courses-v2/route.ts
[18:21:24.080] 72:19 Warning: 'tableInfo' is assigned a value but never used. @typescript-eslint/no-unused-vars
[18:21:24.081]
[18:21:24.081] ./src/app/api/test-auth/route.ts
[18:21:24.081] 4:27 Warning: 'request' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.081]
[18:21:24.081] ./src/app/courses/[slug]/lesson/[lessonSlug]/page.tsx
[18:21:24.082] 6:29 Warning: 'CardDescription' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.082] 11:3 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.083] 13:3 Warning: 'FileText' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.083] 17:3 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.083] 19:3 Warning: 'Unlock' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.083]
[18:21:24.084] ./src/app/courses/[slug]/page.tsx
[18:21:24.084] 12:3 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.085] 13:3 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.085] 14:3 Warning: 'Calendar' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.085] 15:3 Warning: 'ArrowRight' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.085] 17:3 Warning: 'FileText' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.085] 19:3 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.086] 20:3 Warning: 'ChevronDown' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.086] 23:3 Warning: 'Unlock' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.086] 56:10 Warning: 'expandedSections' is assigned a value but never used. @typescript-eslint/no-unused-vars
[18:21:24.086] 129:9 Warning: 'toggleSection' is assigned a value but never used. @typescript-eslint/no-unused-vars
[18:21:24.087]
[18:21:24.087] ./src/app/courses/cbse/mathematics/class-10/lesson/real-numbers-intro/page.tsx
[18:21:24.087] 5:37 Warning: 'Download' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.087] 5:67 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.087] 33:10 Warning: 'pdfViewerReady' is assigned a value but never used. @typescript-eslint/no-unused-vars
[18:21:24.088]
[18:21:24.088] ./src/app/courses/cbse/mathematics/class-10/page.tsx
[18:21:24.107] 35:5 Warning: 'isFree' is assigned a value but never used. @typescript-eslint/no-unused-vars
[18:21:24.108] 36:5 Warning: 'canPreview' is assigned a value but never used. @typescript-eslint/no-unused-vars
[18:21:24.108] 109:9 Warning: 'handleLessonClick' is assigned a value but never used. @typescript-eslint/no-unused-vars
[18:21:24.108] 123:9 Warning: 'handlePreviewClick' is assigned a value but never used. @typescript-eslint/no-unused-vars
[18:21:24.108] 245:23 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[18:21:24.108] 450:29 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[18:21:24.109]
[18:21:24.109] ./src/app/courses/ibdp/mathematics/analysis-approaches-hl/page.tsx
[18:21:24.109] 5:10 Warning: 'Button' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.109] 7:76 Warning: 'Users2' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.109] 7:84 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.109]
[18:21:24.109] ./src/app/dashboard/courses/[id]/edit/page.tsx
[18:21:24.110] 5:47 Warning: 'Play' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.110] 5:53 Warning: 'CheckCircle' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.110] 18:11 Warning: 'CourseBuilderProps' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.110] 38:6 Warning: React Hook useEffect has a missing dependency: 'loadCourse'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[18:21:24.110] 402:39 Warning: 'index' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.110]
[18:21:24.111] ./src/app/dashboard/courses/new/page.tsx
[18:21:24.114] 7:29 Warning: 'CardHeader' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.114] 7:41 Warning: 'CardTitle' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.115]
[18:21:24.115] ./src/app/dashboard/courses/page.tsx
[18:21:24.115] 33:6 Warning: React Hook useEffect has a missing dependency: 'fetchCourses'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[18:21:24.115]
[18:21:24.115] ./src/app/dashboard/page.tsx
[18:21:24.116] 8:20 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.120]
[18:21:24.120] ./src/app/page.tsx
[18:21:24.120] 3:10 Warning: 'useState' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.120] 3:20 Warning: 'useEffect' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.120]
[18:21:24.120] ./src/app/privacy/page.tsx
[18:21:24.120] 5:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.120]
[18:21:24.121] ./src/app/templates/course-templates/course-page/page.tsx
[18:21:24.121] 4:21 Warning: 'Play' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.121] 69:21 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[18:21:24.121] 343:23 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[18:21:24.121] 397:23 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[18:21:24.121]
[18:21:24.121] ./src/app/templates/dashboard-templates/admin-panel/page.tsx
[18:21:24.122] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.122] 5:29 Warning: 'CardDescription' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.122] 5:46 Warning: 'CardHeader' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.122] 5:58 Warning: 'CardTitle' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.122]
[18:21:24.122] ./src/app/templates/dashboard-templates/analytics/page.tsx
[18:21:24.123] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.123] 6:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.123] 7:33 Warning: 'TrendingDown' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.123] 7:64 Warning: 'DollarSign' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.123]
[18:21:24.123] ./src/app/templates/dashboard-templates/instructor-dashboard/page.tsx
[18:21:24.124] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.124] 5:29 Warning: 'CardDescription' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.124] 5:46 Warning: 'CardHeader' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.124] 5:58 Warning: 'CardTitle' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.124] 7:100 Warning: 'Download' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.124]
[18:21:24.124] ./src/app/templates/dashboard-templates/student-dashboard/page.tsx
[18:21:24.125] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.125] 5:29 Warning: 'CardDescription' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.125] 5:46 Warning: 'CardHeader' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.125] 5:58 Warning: 'CardTitle' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.125]
[18:21:24.125] ./src/app/templates/page-templates/about/page.tsx
[18:21:24.125] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.125]
[18:21:24.126] ./src/app/templates/page-templates/contact/page.tsx
[18:21:24.126] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.126]
[18:21:24.126] ./src/app/templates/page-templates/courses-listing/page.tsx
[18:21:24.126] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.126]
[18:21:24.126] ./src/app/templates/page-templates/pricing/page.tsx
[18:21:24.126] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.127] 7:28 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.127]
[18:21:24.127] ./src/app/templates/page-templates/privacy/page.tsx
[18:21:24.127] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.127] 6:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.127]
[18:21:24.127] ./src/app/templates/page-templates/terms/page.tsx
[18:21:24.128] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.128] 6:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.128]
[18:21:24.128] ./src/app/terms/page.tsx
[18:21:24.128] 5:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.135]
[18:21:24.135] ./src/app/test-upload/page.tsx
[18:21:24.135] 10:32 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.135] 191:6 Warning: React Hook useEffect has a missing dependency: 'runConnectionTests'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[18:21:24.136]
[18:21:24.136] ./src/components/content/section-editor.tsx
[18:21:24.136] 4:10 Warning: 'Plus' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.136] 4:30 Warning: 'Eye' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.136] 43:6 Warning: React Hook useEffect has a missing dependency: 'fetchSections'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[18:21:24.137]
[18:21:24.137] ./src/components/ui/file-upload.tsx
[18:21:24.137] 139:16 Warning: Image elements must have an alt prop, either with meaningful text, or an empty string for decorative images. jsx-a11y/alt-text
[18:21:24.137]
[18:21:24.137] ./src/components/ui/header.tsx
[18:21:24.137] 6:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.138]
[18:21:24.138] ./src/contexts/AuthContext.tsx
[18:21:24.138] 121:6 Warning: React Hook useCallback has a missing dependency: 'createProfile'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[18:21:24.138]
[18:21:24.138] ./src/hooks/useCourseData.ts
[18:21:24.139] 83:6 Warning: React Hook useEffect has a missing dependency: 'organizeLessonsIntoSections'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[18:21:24.139] 89:30 Warning: 'index' is defined but never used. @typescript-eslint/no-unused-vars
[18:21:24.139]
[18:21:24.139] ./src/lib/supabase/server.ts
[18:21:24.139] 37:9 Warning: 'cookieString' is assigned a value but never used. @typescript-eslint/no-unused-vars
[18:21:24.140]
[18:21:24.140] info - Need to disable some ESLint rules? Learn more here: https://nextjs.org/docs/app/api-reference/config/eslint#disabling-rules
[18:21:31.385] Failed to compile.
[18:21:31.385]
[18:21:31.387] src/app/courses/[slug]/lesson/[lessonSlug]/page.tsx
[18:21:31.387] Type error: Type '{ params: { slug: string; lessonSlug: string; }; }' does not satisfy the constraint 'PageProps'.
[18:21:31.387] Types of property 'params' are incompatible.
[18:21:31.387] Type '{ slug: string; lessonSlug: string; }' is missing the following properties from type 'Promise<any>': then, catch, finally, [Symbol.toStringTag]
[18:21:31.387]
[18:21:31.417] Next.js build worker exited with code: 1 and signal: null
[18:21:31.439] Error: Command "npm run build" exited with 1
