[18:06:04.469] Running build in Washington, D.C., USA (East) – iad1
[18:06:04.469] Build machine configuration: 2 cores, 8 GB
[18:06:04.506] Cloning github.com/viditforsv/shriarya_lms_next (Branch: dev, Commit: c9bde64)
[18:06:05.316] Cloning completed: 810.000ms
[18:06:10.349] Restored build cache from previous deployment (86Pg4KgE3zMdeYLXwmVDZSUK3941)
[18:06:11.027] Running "vercel build"
[18:06:11.603] Vercel CLI 47.0.4
[18:06:11.949] Installing dependencies...
[18:06:21.072]
[18:06:21.074] added 2 packages, and changed 18 packages in 9s
[18:06:21.076]
[18:06:21.076] 145 packages are looking for funding
[18:06:21.077] run `npm fund` for details
[18:06:21.111] Detected Next.js version: 15.5.2
[18:06:21.116] Running "npm run build"
[18:06:21.234]
[18:06:21.235] > shriarya_lms_next@0.1.0 build
[18:06:21.235] > next build
[18:06:21.235]
[18:06:22.339] ▲ Next.js 15.5.2
[18:06:22.340]
[18:06:22.445] Creating an optimized production build ...
[18:06:41.698] <w> [webpack.cache.PackFileCacheStrategy] Serializing big strings (108kiB) impacts deserialization performance (consider using Buffer instead and decode when needed)
[18:06:41.883] ⚠ Compiled with warnings in 2.1s
[18:06:41.884]
[18:06:41.884] ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
[18:06:41.885] A Node.js API is used (process.versions at line: 34) which is not supported in the Edge Runtime.
[18:06:41.885] Learn more: https://nextjs.org/docs/api-reference/edge-runtime
[18:06:41.885]
[18:06:41.886] Import trace for requested module:
[18:06:41.886] ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
[18:06:41.886] ./node_modules/@supabase/realtime-js/dist/module/index.js
[18:06:41.887] ./node_modules/@supabase/supabase-js/dist/module/index.js
[18:06:41.887] ./node_modules/@supabase/ssr/dist/module/createBrowserClient.js
[18:06:41.887] ./node_modules/@supabase/ssr/dist/module/index.js
[18:06:41.887]
[18:06:41.888] ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
[18:06:41.889] A Node.js API is used (process.versions at line: 35) which is not supported in the Edge Runtime.
[18:06:41.889] Learn more: https://nextjs.org/docs/api-reference/edge-runtime
[18:06:41.889]
[18:06:41.889] Import trace for requested module:
[18:06:41.889] ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
[18:06:41.889] ./node_modules/@supabase/realtime-js/dist/module/index.js
[18:06:41.889] ./node_modules/@supabase/supabase-js/dist/module/index.js
[18:06:41.889] ./node_modules/@supabase/ssr/dist/module/createBrowserClient.js
[18:06:41.889] ./node_modules/@supabase/ssr/dist/module/index.js
[18:06:41.889]
[18:06:41.889] ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
[18:06:41.889] A Node.js API is used (process.versions at line: 36) which is not supported in the Edge Runtime.
[18:06:41.889] Learn more: https://nextjs.org/docs/api-reference/edge-runtime
[18:06:41.890]
[18:06:41.890] Import trace for requested module:
[18:06:41.890] ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
[18:06:41.890] ./node_modules/@supabase/realtime-js/dist/module/index.js
[18:06:41.890] ./node_modules/@supabase/supabase-js/dist/module/index.js
[18:06:41.890] ./node_modules/@supabase/ssr/dist/module/createBrowserClient.js
[18:06:41.890] ./node_modules/@supabase/ssr/dist/module/index.js
[18:06:41.890]
[18:06:41.890] ./node_modules/@supabase/supabase-js/dist/module/index.js
[18:06:41.890] A Node.js API is used (process.version at line: 24) which is not supported in the Edge Runtime.
[18:06:41.890] Learn more: https://nextjs.org/docs/api-reference/edge-runtime
[18:06:41.890]
[18:06:41.890] Import trace for requested module:
[18:06:41.890] ./node_modules/@supabase/supabase-js/dist/module/index.js
[18:06:41.890] ./node_modules/@supabase/ssr/dist/module/createBrowserClient.js
[18:06:41.890] ./node_modules/@supabase/ssr/dist/module/index.js
[18:06:41.890]
[18:06:51.986] ✓ Compiled successfully in 26.7s
[18:06:51.991] Linting and checking validity of types ...
[18:07:02.878]
[18:07:02.885] Failed to compile.
[18:07:02.886]
[18:07:02.886] ./src/app/admin/site-administration/page.tsx
[18:07:02.889] 18:3 Warning: 'Globe' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.889] 20:3 Warning: 'Bell' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.889] 25:3 Warning: 'Upload' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.889] 26:3 Warning: 'Trash2' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.890] 28:3 Warning: 'Eye' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.890] 29:3 Warning: 'Edit' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.890]
[18:07:02.890] ./src/app/api/courses/route.ts
[18:07:02.891] 4:28 Warning: 'request' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.891]
[18:07:02.894] ./src/app/api/courses-v2/route.ts
[18:07:02.894] 72:19 Warning: 'tableInfo' is assigned a value but never used. @typescript-eslint/no-unused-vars
[18:07:02.895]
[18:07:02.895] ./src/app/api/test-auth/route.ts
[18:07:02.895] 4:27 Warning: 'request' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.895]
[18:07:02.896] ./src/app/components-demo/page.tsx
[18:07:02.896] 2382:11 Error: Do not use an `<a>` element to navigate to `/courses/`. Use `<Link />` from `next/link` instead. See: https://nextjs.org/docs/messages/no-html-link-for-pages @next/next/no-html-link-for-pages
[18:07:02.897] 2382:11 Error: Do not use an `<a>` element to navigate to `/courses/`. Use `<Link />` from `next/link` instead. See: https://nextjs.org/docs/messages/no-html-link-for-pages @next/next/no-html-link-for-pages
[18:07:02.899]
[18:07:02.900] ./src/app/courses/[slug]/lesson/[lessonSlug]/page.tsx
[18:07:02.900] 6:29 Warning: 'CardDescription' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.900] 11:3 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.901] 13:3 Warning: 'FileText' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.901] 17:3 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.901] 19:3 Warning: 'Unlock' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.901] 220:85 Error: Unexpected any. Specify a different type. @typescript-eslint/no-explicit-any
[18:07:02.902]
[18:07:02.902] ./src/app/courses/[slug]/page.tsx
[18:07:02.902] 12:3 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.902] 13:3 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.903] 14:3 Warning: 'Calendar' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.903] 15:3 Warning: 'ArrowRight' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.903] 17:3 Warning: 'FileText' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.904] 19:3 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.904] 20:3 Warning: 'ChevronDown' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.904] 23:3 Warning: 'Unlock' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.905] 56:10 Warning: 'expandedSections' is assigned a value but never used. @typescript-eslint/no-unused-vars
[18:07:02.905] 129:9 Warning: 'toggleSection' is assigned a value but never used. @typescript-eslint/no-unused-vars
[18:07:02.905] 256:68 Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`. react/no-unescaped-entities
[18:07:02.905]
[18:07:02.906] ./src/app/courses/cbse/mathematics/class-10/lesson/[slug]/page.tsx
[18:07:02.906] 367:59 Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`. react/no-unescaped-entities
[18:07:02.906] 462:45 Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`. react/no-unescaped-entities
[18:07:02.906]
[18:07:02.906] ./src/app/courses/cbse/mathematics/class-10/lesson/real-numbers-intro/page.tsx
[18:07:02.907] 5:37 Warning: 'Download' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.907] 5:67 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.907] 33:10 Warning: 'pdfViewerReady' is assigned a value but never used. @typescript-eslint/no-unused-vars
[18:07:02.907]
[18:07:02.908] ./src/app/courses/cbse/mathematics/class-10/page.tsx
[18:07:02.908] 35:5 Warning: 'isFree' is assigned a value but never used. @typescript-eslint/no-unused-vars
[18:07:02.908] 36:5 Warning: 'canPreview' is assigned a value but never used. @typescript-eslint/no-unused-vars
[18:07:02.908] 109:9 Warning: 'handleLessonClick' is assigned a value but never used. @typescript-eslint/no-unused-vars
[18:07:02.909] 123:9 Warning: 'handlePreviewClick' is assigned a value but never used. @typescript-eslint/no-unused-vars
[18:07:02.909] 245:23 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[18:07:02.909] 450:29 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[18:07:02.909]
[18:07:02.910] ./src/app/courses/ibdp/mathematics/analysis-approaches-hl/page.tsx
[18:07:02.910] 5:10 Warning: 'Button' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.910] 7:76 Warning: 'Users2' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.911] 7:84 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.911]
[18:07:02.911] ./src/app/dashboard/courses/[id]/edit/page.tsx
[18:07:02.911] 5:47 Warning: 'Play' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.912] 5:53 Warning: 'CheckCircle' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.912] 18:11 Warning: 'CourseBuilderProps' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.912] 38:6 Warning: React Hook useEffect has a missing dependency: 'loadCourse'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[18:07:02.912] 402:39 Warning: 'index' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.913]
[18:07:02.913] ./src/app/dashboard/courses/new/page.tsx
[18:07:02.913] 7:29 Warning: 'CardHeader' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.914] 7:41 Warning: 'CardTitle' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.914] 131:18 Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`. react/no-unescaped-entities
[18:07:02.914]
[18:07:02.914] ./src/app/dashboard/courses/page.tsx
[18:07:02.915] 33:6 Warning: React Hook useEffect has a missing dependency: 'fetchCourses'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[18:07:02.915]
[18:07:02.915] ./src/app/dashboard/page.tsx
[18:07:02.915] 8:20 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.915]
[18:07:02.916] ./src/app/debug-auth/page.tsx
[18:07:02.916] 11:48 Error: Unexpected any. Specify a different type. @typescript-eslint/no-explicit-any
[18:07:02.916]
[18:07:02.916] ./src/app/page.tsx
[18:07:02.917] 3:10 Warning: 'useState' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.917] 3:20 Warning: 'useEffect' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.917]
[18:07:02.917] ./src/app/privacy/page.tsx
[18:07:02.918] 5:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.918]
[18:07:02.918] ./src/app/templates/course-templates/course-page/page.tsx
[18:07:02.918] 4:21 Warning: 'Play' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.919] 69:21 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[18:07:02.919] 343:23 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[18:07:02.919] 397:23 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[18:07:02.919]
[18:07:02.920] ./src/app/templates/dashboard-templates/admin-panel/page.tsx
[18:07:02.920] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.920] 5:29 Warning: 'CardDescription' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.920] 5:46 Warning: 'CardHeader' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.921] 5:58 Warning: 'CardTitle' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.921]
[18:07:02.921] ./src/app/templates/dashboard-templates/analytics/page.tsx
[18:07:02.921] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.922] 6:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.922] 7:33 Warning: 'TrendingDown' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.922] 7:64 Warning: 'DollarSign' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.922]
[18:07:02.923] ./src/app/templates/dashboard-templates/instructor-dashboard/page.tsx
[18:07:02.923] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.923] 5:29 Warning: 'CardDescription' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.923] 5:46 Warning: 'CardHeader' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.926] 5:58 Warning: 'CardTitle' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.926] 7:100 Warning: 'Download' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.926]
[18:07:02.927] ./src/app/templates/dashboard-templates/student-dashboard/page.tsx
[18:07:02.927] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.927] 5:29 Warning: 'CardDescription' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.927] 5:46 Warning: 'CardHeader' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.928] 5:58 Warning: 'CardTitle' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.928]
[18:07:02.928] ./src/app/templates/page-templates/about/page.tsx
[18:07:02.929] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.929]
[18:07:02.929] ./src/app/templates/page-templates/contact/page.tsx
[18:07:02.929] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.930]
[18:07:02.930] ./src/app/templates/page-templates/courses-listing/page.tsx
[18:07:02.930] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.931]
[18:07:02.931] ./src/app/templates/page-templates/pricing/page.tsx
[18:07:02.931] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.932] 7:28 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.932]
[18:07:02.932] ./src/app/templates/page-templates/privacy/page.tsx
[18:07:02.932] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.933] 6:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.933]
[18:07:02.933] ./src/app/templates/page-templates/terms/page.tsx
[18:07:02.933] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.934] 6:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.934]
[18:07:02.934] ./src/app/terms/page.tsx
[18:07:02.935] 5:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.935]
[18:07:02.935] ./src/app/test-upload/page.tsx
[18:07:02.935] 10:32 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.936] 14:62 Error: Unexpected any. Specify a different type. @typescript-eslint/no-explicit-any
[18:07:02.936] 24:50 Error: Unexpected any. Specify a different type. @typescript-eslint/no-explicit-any
[18:07:02.936] 26:43 Error: Unexpected any. Specify a different type. @typescript-eslint/no-explicit-any
[18:07:02.936] 164:6 Warning: React Hook useEffect has a missing dependency: 'runConnectionTests'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[18:07:02.937] 246:75 Error: Unexpected any. Specify a different type. @typescript-eslint/no-explicit-any
[18:07:02.937]
[18:07:02.937] ./src/components/content/section-editor.tsx
[18:07:02.937] 4:10 Warning: 'Plus' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.938] 4:30 Warning: 'Eye' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.939] 43:6 Warning: React Hook useEffect has a missing dependency: 'fetchSections'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[18:07:02.939]
[18:07:02.940] ./src/components/ui/file-upload.tsx
[18:07:02.940] 139:16 Warning: Image elements must have an alt prop, either with meaningful text, or an empty string for decorative images. jsx-a11y/alt-text
[18:07:02.941]
[18:07:02.941] ./src/components/ui/header.tsx
[18:07:02.941] 6:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.941]
[18:07:02.942] ./src/components/ui/textarea.tsx
[18:07:02.942] 5:18 Error: An interface declaring no members is equivalent to its supertype. @typescript-eslint/no-empty-object-type
[18:07:02.942]
[18:07:02.942] ./src/contexts/AuthContext.tsx
[18:07:02.943] 121:6 Warning: React Hook useCallback has a missing dependency: 'createProfile'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[18:07:02.943]
[18:07:02.943] ./src/hooks/useCourseData.ts
[18:07:02.943] 83:6 Warning: React Hook useEffect has a missing dependency: 'organizeLessonsIntoSections'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[18:07:02.944] 89:30 Warning: 'index' is defined but never used. @typescript-eslint/no-unused-vars
[18:07:02.944]
[18:07:02.944] ./src/lib/supabase/server.ts
[18:07:02.944] 37:9 Warning: 'cookieString' is assigned a value but never used. @typescript-eslint/no-unused-vars
[18:07:02.945]
[18:07:02.945] info - Need to disable some ESLint rules? Learn more here: https://nextjs.org/docs/app/api-reference/config/eslint#disabling-rules
[18:07:02.961] Error: Command "npm run build" exited with 1
