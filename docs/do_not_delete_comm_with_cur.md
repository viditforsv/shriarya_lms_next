[16:19:54.655] Running build in Washington, D.C., USA (East) – iad1
[16:19:54.656] Build machine configuration: 2 cores, 8 GB
[16:19:54.686] Cloning github.com/viditforsv/shriarya*lms_next (Branch: dev, Commit: 49ba89c)
[16:19:55.245] Cloning completed: 558.000ms
[16:19:57.853] Restored build cache from previous deployment (GEVDRazvaEgyNDFwTYvCsLhgwBSw)
[16:19:58.381] Running "vercel build"
[16:19:58.744] Vercel CLI 47.0.5
[16:19:59.058] Installing dependencies...
[16:20:00.337]
[16:20:00.338] up to date in 1s
[16:20:00.338]
[16:20:00.338] 146 packages are looking for funding
[16:20:00.339] run `npm fund` for details
[16:20:00.368] Detected Next.js version: 15.5.2
[16:20:00.371] Running "npm run build"
[16:20:00.508]
[16:20:00.509] > shriarya_lms_next@0.1.0 build
[16:20:00.509] > next build
[16:20:00.509]
[16:20:01.559] ▲ Next.js 15.5.2
[16:20:01.560]
[16:20:01.662] Creating an optimized production build ...
[16:20:21.315] ✓ Compiled successfully in 16.9s
[16:20:21.322] Linting and checking validity of types ...
[16:20:34.427]
[16:20:34.429] Failed to compile.
[16:20:34.429]
[16:20:34.430] ./src/app/api/courses/builder/route.ts
[16:20:34.430] 3:10 Warning: 'CourseTemplate' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.430] 45:19 Warning: 'profile' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:20:34.430] 45:35 Warning: 'profileError' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:20:34.431]
[16:20:34.431] ./src/app/api/courses/route.ts
[16:20:34.438] 26:7 Warning: 'LessonSchema' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:20:34.438] 37:7 Warning: 'ResourceSchema' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:20:34.438]
[16:20:34.439] ./src/app/api/courses-v2/route.ts
[16:20:34.439] 8:13 Warning: 'searchParams' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:20:34.439]
[16:20:34.439] ./src/app/api/lessons-v2/route.ts
[16:20:34.439] 11:11 Warning: 'published' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:20:34.439]
[16:20:34.439] ./src/app/auth/reset-password/page.tsx
[16:20:34.439] 23:9 Warning: 'searchParams' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:20:34.440]
[16:20:34.440] ./src/app/components-demo/content/section-editor.tsx
[16:20:34.440] 43:6 Warning: React Hook useEffect has a missing dependency: 'fetchSections'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[16:20:34.440]
[16:20:34.440] ./src/app/components-demo/student-file-access.tsx
[16:20:34.440] 35:9 Warning: The 'mockFiles' array makes the dependencies of useEffect Hook (at line 71) change on every render. Move it inside the useEffect callback. Alternatively, wrap the initialization of 'mockFiles' in its own useMemo() Hook. react-hooks/exhaustive-deps
[16:20:34.441]
[16:20:34.441] ./src/app/components-demo/ui/collapsible-sidebar.tsx
[16:20:34.441] 24:3 Warning: 'Section' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.441] 25:3 Warning: 'Chapter' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.441] 37:20 Warning: 'setSyllabus' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:20:34.441]
[16:20:34.442] ./src/app/components-demo/ui/file-upload.tsx
[16:20:34.442] 139:16 Warning: Image elements must have an alt prop, either with meaningful text, or an empty string for decorative images. jsx-a11y/alt-text
[16:20:34.442]
[16:20:34.442] ./src/app/components-demo/ui/pdf-viewer.tsx
[16:20:34.442] 226:6 Warning: React Hook useEffect has missing dependencies: 'pdfDoc' and 'useIframe'. Either include them or remove the dependency array. react-hooks/exhaustive-deps
[16:20:34.442]
[16:20:34.442] ./src/app/course-builder/page.tsx
[16:20:34.443] 139:18 Warning: '*' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.443] 156:18 Warning: '_' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.443] 185:18 Warning: '_' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.443] 210:18 Warning: '_' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.443] 232:18 Warning: '_' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.443]
[16:20:34.444] ./src/app/dashboard/courses/[id]/edit/page.tsx
[16:20:34.444] 5:47 Warning: 'Play' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.444] 5:53 Warning: 'CheckCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.444] 18:11 Warning: 'CourseBuilderProps' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.444] 318:16 Error: 'Layers' is not defined. react/jsx-no-undef
[16:20:34.444] 407:39 Warning: 'index' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.449]
[16:20:34.449] ./src/app/dashboard/courses/builder/page.tsx
[16:20:34.449] 26:3 Warning: 'CourseStructure' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.449] 31:3 Warning: 'getTemplatesByCurriculum' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.450] 32:3 Warning: 'createCourseFromTemplate' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.450] 33:3 Warning: 'generateCourseSlug' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.450] 38:10 Warning: 'selectedTemplate' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:20:34.451] 41:10 Warning: 'isEditing' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:20:34.451]
[16:20:34.451] ./src/app/dashboard/courses/new/page.tsx
[16:20:34.451] 7:29 Warning: 'CardHeader' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.451] 7:41 Warning: 'CardTitle' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.451]
[16:20:34.452] ./src/app/dashboard/courses/template-converter/page.tsx
[16:20:34.452] 20:3 Warning: 'PlayCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.452] 105:15 Warning: 'result' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:20:34.452]
[16:20:34.452] ./src/app/dashboard/page.tsx
[16:20:34.452] 8:20 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.453]
[16:20:34.453] ./src/app/privacy/page.tsx
[16:20:34.453] 5:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.453]
[16:20:34.458] ./src/app/templates/.eslintrc.js
[16:20:34.458] 1:1 Warning: Unused eslint-disable directive (no problems were reported from '@typescript-eslint/no-unused-vars').
[16:20:34.458] 2:1 Warning: Unused eslint-disable directive (no problems were reported from 'react-hooks/exhaustive-deps').
[16:20:34.459] 3:1 Warning: Unused eslint-disable directive (no problems were reported from '@next/next/no-img-element').
[16:20:34.459] 4:1 Warning: Unused eslint-disable directive (no problems were reported from 'jsx-a11y/alt-text').
[16:20:34.459]
[16:20:34.459] ./src/app/templates/course-templates/assignments/page.tsx
[16:20:34.459] 4:8 Warning: 'Link' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.459] 8:10 Warning: 'Progress' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.459] 11:3 Warning: 'ArrowLeft' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.459] 18:3 Warning: 'Download' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.459] 19:3 Warning: 'Eye' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.460] 20:3 Warning: 'Edit' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.460] 26:10 Warning: 'CompletionDot' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.460]
[16:20:34.460] ./src/app/templates/course-templates/certificate/page.tsx
[16:20:34.460] 7:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.460] 24:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.460]
[16:20:34.461] ./src/app/templates/course-templates/course-page/page.tsx
[16:20:34.461] 3:26 Warning: 'useEffect' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.461] 4:8 Warning: 'Link' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.461] 5:44 Warning: 'Download' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.461] 5:54 Warning: 'Smartphone' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.461] 5:66 Warning: 'Infinity' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.461] 5:76 Warning: 'Award' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.462] 5:122 Warning: 'Bookmark' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.462] 5:132 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.462] 5:157 Warning: 'Eye' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.462] 5:162 Warning: 'EyeOff' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.462] 9:26 Warning: 'TemplateSection' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.462] 9:43 Warning: 'TemplateCard' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.463] 34:17 Warning: 'profile' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:20:34.463] 375:19 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[16:20:34.463] 561:21 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[16:20:34.463] 615:21 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[16:20:34.463]
[16:20:34.463] ./src/app/templates/course-templates/lesson/page.tsx
[16:20:34.463] 18:3 Warning: 'Lock' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.463] 26:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.463] 30:10 Warning: 'completedLessons' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:20:34.463] 30:28 Warning: 'setCompletedLessons' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:20:34.463]
[16:20:34.463] ./src/app/templates/course-templates/page.tsx
[16:20:34.463] 2:10 Warning: 'memo' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.463]
[16:20:34.463] ./src/app/templates/course-templates/performance-analytics/page.tsx
[16:20:34.463] 9:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.463] 19:3 Warning: 'Calendar' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.463] 22:3 Warning: 'RefreshCw' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.463] 28:3 Warning: 'PieChart' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.463] 29:3 Warning: 'Activity' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.463] 35:10 Warning: 'selectedCourse' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:20:34.463] 35:26 Warning: 'setSelectedCourse' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:20:34.463]
[16:20:34.463] ./src/app/templates/course-templates/question-bank/page.tsx
[16:20:34.464] 9:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.464] 12:3 Warning: 'Filter' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.464] 22:3 Warning: 'XCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.464] 23:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.464] 25:3 Warning: 'Calculator' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.464] 26:3 Warning: 'Lightbulb' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.464] 27:3 Warning: 'Brain' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.464] 103:9 Warning: 'questionTypes' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:20:34.464]
[16:20:34.464] ./src/app/templates/course-templates/quiz/page.tsx
[16:20:34.464] 18:3 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.464] 19:3 Warning: 'FileText' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.464] 22:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.464]
[16:20:34.464] ./src/app/templates/dashboard-templates/admin-panel/page.tsx
[16:20:34.464] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.464] 5:29 Warning: 'CardDescription' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.464] 5:46 Warning: 'CardHeader' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.464] 5:58 Warning: 'CardTitle' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.465]
[16:20:34.465] ./src/app/templates/dashboard-templates/analytics/page.tsx
[16:20:34.465] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.473] 6:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.473] 7:33 Warning: 'TrendingDown' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.473] 7:64 Warning: 'DollarSign' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.473]
[16:20:34.474] ./src/app/templates/dashboard-templates/institution-dashboard/page.tsx
[16:20:34.474] 9:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.474] 23:3 Warning: 'Upload' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.474] 26:3 Warning: 'Phone' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.474] 28:3 Warning: 'Globe' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.474] 31:3 Warning: 'PieChart' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.474] 33:3 Warning: 'Target' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.475] 34:3 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.475] 35:3 Warning: 'CheckCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.475] 36:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.475] 37:3 Warning: 'UserPlus' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.475] 38:3 Warning: 'School' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.475] 39:3 Warning: 'BookMarked' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.475]
[16:20:34.476] ./src/app/templates/dashboard-templates/instructor-dashboard/page.tsx
[16:20:34.476] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.476] 5:29 Warning: 'CardDescription' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.476] 5:46 Warning: 'CardHeader' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.476] 5:58 Warning: 'CardTitle' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.476] 7:100 Warning: 'Download' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.476]
[16:20:34.478] ./src/app/templates/dashboard-templates/page.tsx
[16:20:34.478] 2:10 Warning: 'memo' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.480]
[16:20:34.480] ./src/app/templates/dashboard-templates/student-dashboard/page.tsx
[16:20:34.481] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.481] 5:29 Warning: 'CardDescription' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.481] 5:46 Warning: 'CardHeader' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.481] 5:58 Warning: 'CardTitle' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.481]
[16:20:34.481] ./src/app/templates/dashboard-templates/teacher-signup/page.tsx
[16:20:34.481] 9:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.481] 14:3 Warning: 'Phone' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.481] 15:3 Warning: 'MapPin' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.481] 17:3 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.482] 25:3 Warning: 'Trash2' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.482] 30:3 Warning: 'Users' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.482] 36:3 Warning: 'Filter' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.482] 41:10 Warning: 'formData' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:20:34.482] 41:20 Warning: 'setFormData' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:20:34.482] 133:9 Warning: 'getStatusIcon' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:20:34.482]
[16:20:34.483] ./src/app/templates/page-templates/404/page.tsx
[16:20:34.487] 7:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.488]
[16:20:34.488] ./src/app/templates/page-templates/about/page.tsx
[16:20:34.488] 4:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.488]
[16:20:34.488] ./src/app/templates/page-templates/analytics/page.tsx
[16:20:34.488] 6:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.488] 20:3 Warning: 'Filter' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.488] 21:3 Warning: 'Calendar' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.488] 23:3 Warning: 'Zap' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.488] 25:3 Warning: 'PieChart' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.488] 26:3 Warning: 'LineChart' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.489] 31:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.489] 32:3 Warning: 'CheckCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.489] 34:3 Warning: 'GraduationCap' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.489] 35:3 Warning: 'MessageCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.489] 36:3 Warning: 'Heart' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.489] 37:3 Warning: 'ThumbsUp' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.489] 42:10 Warning: 'selectedMetric' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:20:34.489] 42:26 Warning: 'setSelectedMetric' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:20:34.489]
[16:20:34.489] ./src/app/templates/page-templates/checkout/page.tsx
[16:20:34.489] 7:10 Warning: 'Tabs' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.489] 7:16 Warning: 'TabsContent' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.489] 7:29 Warning: 'TabsList' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.489] 7:39 Warning: 'TabsTrigger' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.489] 14:3 Warning: 'XCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.489] 15:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.489] 16:3 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.489] 19:3 Warning: 'Phone' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.489] 20:3 Warning: 'MapPin' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.489] 21:3 Warning: 'Calendar' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.489] 25:3 Warning: 'Award' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.489] 27:3 Warning: 'Percent' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.489] 29:3 Warning: 'RefreshCw' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.489] 30:3 Warning: 'Eye' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.489] 31:3 Warning: 'Edit' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.489] 32:3 Warning: 'Trash2' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.489] 33:3 Warning: 'Plus' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.489] 34:3 Warning: 'Minus' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.489]
[16:20:34.489] ./src/app/templates/page-templates/contact/page.tsx
[16:20:34.489] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.489]
[16:20:34.489] ./src/app/templates/page-templates/courses-listing/page.tsx
[16:20:34.489] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.489]
[16:20:34.489] ./src/app/templates/page-templates/faq/page.tsx
[16:20:34.489] 23:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.489]
[16:20:34.489] ./src/app/templates/page-templates/faq-support/page.tsx
[16:20:34.489] 16:3 Warning: 'CheckCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.489] 17:3 Warning: 'XCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.489] 18:3 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.489] 19:3 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.489] 21:3 Warning: 'ThumbsDown' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.489] 23:3 Warning: 'Mail' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.489] 24:3 Warning: 'Phone' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.489] 26:3 Warning: 'Filter' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.490] 27:3 Warning: 'SortAsc' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.490] 28:3 Warning: 'SortDesc' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.490] 29:3 Warning: 'Download' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.490] 30:3 Warning: 'Upload' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.490] 32:3 Warning: 'Zap' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.490] 33:3 Warning: 'Users' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.490] 34:3 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.490] 35:3 Warning: 'Award' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.490] 37:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.490] 38:3 Warning: 'Info' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.490] 39:3 Warning: 'ExternalLink' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.490] 41:3 Warning: 'Share2' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.490] 42:3 Warning: 'Heart' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.490] 43:3 Warning: 'Flag' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.490] 44:3 Warning: 'Lock' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.490] 45:3 Warning: 'Unlock' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.490] 533:53 Warning: 'index' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.490]
[16:20:34.490] ./src/app/templates/page-templates/helpdesk/page.tsx
[16:20:34.490] 17:3 Warning: 'CheckCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.490] 18:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.490] 19:3 Warning: 'FileText' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.490] 21:3 Warning: 'Filter' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.490] 22:3 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.490] 24:3 Warning: 'Archive' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.490]
[16:20:34.490] ./src/app/templates/page-templates/page.tsx
[16:20:34.490] 2:10 Warning: 'memo' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.491]
[16:20:34.491] ./src/app/templates/page-templates/password-reset/page.tsx
[16:20:34.491] 2:10 Warning: 'memo' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.491]
[16:20:34.491] ./src/app/templates/page-templates/pricing/page.tsx
[16:20:34.491] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.491] 7:28 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.492]
[16:20:34.492] ./src/app/templates/page-templates/privacy/page.tsx
[16:20:34.492] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.492] 6:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.492]
[16:20:34.492] ./src/app/templates/page-templates/refund/page.tsx
[16:20:34.492] 10:3 Warning: 'ArrowLeft' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.493] 17:3 Warning: 'Mail' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.493] 18:3 Warning: 'Phone' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.493] 19:3 Warning: 'Calendar' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.493] 25:3 Warning: 'Edit' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.493] 26:3 Warning: 'Send' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.493] 27:3 Warning: 'User' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.493] 28:3 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.497] 32:3 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.497] 33:3 Warning: 'ThumbsUp' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.497] 34:3 Warning: 'ThumbsDown' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.497] 38:10 Warning: 'refundReason' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:20:34.497] 38:24 Warning: 'setRefundReason' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:20:34.497] 39:10 Warning: 'refundAmount' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:20:34.497] 39:24 Warning: 'setRefundAmount' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:20:34.497]
[16:20:34.497] ./src/app/templates/page-templates/subscription-management/page.tsx
[16:20:34.497] 11:3 Warning: 'Calendar' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.497] 14:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.497] 17:3 Warning: 'Zap' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.497] 18:3 Warning: 'Users' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.497] 19:3 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.497] 22:3 Warning: 'Bell' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.497] 23:3 Warning: 'Shield' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.497] 24:3 Warning: 'Lock' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.497] 25:3 Warning: 'ArrowRight' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.497] 26:3 Warning: 'ArrowLeft' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.497] 28:3 Warning: 'Minus' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.497] 31:3 Warning: 'Eye' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.497] 32:3 Warning: 'RefreshCw' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.497] 34:3 Warning: 'Award' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.497] 35:3 Warning: 'Gift' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.497] 36:3 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.497]
[16:20:34.497] ./src/app/templates/page-templates/team/page.tsx
[16:20:34.498] 12:3 Warning: 'Award' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.498] 13:3 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.498] 17:3 Warning: 'Twitter' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.498] 18:3 Warning: 'Globe' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.498] 19:3 Warning: 'Calendar' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.498] 20:3 Warning: 'MapPin' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.498] 21:3 Warning: 'Phone' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.498] 23:3 Warning: 'Plus' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.498] 24:3 Warning: 'Edit' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.498] 26:3 Warning: 'Trash2' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.498] 27:3 Warning: 'Filter' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.498] 29:3 Warning: 'Heart' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.498] 30:3 Warning: 'Share2' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.498] 31:3 Warning: 'Download' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.498] 34:3 Warning: 'Zap' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.498] 37:3 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.498]
[16:20:34.498] ./src/app/templates/page-templates/terms/page.tsx
[16:20:34.498] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.498] 6:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.498]
[16:20:34.498] ./src/app/templates/page-templates/testimonials/page.tsx
[16:20:34.498] 9:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.498] 13:3 Warning: 'Users' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.498] 14:3 Warning: 'Award' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.498] 16:3 Warning: 'ThumbsDown' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.498] 17:3 Warning: 'Filter' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.498] 19:3 Warning: 'Plus' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.498] 24:3 Warning: 'XCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.498] 25:3 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.499] 26:3 Warning: 'MessageCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.499] 29:3 Warning: 'GraduationCap' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.499]
[16:20:34.499] ./src/app/templates/page-templates/user-profile/page.tsx
[16:20:34.499] 11:3 Warning: 'Mail' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.499] 12:3 Warning: 'Phone' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.499] 13:3 Warning: 'MapPin' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.499] 17:3 Warning: 'Camera' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.500] 19:3 Warning: 'Bell' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.500] 20:3 Warning: 'Shield' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.501] 21:3 Warning: 'Lock' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.501] 24:3 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.501] 30:3 Warning: 'Upload' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.501] 33:3 Warning: 'Minus' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.501] 35:3 Warning: 'XCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.501] 36:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.501] 37:3 Warning: 'Heart' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.502] 39:3 Warning: 'MessageCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.502] 40:3 Warning: 'Linkedin' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.502] 41:3 Warning: 'Twitter' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.502] 42:3 Warning: 'Globe' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.502] 43:3 Warning: 'GraduationCap' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.502] 45:3 Warning: 'Zap' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.502]
[16:20:34.502] ./src/app/templates/page.tsx
[16:20:34.502] 2:10 Warning: 'memo' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.502]
[16:20:34.502] ./src/app/templates/scale-up-templates/page.tsx
[16:20:34.502] 2:10 Warning: 'memo' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.502]
[16:20:34.502] ./src/app/terms/page.tsx
[16:20:34.502] 5:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.503]
[16:20:34.503] ./src/contexts/AuthContext.tsx
[16:20:34.503] 64:6 Warning: React Hook useEffect has a missing dependency: 'profile'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[16:20:34.503] 67:9 Warning: The 'createProfile' function makes the dependencies of useCallback Hook (at line 273) change on every render. Move it inside the useCallback callback. Alternatively, wrap the definition of 'createProfile' in its own useCallback() Hook. react-hooks/exhaustive-deps
[16:20:34.503] 126:9 Warning: The 'createFallbackProfile' function makes the dependencies of useCallback Hook (at line 273) change on every render. Move it inside the useCallback callback. Alternatively, wrap the definition of 'createFallbackProfile' in its own useCallback() Hook. react-hooks/exhaustive-deps
[16:20:34.503] 277:9 Warning: The 'hasPermission' function makes the dependencies of useMemo Hook (at line 568) change on every render. To fix this, wrap the definition of 'hasPermission' in its own useCallback() Hook. react-hooks/exhaustive-deps
[16:20:34.503] 301:9 Warning: The 'updateUserRole' function makes the dependencies of useMemo Hook (at line 568) change on every render. Move it inside the useMemo callback. Alternatively, wrap the definition of 'updateUserRole' in its own useCallback() Hook. react-hooks/exhaustive-deps
[16:20:34.503] 342:9 Warning: The 'refreshProfile' function makes the dependencies of useMemo Hook (at line 568) change on every render. To fix this, wrap the definition of 'refreshProfile' in its own useCallback() Hook. react-hooks/exhaustive-deps
[16:20:34.503] 455:9 Warning: The 'signIn' function makes the dependencies of useMemo Hook (at line 568) change on every render. Move it inside the useMemo callback. Alternatively, wrap the definition of 'signIn' in its own useCallback() Hook. react-hooks/exhaustive-deps
[16:20:34.503] 463:9 Warning: The 'signUp' function makes the dependencies of useMemo Hook (at line 568) change on every render. Move it inside the useMemo callback. Alternatively, wrap the definition of 'signUp' in its own useCallback() Hook. react-hooks/exhaustive-deps
[16:20:34.503] 477:9 Warning: The 'signOut' function makes the dependencies of useMemo Hook (at line 568) change on every render. Move it inside the useMemo callback. Alternatively, wrap the definition of 'signOut' in its own useCallback() Hook. react-hooks/exhaustive-deps
[16:20:34.503] 507:9 Warning: The 'signInWithGoogle' function makes the dependencies of useMemo Hook (at line 568) change on every render. Move it inside the useMemo callback. Alternatively, wrap the definition of 'signInWithGoogle' in its own useCallback() Hook. react-hooks/exhaustive-deps
[16:20:34.503] 540:9 Warning: The 'resetPassword' function makes the dependencies of useMemo Hook (at line 568) change on every render. Move it inside the useMemo callback. Alternatively, wrap the definition of 'resetPassword' in its own useCallback() Hook. react-hooks/exhaustive-deps
[16:20:34.503] 547:9 Warning: The 'updatePassword' function makes the dependencies of useMemo Hook (at line 568) change on every render. Move it inside the useMemo callback. Alternatively, wrap the definition of 'updatePassword' in its own useCallback() Hook. react-hooks/exhaustive-deps
[16:20:34.503]
[16:20:34.503] ./src/hooks/useCourseData.ts
[16:20:34.503] 83:6 Warning: React Hook useEffect has a missing dependency: 'organizeLessonsIntoSections'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[16:20:34.503] 89:30 Warning: 'index' is defined but never used. @typescript-eslint/no-unused-vars
[16:20:34.503]
[16:20:34.503] ./src/lib/supabase/server.ts
[16:20:34.503] 40:9 Warning: 'cookieString' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:20:34.503]
[16:20:34.503] info - Need to disable some ESLint rules? Learn more here: https://nextjs.org/docs/app/api-reference/config/eslint#disabling-rules
[16:20:34.513] Error: Command "npm run build" exited with 1
