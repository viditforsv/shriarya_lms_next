[18:34:29.269] Running build in Washington, D.C., USA (East) – iad1
[18:34:29.270] Build machine configuration: 2 cores, 8 GB
[18:34:29.327] Cloning github.com/viditforsv/shriarya_lms_next (Branch: dev, Commit: e5a5e52)
[18:34:30.062] Cloning completed: 735.000ms
[18:34:33.312] Restored build cache from previous deployment (86Pg4KgE3zMdeYLXwmVDZSUK3941)
[18:34:33.854] Running "vercel build"
[18:34:34.243] Vercel CLI 47.0.4
[18:34:34.576] Installing dependencies...
[18:34:44.179]
[18:34:44.179] added 2 packages, and changed 18 packages in 9s
[18:34:44.179]
[18:34:44.179] 145 packages are looking for funding
[18:34:44.179] run `npm fund` for details
[18:34:44.238] Detected Next.js version: 15.5.2
[18:34:44.244] Running "npm run build"
[18:34:44.371]
[18:34:44.373] > shriarya_lms_next@0.1.0 build
[18:34:44.374] > next build
[18:34:44.374]
[18:34:45.372] ▲ Next.js 15.5.2
[18:34:45.375]
[18:34:45.472] Creating an optimized production build ...
[18:35:04.288] <w> [webpack.cache.PackFileCacheStrategy] Serializing big strings (108kiB) impacts deserialization performance (consider using Buffer instead and decode when needed)
[18:35:04.484] ⚠ Compiled with warnings in 2.2s
[18:35:04.485]
[18:35:04.485] ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
[18:35:04.485] A Node.js API is used (process.versions at line: 34) which is not supported in the Edge Runtime.
[18:35:04.486] Learn more: https://nextjs.org/docs/api-reference/edge-runtime
[18:35:04.486]
[18:35:04.486] Import trace for requested module:
[18:35:04.486] ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
[18:35:04.486] ./node_modules/@supabase/realtime-js/dist/module/index.js
[18:35:04.486] ./node_modules/@supabase/supabase-js/dist/module/index.js
[18:35:04.487] ./node_modules/@supabase/ssr/dist/module/createBrowserClient.js
[18:35:04.487] ./node_modules/@supabase/ssr/dist/module/index.js
[18:35:04.487]
[18:35:04.487] ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
[18:35:04.487] A Node.js API is used (process.versions at line: 35) which is not supported in the Edge Runtime.
[18:35:04.488] Learn more: https://nextjs.org/docs/api-reference/edge-runtime
[18:35:04.488]
[18:35:04.488] Import trace for requested module:
[18:35:04.488] ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
[18:35:04.488] ./node_modules/@supabase/realtime-js/dist/module/index.js
[18:35:04.488] ./node_modules/@supabase/supabase-js/dist/module/index.js
[18:35:04.489] ./node_modules/@supabase/ssr/dist/module/createBrowserClient.js
[18:35:04.489] ./node_modules/@supabase/ssr/dist/module/index.js
[18:35:04.489]
[18:35:04.489] ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
[18:35:04.489] A Node.js API is used (process.versions at line: 36) which is not supported in the Edge Runtime.
[18:35:04.490] Learn more: https://nextjs.org/docs/api-reference/edge-runtime
[18:35:04.490]
[18:35:04.490] Import trace for requested module:
[18:35:04.490] ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
[18:35:04.490] ./node_modules/@supabase/realtime-js/dist/module/index.js
[18:35:04.490] ./node_modules/@supabase/supabase-js/dist/module/index.js
[18:35:04.491] ./node_modules/@supabase/ssr/dist/module/createBrowserClient.js
[18:35:04.491] ./node_modules/@supabase/ssr/dist/module/index.js
[18:35:04.491]
[18:35:04.491] ./node_modules/@supabase/supabase-js/dist/module/index.js
[18:35:04.491] A Node.js API is used (process.version at line: 24) which is not supported in the Edge Runtime.
[18:35:04.492] Learn more: https://nextjs.org/docs/api-reference/edge-runtime
[18:35:04.492]
[18:35:04.492] Import trace for requested module:
[18:35:04.492] ./node_modules/@supabase/supabase-js/dist/module/index.js
[18:35:04.492] ./node_modules/@supabase/ssr/dist/module/createBrowserClient.js
[18:35:04.493] ./node_modules/@supabase/ssr/dist/module/index.js
[18:35:04.493]
[18:35:15.166] ✓ Compiled successfully in 26.9s
[18:35:15.172] Linting and checking validity of types ...
[18:35:25.942]
[18:35:25.942] ./src/app/admin/site-administration/page.tsx
[18:35:25.942] 18:3 Warning: 'Globe' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.943] 20:3 Warning: 'Bell' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.943] 25:3 Warning: 'Upload' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.943] 26:3 Warning: 'Trash2' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.943] 28:3 Warning: 'Eye' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.943] 29:3 Warning: 'Edit' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.948]
[18:35:25.949] ./src/app/api/courses/route.ts
[18:35:25.949] 4:28 Warning: 'request' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.949]
[18:35:25.949] ./src/app/api/courses-v2/route.ts
[18:35:25.949] 72:19 Warning: 'tableInfo' is assigned a value but never used. @typescript-eslint/no-unused-vars
[18:35:25.949]
[18:35:25.949] ./src/app/api/test-auth/route.ts
[18:35:25.949] 4:27 Warning: 'request' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.949]
[18:35:25.949] ./src/app/courses/[slug]/lesson/[lessonSlug]/page.tsx
[18:35:25.950] 6:29 Warning: 'CardDescription' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.950] 11:3 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.950] 13:3 Warning: 'FileText' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.951] 17:3 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.951] 19:3 Warning: 'Unlock' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.951]
[18:35:25.951] ./src/app/courses/[slug]/page.tsx
[18:35:25.951] 12:3 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.951] 13:3 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.951] 14:3 Warning: 'Calendar' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.952] 15:3 Warning: 'ArrowRight' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.952] 17:3 Warning: 'FileText' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.952] 19:3 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.952] 20:3 Warning: 'ChevronDown' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.952] 23:3 Warning: 'Unlock' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.952] 56:10 Warning: 'expandedSections' is assigned a value but never used. @typescript-eslint/no-unused-vars
[18:35:25.953] 129:9 Warning: 'toggleSection' is assigned a value but never used. @typescript-eslint/no-unused-vars
[18:35:25.953]
[18:35:25.953] ./src/app/courses/cbse/mathematics/class-10/lesson/real-numbers-intro/page.tsx
[18:35:25.953] 5:37 Warning: 'Download' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.953] 5:67 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.955] 33:10 Warning: 'pdfViewerReady' is assigned a value but never used. @typescript-eslint/no-unused-vars
[18:35:25.955]
[18:35:25.955] ./src/app/courses/cbse/mathematics/class-10/page.tsx
[18:35:25.955] 35:5 Warning: 'isFree' is assigned a value but never used. @typescript-eslint/no-unused-vars
[18:35:25.956] 36:5 Warning: 'canPreview' is assigned a value but never used. @typescript-eslint/no-unused-vars
[18:35:25.956] 109:9 Warning: 'handleLessonClick' is assigned a value but never used. @typescript-eslint/no-unused-vars
[18:35:25.956] 123:9 Warning: 'handlePreviewClick' is assigned a value but never used. @typescript-eslint/no-unused-vars
[18:35:25.956] 245:23 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[18:35:25.957] 450:29 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[18:35:25.957]
[18:35:25.957] ./src/app/courses/ibdp/mathematics/analysis-approaches-hl/page.tsx
[18:35:25.957] 5:10 Warning: 'Button' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.957] 7:76 Warning: 'Users2' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.958] 7:84 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.962]
[18:35:25.962] ./src/app/dashboard/courses/[id]/edit/page.tsx
[18:35:25.963] 5:47 Warning: 'Play' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.963] 5:53 Warning: 'CheckCircle' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.963] 18:11 Warning: 'CourseBuilderProps' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.965] 38:6 Warning: React Hook useEffect has a missing dependency: 'loadCourse'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[18:35:25.966] 402:39 Warning: 'index' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.966]
[18:35:25.966] ./src/app/dashboard/courses/new/page.tsx
[18:35:25.966] 7:29 Warning: 'CardHeader' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.966] 7:41 Warning: 'CardTitle' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.966]
[18:35:25.967] ./src/app/dashboard/courses/page.tsx
[18:35:25.967] 33:6 Warning: React Hook useEffect has a missing dependency: 'fetchCourses'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[18:35:25.969]
[18:35:25.970] ./src/app/dashboard/page.tsx
[18:35:25.970] 8:20 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.973]
[18:35:25.973] ./src/app/page.tsx
[18:35:25.973] 3:10 Warning: 'useState' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.973] 3:20 Warning: 'useEffect' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.974]
[18:35:25.974] ./src/app/privacy/page.tsx
[18:35:25.974] 5:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.974]
[18:35:25.975] ./src/app/templates/course-templates/course-page/page.tsx
[18:35:25.975] 4:21 Warning: 'Play' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.975] 69:21 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[18:35:25.976] 343:23 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[18:35:25.976] 397:23 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[18:35:25.976]
[18:35:25.976] ./src/app/templates/dashboard-templates/admin-panel/page.tsx
[18:35:25.977] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.977] 5:29 Warning: 'CardDescription' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.977] 5:46 Warning: 'CardHeader' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.977] 5:58 Warning: 'CardTitle' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.978]
[18:35:25.978] ./src/app/templates/dashboard-templates/analytics/page.tsx
[18:35:25.978] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.978] 6:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.979] 7:33 Warning: 'TrendingDown' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.983] 7:64 Warning: 'DollarSign' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.984]
[18:35:25.984] ./src/app/templates/dashboard-templates/instructor-dashboard/page.tsx
[18:35:25.984] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.985] 5:29 Warning: 'CardDescription' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.985] 5:46 Warning: 'CardHeader' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.985] 5:58 Warning: 'CardTitle' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.986] 7:100 Warning: 'Download' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.986]
[18:35:25.986] ./src/app/templates/dashboard-templates/student-dashboard/page.tsx
[18:35:25.986] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.987] 5:29 Warning: 'CardDescription' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.987] 5:46 Warning: 'CardHeader' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.987] 5:58 Warning: 'CardTitle' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.987]
[18:35:25.988] ./src/app/templates/page-templates/about/page.tsx
[18:35:25.988] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.988]
[18:35:25.988] ./src/app/templates/page-templates/contact/page.tsx
[18:35:25.989] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.989]
[18:35:25.989] ./src/app/templates/page-templates/courses-listing/page.tsx
[18:35:25.989] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.990]
[18:35:25.990] ./src/app/templates/page-templates/pricing/page.tsx
[18:35:25.990] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.990] 7:28 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.990]
[18:35:25.991] ./src/app/templates/page-templates/privacy/page.tsx
[18:35:25.991] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.991] 6:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.991]
[18:35:25.992] ./src/app/templates/page-templates/terms/page.tsx
[18:35:25.992] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.992] 6:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.992]
[18:35:25.993] ./src/app/terms/page.tsx
[18:35:25.993] 5:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.993]
[18:35:25.993] ./src/app/test-upload/page.tsx
[18:35:25.994] 10:32 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.994] 191:6 Warning: React Hook useEffect has a missing dependency: 'runConnectionTests'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[18:35:25.994]
[18:35:25.994] ./src/components/content/section-editor.tsx
[18:35:25.995] 4:10 Warning: 'Plus' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.997] 4:30 Warning: 'Eye' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.998] 43:6 Warning: React Hook useEffect has a missing dependency: 'fetchSections'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[18:35:25.998]
[18:35:25.998] ./src/components/ui/file-upload.tsx
[18:35:25.998] 139:16 Warning: Image elements must have an alt prop, either with meaningful text, or an empty string for decorative images. jsx-a11y/alt-text
[18:35:25.999]
[18:35:25.999] ./src/components/ui/header.tsx
[18:35:25.999] 6:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:25.999]
[18:35:26.000] ./src/contexts/AuthContext.tsx
[18:35:26.000] 121:6 Warning: React Hook useCallback has a missing dependency: 'createProfile'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[18:35:26.000]
[18:35:26.000] ./src/hooks/useCourseData.ts
[18:35:26.001] 83:6 Warning: React Hook useEffect has a missing dependency: 'organizeLessonsIntoSections'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[18:35:26.001] 89:30 Warning: 'index' is defined but never used. @typescript-eslint/no-unused-vars
[18:35:26.001]
[18:35:26.001] ./src/lib/supabase/server.ts
[18:35:26.002] 37:9 Warning: 'cookieString' is assigned a value but never used. @typescript-eslint/no-unused-vars
[18:35:26.002]
[18:35:26.002] info - Need to disable some ESLint rules? Learn more here: https://nextjs.org/docs/app/api-reference/config/eslint#disabling-rules
[18:35:33.102] Failed to compile.
[18:35:33.103]
[18:35:33.104] src/app/courses/[slug]/page.tsx
[18:35:33.105] Type error: Type '{ params: { slug: string; }; }' does not satisfy the constraint 'PageProps'.
[18:35:33.105] Types of property 'params' are incompatible.
[18:35:33.105] Type '{ slug: string; }' is missing the following properties from type 'Promise<any>': then, catch, finally, [Symbol.toStringTag]
[18:35:33.105]
[18:35:33.135] Next.js build worker exited with code: 1 and signal: null
[18:35:33.157] Error: Command "npm run build" exited with 1
