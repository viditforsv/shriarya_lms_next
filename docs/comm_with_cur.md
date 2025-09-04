[18:12:57.700] Running build in Washington, D.C., USA (East) – iad1
[18:12:57.700] Build machine configuration: 2 cores, 8 GB
[18:12:57.718] Cloning github.com/viditforsv/shriarya_lms_next (Branch: dev, Commit: c8dd5c4)
[18:12:58.920] Cloning completed: 1.202s
[18:13:02.501] Restored build cache from previous deployment (86Pg4KgE3zMdeYLXwmVDZSUK3941)
[18:13:03.043] Running "vercel build"
[18:13:03.466] Vercel CLI 47.0.4
[18:13:04.087] Installing dependencies...
[18:13:15.915]
[18:13:15.915] added 2 packages, and changed 18 packages in 11s
[18:13:15.916]
[18:13:15.916] 145 packages are looking for funding
[18:13:15.916] run `npm fund` for details
[18:13:15.952] Detected Next.js version: 15.5.2
[18:13:15.956] Running "npm run build"
[18:13:16.103]
[18:13:16.104] > shriarya_lms_next@0.1.0 build
[18:13:16.104] > next build
[18:13:16.104]
[18:13:16.963] ▲ Next.js 15.5.2
[18:13:16.963]
[18:13:17.062] Creating an optimized production build ...
[18:13:36.022] <w> [webpack.cache.PackFileCacheStrategy] Serializing big strings (108kiB) impacts deserialization performance (consider using Buffer instead and decode when needed)
[18:13:36.216] ⚠ Compiled with warnings in 2.1s
[18:13:36.217]
[18:13:36.217] ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
[18:13:36.217] A Node.js API is used (process.versions at line: 34) which is not supported in the Edge Runtime.
[18:13:36.218] Learn more: https://nextjs.org/docs/api-reference/edge-runtime
[18:13:36.218]
[18:13:36.218] Import trace for requested module:
[18:13:36.219] ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
[18:13:36.219] ./node_modules/@supabase/realtime-js/dist/module/index.js
[18:13:36.219] ./node_modules/@supabase/supabase-js/dist/module/index.js
[18:13:36.219] ./node_modules/@supabase/ssr/dist/module/createBrowserClient.js
[18:13:36.220] ./node_modules/@supabase/ssr/dist/module/index.js
[18:13:36.220]
[18:13:36.220] ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
[18:13:36.220] A Node.js API is used (process.versions at line: 35) which is not supported in the Edge Runtime.
[18:13:36.221] Learn more: https://nextjs.org/docs/api-reference/edge-runtime
[18:13:36.221]
[18:13:36.221] Import trace for requested module:
[18:13:36.221] ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
[18:13:36.222] ./node_modules/@supabase/realtime-js/dist/module/index.js
[18:13:36.222] ./node_modules/@supabase/supabase-js/dist/module/index.js
[18:13:36.222] ./node_modules/@supabase/ssr/dist/module/createBrowserClient.js
[18:13:36.222] ./node_modules/@supabase/ssr/dist/module/index.js
[18:13:36.223]
[18:13:36.224] ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
[18:13:36.224] A Node.js API is used (process.versions at line: 36) which is not supported in the Edge Runtime.
[18:13:36.224] Learn more: https://nextjs.org/docs/api-reference/edge-runtime
[18:13:36.224]
[18:13:36.224] Import trace for requested module:
[18:13:36.224] ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
[18:13:36.224] ./node_modules/@supabase/realtime-js/dist/module/index.js
[18:13:36.225] ./node_modules/@supabase/supabase-js/dist/module/index.js
[18:13:36.225] ./node_modules/@supabase/ssr/dist/module/createBrowserClient.js
[18:13:36.225] ./node_modules/@supabase/ssr/dist/module/index.js
[18:13:36.225]
[18:13:36.225] ./node_modules/@supabase/supabase-js/dist/module/index.js
[18:13:36.225] A Node.js API is used (process.version at line: 24) which is not supported in the Edge Runtime.
[18:13:36.225] Learn more: https://nextjs.org/docs/api-reference/edge-runtime
[18:13:36.225]
[18:13:36.225] Import trace for requested module:
[18:13:36.226] ./node_modules/@supabase/supabase-js/dist/module/index.js
[18:13:36.226] ./node_modules/@supabase/ssr/dist/module/createBrowserClient.js
[18:13:36.226] ./node_modules/@supabase/ssr/dist/module/index.js
[18:13:36.227]
[18:13:39.000]
[18:13:39.001]
[18:13:39.001] Retrying 1/3...
[18:13:39.002]
[18:13:39.002]
[18:13:39.002] Retrying 1/3...
[18:13:46.390] ✓ Compiled successfully in 26.5s
[18:13:46.399] Linting and checking validity of types ...
[18:13:57.163]
[18:13:57.167] Failed to compile.
[18:13:57.168]
[18:13:57.169] ./src/app/admin/site-administration/page.tsx
[18:13:57.169] 18:3 Warning: 'Globe' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.169] 20:3 Warning: 'Bell' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.170] 25:3 Warning: 'Upload' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.170] 26:3 Warning: 'Trash2' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.170] 28:3 Warning: 'Eye' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.170] 29:3 Warning: 'Edit' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.171]
[18:13:57.172] ./src/app/api/courses/route.ts
[18:13:57.172] 4:28 Warning: 'request' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.172]
[18:13:57.173] ./src/app/api/courses-v2/route.ts
[18:13:57.173] 72:19 Warning: 'tableInfo' is assigned a value but never used. @typescript-eslint/no-unused-vars
[18:13:57.173]
[18:13:57.173] ./src/app/api/test-auth/route.ts
[18:13:57.173] 4:27 Warning: 'request' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.178]
[18:13:57.178] ./src/app/courses/[slug]/lesson/[lessonSlug]/page.tsx
[18:13:57.178] 6:29 Warning: 'CardDescription' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.179] 11:3 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.179] 13:3 Warning: 'FileText' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.179] 17:3 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.184] 19:3 Warning: 'Unlock' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.184] 220:85 Error: Unexpected any. Specify a different type. @typescript-eslint/no-explicit-any
[18:13:57.184]
[18:13:57.184] ./src/app/courses/[slug]/page.tsx
[18:13:57.185] 12:3 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.185] 13:3 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.185] 14:3 Warning: 'Calendar' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.185] 15:3 Warning: 'ArrowRight' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.185] 17:3 Warning: 'FileText' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.185] 19:3 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.185] 20:3 Warning: 'ChevronDown' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.186] 23:3 Warning: 'Unlock' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.186] 56:10 Warning: 'expandedSections' is assigned a value but never used. @typescript-eslint/no-unused-vars
[18:13:57.186] 129:9 Warning: 'toggleSection' is assigned a value but never used. @typescript-eslint/no-unused-vars
[18:13:57.186]
[18:13:57.186] ./src/app/courses/cbse/mathematics/class-10/lesson/[slug]/page.tsx
[18:13:57.187] 367:59 Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`. react/no-unescaped-entities
[18:13:57.187] 462:45 Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`. react/no-unescaped-entities
[18:13:57.187]
[18:13:57.187] ./src/app/courses/cbse/mathematics/class-10/lesson/real-numbers-intro/page.tsx
[18:13:57.187] 5:37 Warning: 'Download' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.187] 5:67 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.188] 33:10 Warning: 'pdfViewerReady' is assigned a value but never used. @typescript-eslint/no-unused-vars
[18:13:57.188]
[18:13:57.188] ./src/app/courses/cbse/mathematics/class-10/page.tsx
[18:13:57.188] 35:5 Warning: 'isFree' is assigned a value but never used. @typescript-eslint/no-unused-vars
[18:13:57.188] 36:5 Warning: 'canPreview' is assigned a value but never used. @typescript-eslint/no-unused-vars
[18:13:57.189] 109:9 Warning: 'handleLessonClick' is assigned a value but never used. @typescript-eslint/no-unused-vars
[18:13:57.189] 123:9 Warning: 'handlePreviewClick' is assigned a value but never used. @typescript-eslint/no-unused-vars
[18:13:57.189] 245:23 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[18:13:57.189] 450:29 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[18:13:57.189]
[18:13:57.190] ./src/app/courses/ibdp/mathematics/analysis-approaches-hl/page.tsx
[18:13:57.197] 5:10 Warning: 'Button' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.198] 7:76 Warning: 'Users2' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.198] 7:84 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.198]
[18:13:57.198] ./src/app/dashboard/courses/[id]/edit/page.tsx
[18:13:57.198] 5:47 Warning: 'Play' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.199] 5:53 Warning: 'CheckCircle' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.199] 18:11 Warning: 'CourseBuilderProps' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.199] 38:6 Warning: React Hook useEffect has a missing dependency: 'loadCourse'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[18:13:57.199] 402:39 Warning: 'index' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.199]
[18:13:57.200] ./src/app/dashboard/courses/new/page.tsx
[18:13:57.200] 7:29 Warning: 'CardHeader' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.200] 7:41 Warning: 'CardTitle' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.200]
[18:13:57.200] ./src/app/dashboard/courses/page.tsx
[18:13:57.201] 33:6 Warning: React Hook useEffect has a missing dependency: 'fetchCourses'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[18:13:57.201]
[18:13:57.201] ./src/app/dashboard/page.tsx
[18:13:57.201] 8:20 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.201]
[18:13:57.201] ./src/app/debug-auth/page.tsx
[18:13:57.202] 11:48 Error: Unexpected any. Specify a different type. @typescript-eslint/no-explicit-any
[18:13:57.202]
[18:13:57.202] ./src/app/page.tsx
[18:13:57.202] 3:10 Warning: 'useState' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.202] 3:20 Warning: 'useEffect' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.202]
[18:13:57.203] ./src/app/privacy/page.tsx
[18:13:57.203] 5:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.203]
[18:13:57.203] ./src/app/templates/course-templates/course-page/page.tsx
[18:13:57.203] 4:21 Warning: 'Play' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.204] 69:21 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[18:13:57.204] 343:23 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[18:13:57.204] 397:23 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[18:13:57.204]
[18:13:57.204] ./src/app/templates/dashboard-templates/admin-panel/page.tsx
[18:13:57.205] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.205] 5:29 Warning: 'CardDescription' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.205] 5:46 Warning: 'CardHeader' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.205] 5:58 Warning: 'CardTitle' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.205]
[18:13:57.205] ./src/app/templates/dashboard-templates/analytics/page.tsx
[18:13:57.206] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.206] 6:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.206] 7:33 Warning: 'TrendingDown' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.206] 7:64 Warning: 'DollarSign' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.206]
[18:13:57.207] ./src/app/templates/dashboard-templates/instructor-dashboard/page.tsx
[18:13:57.207] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.207] 5:29 Warning: 'CardDescription' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.207] 5:46 Warning: 'CardHeader' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.207] 5:58 Warning: 'CardTitle' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.207] 7:100 Warning: 'Download' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.208]
[18:13:57.208] ./src/app/templates/dashboard-templates/student-dashboard/page.tsx
[18:13:57.208] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.208] 5:29 Warning: 'CardDescription' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.208] 5:46 Warning: 'CardHeader' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.209] 5:58 Warning: 'CardTitle' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.209]
[18:13:57.209] ./src/app/templates/page-templates/about/page.tsx
[18:13:57.209] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.209]
[18:13:57.210] ./src/app/templates/page-templates/contact/page.tsx
[18:13:57.210] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.210]
[18:13:57.210] ./src/app/templates/page-templates/courses-listing/page.tsx
[18:13:57.210] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.211]
[18:13:57.211] ./src/app/templates/page-templates/pricing/page.tsx
[18:13:57.211] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.211] 7:28 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.211]
[18:13:57.211] ./src/app/templates/page-templates/privacy/page.tsx
[18:13:57.212] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.212] 6:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.217]
[18:13:57.217] ./src/app/templates/page-templates/terms/page.tsx
[18:13:57.217] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.217] 6:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.218]
[18:13:57.218] ./src/app/terms/page.tsx
[18:13:57.218] 5:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.218]
[18:13:57.218] ./src/app/test-upload/page.tsx
[18:13:57.218] 10:32 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.218] 14:62 Error: Unexpected any. Specify a different type. @typescript-eslint/no-explicit-any
[18:13:57.218] 24:50 Error: Unexpected any. Specify a different type. @typescript-eslint/no-explicit-any
[18:13:57.219] 26:43 Error: Unexpected any. Specify a different type. @typescript-eslint/no-explicit-any
[18:13:57.219] 164:6 Warning: React Hook useEffect has a missing dependency: 'runConnectionTests'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[18:13:57.219] 246:75 Error: Unexpected any. Specify a different type. @typescript-eslint/no-explicit-any
[18:13:57.219]
[18:13:57.219] ./src/components/content/section-editor.tsx
[18:13:57.220] 4:10 Warning: 'Plus' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.220] 4:30 Warning: 'Eye' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.220] 43:6 Warning: React Hook useEffect has a missing dependency: 'fetchSections'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[18:13:57.220]
[18:13:57.220] ./src/components/ui/file-upload.tsx
[18:13:57.221] 139:16 Warning: Image elements must have an alt prop, either with meaningful text, or an empty string for decorative images. jsx-a11y/alt-text
[18:13:57.221]
[18:13:57.221] ./src/components/ui/header.tsx
[18:13:57.221] 6:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.221]
[18:13:57.222] ./src/components/ui/textarea.tsx
[18:13:57.223] 5:18 Error: An interface declaring no members is equivalent to its supertype. @typescript-eslint/no-empty-object-type
[18:13:57.223]
[18:13:57.223] ./src/contexts/AuthContext.tsx
[18:13:57.223] 121:6 Warning: React Hook useCallback has a missing dependency: 'createProfile'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[18:13:57.223]
[18:13:57.224] ./src/hooks/useCourseData.ts
[18:13:57.229] 83:6 Warning: React Hook useEffect has a missing dependency: 'organizeLessonsIntoSections'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[18:13:57.229] 89:30 Warning: 'index' is defined but never used. @typescript-eslint/no-unused-vars
[18:13:57.229]
[18:13:57.229] ./src/lib/supabase/server.ts
[18:13:57.229] 37:9 Warning: 'cookieString' is assigned a value but never used. @typescript-eslint/no-unused-vars
[18:13:57.229]
[18:13:57.230] info - Need to disable some ESLint rules? Learn more here: https://nextjs.org/docs/app/api-reference/config/eslint#disabling-rules
[18:13:57.242] Error: Command "npm run build" exited with 1
