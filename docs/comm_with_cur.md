[14:53:55.540] Running build in Washington, D.C., USA (East) – iad1
[14:53:55.540] Build machine configuration: 2 cores, 8 GB
[14:53:55.555] Cloning github.com/viditforsv/shriarya_lms_next (Branch: dev, Commit: 04e0545)
[14:53:56.592] Cloning completed: 1.037s
[14:53:59.370] Restored build cache from previous deployment (86Pg4KgE3zMdeYLXwmVDZSUK3941)
[14:53:59.909] Running "vercel build"
[14:54:00.449] Vercel CLI 47.0.4
[14:54:00.769] Installing dependencies...
[14:54:09.703]
[14:54:09.704] added 2 packages, and changed 18 packages in 9s
[14:54:09.704]
[14:54:09.705] 145 packages are looking for funding
[14:54:09.705] run `npm fund` for details
[14:54:09.740] Detected Next.js version: 15.5.2
[14:54:09.744] Running "npm run build"
[14:54:09.859]
[14:54:09.859] > shriarya_lms_next@0.1.0 build
[14:54:09.860] > next build
[14:54:09.860]
[14:54:10.915] ▲ Next.js 15.5.2
[14:54:10.917]
[14:54:11.007] Creating an optimized production build ...
[14:54:29.333] <w> [webpack.cache.PackFileCacheStrategy] Serializing big strings (108kiB) impacts deserialization performance (consider using Buffer instead and decode when needed)
[14:54:29.544] ⚠ Compiled with warnings in 2.1s
[14:54:29.544]
[14:54:29.545] ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
[14:54:29.545] A Node.js API is used (process.versions at line: 34) which is not supported in the Edge Runtime.
[14:54:29.545] Learn more: https://nextjs.org/docs/api-reference/edge-runtime
[14:54:29.545]
[14:54:29.545] Import trace for requested module:
[14:54:29.546] ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
[14:54:29.546] ./node_modules/@supabase/realtime-js/dist/module/index.js
[14:54:29.546] ./node_modules/@supabase/supabase-js/dist/module/index.js
[14:54:29.546] ./node_modules/@supabase/ssr/dist/module/createBrowserClient.js
[14:54:29.546] ./node_modules/@supabase/ssr/dist/module/index.js
[14:54:29.546]
[14:54:29.546] ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
[14:54:29.546] A Node.js API is used (process.versions at line: 35) which is not supported in the Edge Runtime.
[14:54:29.546] Learn more: https://nextjs.org/docs/api-reference/edge-runtime
[14:54:29.546]
[14:54:29.546] Import trace for requested module:
[14:54:29.546] ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
[14:54:29.546] ./node_modules/@supabase/realtime-js/dist/module/index.js
[14:54:29.546] ./node_modules/@supabase/supabase-js/dist/module/index.js
[14:54:29.546] ./node_modules/@supabase/ssr/dist/module/createBrowserClient.js
[14:54:29.546] ./node_modules/@supabase/ssr/dist/module/index.js
[14:54:29.546]
[14:54:29.546] ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
[14:54:29.547] A Node.js API is used (process.versions at line: 36) which is not supported in the Edge Runtime.
[14:54:29.547] Learn more: https://nextjs.org/docs/api-reference/edge-runtime
[14:54:29.547]
[14:54:29.547] Import trace for requested module:
[14:54:29.547] ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
[14:54:29.547] ./node_modules/@supabase/realtime-js/dist/module/index.js
[14:54:29.547] ./node_modules/@supabase/supabase-js/dist/module/index.js
[14:54:29.547] ./node_modules/@supabase/ssr/dist/module/createBrowserClient.js
[14:54:29.547] ./node_modules/@supabase/ssr/dist/module/index.js
[14:54:29.547]
[14:54:29.547] ./node_modules/@supabase/supabase-js/dist/module/index.js
[14:54:29.547] A Node.js API is used (process.version at line: 24) which is not supported in the Edge Runtime.
[14:54:29.547] Learn more: https://nextjs.org/docs/api-reference/edge-runtime
[14:54:29.547]
[14:54:29.547] Import trace for requested module:
[14:54:29.547] ./node_modules/@supabase/supabase-js/dist/module/index.js
[14:54:29.547] ./node_modules/@supabase/ssr/dist/module/createBrowserClient.js
[14:54:29.547] ./node_modules/@supabase/ssr/dist/module/index.js
[14:54:29.548]
[14:54:39.788] ✓ Compiled successfully in 25.9s
[14:54:39.791] Linting and checking validity of types ...
[14:54:50.538]
[14:54:50.539] Failed to compile.
[14:54:50.539]
[14:54:50.539] ./src/app/admin/site-administration/page.tsx
[14:54:50.541] 18:3 Warning: 'Globe' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.541] 20:3 Warning: 'Bell' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.542] 25:3 Warning: 'Upload' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.546] 26:3 Warning: 'Trash2' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.546] 28:3 Warning: 'Eye' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.546] 29:3 Warning: 'Edit' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.547]
[14:54:50.548] ./src/app/api/courses/route.ts
[14:54:50.548] 4:28 Warning: 'request' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.548]
[14:54:50.548] ./src/app/api/courses-v2/route.ts
[14:54:50.548] 72:19 Warning: 'tableInfo' is assigned a value but never used. @typescript-eslint/no-unused-vars
[14:54:50.549]
[14:54:50.549] ./src/app/api/lesson-sections/route.ts
[14:54:50.549] 174:23 Error: Unexpected any. Specify a different type. @typescript-eslint/no-explicit-any
[14:54:50.549] 267:50 Error: Unexpected any. Specify a different type. @typescript-eslint/no-explicit-any
[14:54:50.549]
[14:54:50.549] ./src/app/api/test-auth/route.ts
[14:54:50.550] 4:27 Warning: 'request' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.550]
[14:54:50.550] ./src/app/components-demo/page.tsx
[14:54:50.550] 2377:11 Error: Do not use an `<a>` element to navigate to `/courses/`. Use `<Link />` from `next/link` instead. See: https://nextjs.org/docs/messages/no-html-link-for-pages @next/next/no-html-link-for-pages
[14:54:50.550] 2377:11 Error: Do not use an `<a>` element to navigate to `/courses/`. Use `<Link />` from `next/link` instead. See: https://nextjs.org/docs/messages/no-html-link-for-pages @next/next/no-html-link-for-pages
[14:54:50.550]
[14:54:50.552] ./src/app/courses/[slug]/lesson/[lessonSlug]/page.tsx
[14:54:50.552] 6:29 Warning: 'CardDescription' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.552] 11:3 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.553] 13:3 Warning: 'FileText' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.553] 17:3 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.554] 19:3 Warning: 'Unlock' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.554] 220:85 Error: Unexpected any. Specify a different type. @typescript-eslint/no-explicit-any
[14:54:50.554] 260:37 Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`. react/no-unescaped-entities
[14:54:50.554]
[14:54:50.554] ./src/app/courses/[slug]/page.tsx
[14:54:50.554] 12:3 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.555] 13:3 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.555] 14:3 Warning: 'Calendar' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.555] 15:3 Warning: 'ArrowRight' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.555] 17:3 Warning: 'FileText' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.555] 19:3 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.555] 20:3 Warning: 'ChevronDown' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.555] 23:3 Warning: 'Unlock' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.555] 56:10 Warning: 'expandedSections' is assigned a value but never used. @typescript-eslint/no-unused-vars
[14:54:50.555] 129:9 Warning: 'toggleSection' is assigned a value but never used. @typescript-eslint/no-unused-vars
[14:54:50.556] 256:68 Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`. react/no-unescaped-entities
[14:54:50.556]
[14:54:50.556] ./src/app/courses/cbse/mathematics/class-10/lesson/[slug]/page.tsx
[14:54:50.556] 367:59 Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`. react/no-unescaped-entities
[14:54:50.556] 462:45 Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`. react/no-unescaped-entities
[14:54:50.556]
[14:54:50.556] ./src/app/courses/cbse/mathematics/class-10/lesson/real-numbers-intro/page.tsx
[14:54:50.557] 5:37 Warning: 'Download' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.557] 5:67 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.557] 33:10 Warning: 'pdfViewerReady' is assigned a value but never used. @typescript-eslint/no-unused-vars
[14:54:50.561]
[14:54:50.563] ./src/app/courses/cbse/mathematics/class-10/page.tsx
[14:54:50.563] 35:5 Warning: 'isFree' is assigned a value but never used. @typescript-eslint/no-unused-vars
[14:54:50.563] 36:5 Warning: 'canPreview' is assigned a value but never used. @typescript-eslint/no-unused-vars
[14:54:50.563] 109:9 Warning: 'handleLessonClick' is assigned a value but never used. @typescript-eslint/no-unused-vars
[14:54:50.563] 123:9 Warning: 'handlePreviewClick' is assigned a value but never used. @typescript-eslint/no-unused-vars
[14:54:50.564] 245:23 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[14:54:50.564] 450:29 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[14:54:50.564]
[14:54:50.564] ./src/app/courses/ibdp/mathematics/analysis-approaches-hl/page.tsx
[14:54:50.564] 5:10 Warning: 'Button' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.564] 7:76 Warning: 'Users2' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.564] 7:84 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.564]
[14:54:50.564] ./src/app/dashboard/courses/[id]/edit/page.tsx
[14:54:50.564] 5:47 Warning: 'Play' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.565] 5:53 Warning: 'CheckCircle' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.565] 18:11 Warning: 'CourseBuilderProps' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.565] 38:6 Warning: React Hook useEffect has a missing dependency: 'loadCourse'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[14:54:50.565] 402:39 Warning: 'index' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.565]
[14:54:50.566] ./src/app/dashboard/courses/new/page.tsx
[14:54:50.566] 7:29 Warning: 'CardHeader' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.566] 7:41 Warning: 'CardTitle' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.566] 131:18 Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`. react/no-unescaped-entities
[14:54:50.566]
[14:54:50.567] ./src/app/dashboard/courses/page.tsx
[14:54:50.567] 33:6 Warning: React Hook useEffect has a missing dependency: 'fetchCourses'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[14:54:50.567]
[14:54:50.567] ./src/app/dashboard/page.tsx
[14:54:50.567] 8:20 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.568]
[14:54:50.568] ./src/app/debug-auth/page.tsx
[14:54:50.568] 11:48 Error: Unexpected any. Specify a different type. @typescript-eslint/no-explicit-any
[14:54:50.568]
[14:54:50.568] ./src/app/page.tsx
[14:54:50.569] 3:10 Warning: 'useState' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.569] 3:20 Warning: 'useEffect' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.569]
[14:54:50.569] ./src/app/privacy/page.tsx
[14:54:50.570] 5:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.570]
[14:54:50.570] ./src/app/templates/course-templates/course-page/page.tsx
[14:54:50.570] 4:21 Warning: 'Play' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.570] 69:21 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[14:54:50.571] 343:23 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[14:54:50.571] 397:23 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[14:54:50.572]
[14:54:50.572] ./src/app/templates/dashboard-templates/admin-panel/page.tsx
[14:54:50.573] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.573] 5:29 Warning: 'CardDescription' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.573] 5:46 Warning: 'CardHeader' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.573] 5:58 Warning: 'CardTitle' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.573]
[14:54:50.574] ./src/app/templates/dashboard-templates/analytics/page.tsx
[14:54:50.574] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.574] 6:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.574] 7:33 Warning: 'TrendingDown' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.574] 7:64 Warning: 'DollarSign' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.575]
[14:54:50.575] ./src/app/templates/dashboard-templates/instructor-dashboard/page.tsx
[14:54:50.578] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.578] 5:29 Warning: 'CardDescription' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.578] 5:46 Warning: 'CardHeader' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.578] 5:58 Warning: 'CardTitle' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.578] 7:100 Warning: 'Download' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.579]
[14:54:50.582] ./src/app/templates/dashboard-templates/student-dashboard/page.tsx
[14:54:50.582] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.582] 5:29 Warning: 'CardDescription' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.582] 5:46 Warning: 'CardHeader' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.582] 5:58 Warning: 'CardTitle' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.582]
[14:54:50.582] ./src/app/templates/page-templates/about/page.tsx
[14:54:50.582] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.582]
[14:54:50.582] ./src/app/templates/page-templates/contact/page.tsx
[14:54:50.582] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.582]
[14:54:50.583] ./src/app/templates/page-templates/courses-listing/page.tsx
[14:54:50.583] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.583]
[14:54:50.583] ./src/app/templates/page-templates/pricing/page.tsx
[14:54:50.583] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.583] 7:28 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.584]
[14:54:50.584] ./src/app/templates/page-templates/privacy/page.tsx
[14:54:50.584] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.584] 6:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.584]
[14:54:50.585] ./src/app/templates/page-templates/terms/page.tsx
[14:54:50.585] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.585] 6:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.585]
[14:54:50.585] ./src/app/terms/page.tsx
[14:54:50.586] 5:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.586]
[14:54:50.586] ./src/app/test-upload/page.tsx
[14:54:50.586] 10:32 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.586] 14:62 Error: Unexpected any. Specify a different type. @typescript-eslint/no-explicit-any
[14:54:50.586] 24:50 Error: Unexpected any. Specify a different type. @typescript-eslint/no-explicit-any
[14:54:50.587] 26:43 Error: Unexpected any. Specify a different type. @typescript-eslint/no-explicit-any
[14:54:50.594] 164:6 Warning: React Hook useEffect has a missing dependency: 'runConnectionTests'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[14:54:50.594] 246:75 Error: Unexpected any. Specify a different type. @typescript-eslint/no-explicit-any
[14:54:50.594]
[14:54:50.594] ./src/components/content/section-editor.tsx
[14:54:50.594] 4:10 Warning: 'Plus' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.595] 4:30 Warning: 'Eye' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.595] 15:12 Error: Unexpected any. Specify a different type. @typescript-eslint/no-explicit-any
[14:54:50.595] 35:6 Warning: React Hook useEffect has a missing dependency: 'fetchSections'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[14:54:50.595] 102:60 Error: Unexpected any. Specify a different type. @typescript-eslint/no-explicit-any
[14:54:50.595] 364:21 Error: Unexpected any. Specify a different type. @typescript-eslint/no-explicit-any
[14:54:50.596]
[14:54:50.596] ./src/components/ui/file-upload.tsx
[14:54:50.596] 12:32 Error: Unexpected any. Specify a different type. @typescript-eslint/no-explicit-any
[14:54:50.596] 139:16 Warning: Image elements must have an alt prop, either with meaningful text, or an empty string for decorative images. jsx-a11y/alt-text
[14:54:50.596]
[14:54:50.597] ./src/components/ui/header.tsx
[14:54:50.597] 6:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.597]
[14:54:50.597] ./src/components/ui/textarea.tsx
[14:54:50.597] 5:18 Error: An interface declaring no members is equivalent to its supertype. @typescript-eslint/no-empty-object-type
[14:54:50.597]
[14:54:50.598] ./src/contexts/AuthContext.tsx
[14:54:50.598] 121:6 Warning: React Hook useCallback has a missing dependency: 'createProfile'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[14:54:50.598]
[14:54:50.598] ./src/hooks/useCourseData.ts
[14:54:50.598] 83:6 Warning: React Hook useEffect has a missing dependency: 'organizeLessonsIntoSections'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[14:54:50.598] 89:30 Warning: 'index' is defined but never used. @typescript-eslint/no-unused-vars
[14:54:50.599]
[14:54:50.599] ./src/lib/supabase/server.ts
[14:54:50.599] 37:9 Warning: 'cookieString' is assigned a value but never used. @typescript-eslint/no-unused-vars
[14:54:50.599]
[14:54:50.599] info - Need to disable some ESLint rules? Learn more here: https://nextjs.org/docs/app/api-reference/config/eslint#disabling-rules
[14:54:50.615] Error: Command "npm run build" exited with 1
