[16:28:20.340] Running build in Washington, D.C., USA (East) – iad1
[16:28:20.347] Build machine configuration: 2 cores, 8 GB
[16:28:20.397] Cloning github.com/viditforsv/shriarya*lms_next (Branch: dev, Commit: ba7f189)
[16:28:21.513] Cloning completed: 1.115s
[16:28:23.596] Restored build cache from previous deployment (GEVDRazvaEgyNDFwTYvCsLhgwBSw)
[16:28:24.271] Running "vercel build"
[16:28:24.656] Vercel CLI 47.0.5
[16:28:24.994] Installing dependencies...
[16:28:26.342]
[16:28:26.343] up to date in 1s
[16:28:26.344]
[16:28:26.344] 146 packages are looking for funding
[16:28:26.344] run `npm fund` for details
[16:28:26.376] Detected Next.js version: 15.5.2
[16:28:26.381] Running "npm run build"
[16:28:26.488]
[16:28:26.489] > shriarya_lms_next@0.1.0 build
[16:28:26.489] > next build
[16:28:26.489]
[16:28:27.594] ▲ Next.js 15.5.2
[16:28:27.595]
[16:28:27.700] Creating an optimized production build ...
[16:28:47.838] ✓ Compiled successfully in 17.3s
[16:28:47.845] Linting and checking validity of types ...
[16:29:00.416]
[16:29:00.417] ./src/app/api/courses/builder/route.ts
[16:29:00.417] 3:10 Warning: 'CourseTemplate' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.418] 45:19 Warning: 'profile' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:29:00.418] 45:35 Warning: 'profileError' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:29:00.418]
[16:29:00.419] ./src/app/api/courses/route.ts
[16:29:00.419] 26:7 Warning: 'LessonSchema' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:29:00.419] 37:7 Warning: 'ResourceSchema' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:29:00.420]
[16:29:00.420] ./src/app/api/courses-v2/route.ts
[16:29:00.420] 8:13 Warning: 'searchParams' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:29:00.421]
[16:29:00.421] ./src/app/api/lessons-v2/route.ts
[16:29:00.421] 11:11 Warning: 'published' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:29:00.421]
[16:29:00.422] ./src/app/auth/reset-password/page.tsx
[16:29:00.422] 23:9 Warning: 'searchParams' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:29:00.422]
[16:29:00.423] ./src/app/components-demo/content/section-editor.tsx
[16:29:00.423] 43:6 Warning: React Hook useEffect has a missing dependency: 'fetchSections'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[16:29:00.423]
[16:29:00.424] ./src/app/components-demo/ui/collapsible-sidebar.tsx
[16:29:00.424] 24:3 Warning: 'Section' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.425] 25:3 Warning: 'Chapter' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.425] 37:20 Warning: 'setSyllabus' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:29:00.425]
[16:29:00.425] ./src/app/components-demo/ui/file-upload.tsx
[16:29:00.426] 139:16 Warning: Image elements must have an alt prop, either with meaningful text, or an empty string for decorative images. jsx-a11y/alt-text
[16:29:00.426]
[16:29:00.426] ./src/app/components-demo/ui/pdf-viewer.tsx
[16:29:00.427] 226:6 Warning: React Hook useEffect has missing dependencies: 'pdfDoc' and 'useIframe'. Either include them or remove the dependency array. react-hooks/exhaustive-deps
[16:29:00.427]
[16:29:00.427] ./src/app/course-builder/page.tsx
[16:29:00.427] 139:18 Warning: '*' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.428] 156:18 Warning: '_' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.428] 185:18 Warning: '_' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.429] 210:18 Warning: '_' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.429] 232:18 Warning: '_' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.430]
[16:29:00.430] ./src/app/dashboard/courses/[id]/edit/page.tsx
[16:29:00.431] 5:47 Warning: 'Play' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.432] 5:53 Warning: 'CheckCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.432] 18:11 Warning: 'CourseBuilderProps' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.432] 407:39 Warning: 'index' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.433]
[16:29:00.433] ./src/app/dashboard/courses/template-converter/page.tsx
[16:29:00.433] 104:15 Warning: 'result' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:29:00.434]
[16:29:00.434] ./src/app/templates/.eslintrc.js
[16:29:00.435] 1:1 Warning: Unused eslint-disable directive (no problems were reported from '@typescript-eslint/no-unused-vars').
[16:29:00.441] 2:1 Warning: Unused eslint-disable directive (no problems were reported from 'react-hooks/exhaustive-deps').
[16:29:00.441] 3:1 Warning: Unused eslint-disable directive (no problems were reported from '@next/next/no-img-element').
[16:29:00.442] 4:1 Warning: Unused eslint-disable directive (no problems were reported from 'jsx-a11y/alt-text').
[16:29:00.442]
[16:29:00.443] ./src/app/templates/course-templates/assignments/page.tsx
[16:29:00.443] 4:8 Warning: 'Link' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.446] 8:10 Warning: 'Progress' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.447] 11:3 Warning: 'ArrowLeft' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.447] 18:3 Warning: 'Download' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.450] 19:3 Warning: 'Eye' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.450] 20:3 Warning: 'Edit' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.450] 26:10 Warning: 'CompletionDot' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.451]
[16:29:00.454] ./src/app/templates/course-templates/certificate/page.tsx
[16:29:00.454] 7:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.455] 24:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.455]
[16:29:00.455] ./src/app/templates/course-templates/course-page/page.tsx
[16:29:00.456] 3:26 Warning: 'useEffect' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.465] 4:8 Warning: 'Link' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.466] 5:44 Warning: 'Download' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.466] 5:54 Warning: 'Smartphone' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.467] 5:66 Warning: 'Infinity' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.467] 5:76 Warning: 'Award' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.467] 5:122 Warning: 'Bookmark' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.468] 5:132 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.468] 5:157 Warning: 'Eye' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.468] 5:162 Warning: 'EyeOff' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.469] 9:26 Warning: 'TemplateSection' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.469] 9:43 Warning: 'TemplateCard' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.469] 34:17 Warning: 'profile' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:29:00.469] 375:19 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[16:29:00.470] 561:21 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[16:29:00.470] 615:21 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[16:29:00.471]
[16:29:00.471] ./src/app/templates/course-templates/lesson/page.tsx
[16:29:00.471] 18:3 Warning: 'Lock' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.471] 26:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.472] 30:10 Warning: 'completedLessons' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:29:00.472] 30:28 Warning: 'setCompletedLessons' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:29:00.472]
[16:29:00.473] ./src/app/templates/course-templates/page.tsx
[16:29:00.473] 2:10 Warning: 'memo' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.473]
[16:29:00.474] ./src/app/templates/course-templates/performance-analytics/page.tsx
[16:29:00.474] 9:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.474] 19:3 Warning: 'Calendar' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.475] 22:3 Warning: 'RefreshCw' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.475] 28:3 Warning: 'PieChart' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.475] 29:3 Warning: 'Activity' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.475] 35:10 Warning: 'selectedCourse' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:29:00.476] 35:26 Warning: 'setSelectedCourse' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:29:00.476]
[16:29:00.476] ./src/app/templates/course-templates/question-bank/page.tsx
[16:29:00.476] 9:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.477] 12:3 Warning: 'Filter' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.477] 22:3 Warning: 'XCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.477] 23:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.477] 25:3 Warning: 'Calculator' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.478] 26:3 Warning: 'Lightbulb' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.478] 27:3 Warning: 'Brain' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.478] 103:9 Warning: 'questionTypes' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:29:00.478]
[16:29:00.479] ./src/app/templates/course-templates/quiz/page.tsx
[16:29:00.479] 18:3 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.479] 19:3 Warning: 'FileText' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.480] 22:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.480]
[16:29:00.480] ./src/app/templates/dashboard-templates/admin-panel/page.tsx
[16:29:00.480] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.481] 5:29 Warning: 'CardDescription' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.481] 5:46 Warning: 'CardHeader' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.481] 5:58 Warning: 'CardTitle' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.481]
[16:29:00.482] ./src/app/templates/dashboard-templates/analytics/page.tsx
[16:29:00.482] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.482] 6:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.482] 7:33 Warning: 'TrendingDown' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.483] 7:64 Warning: 'DollarSign' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.483]
[16:29:00.483] ./src/app/templates/dashboard-templates/institution-dashboard/page.tsx
[16:29:00.483] 9:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.484] 23:3 Warning: 'Upload' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.484] 26:3 Warning: 'Phone' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.484] 28:3 Warning: 'Globe' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.484] 31:3 Warning: 'PieChart' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.485] 33:3 Warning: 'Target' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.485] 34:3 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.485] 35:3 Warning: 'CheckCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.485] 36:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.486] 37:3 Warning: 'UserPlus' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.486] 38:3 Warning: 'School' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.486] 39:3 Warning: 'BookMarked' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.487]
[16:29:00.487] ./src/app/templates/dashboard-templates/instructor-dashboard/page.tsx
[16:29:00.487] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.487] 5:29 Warning: 'CardDescription' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.488] 5:46 Warning: 'CardHeader' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.488] 5:58 Warning: 'CardTitle' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.488] 7:100 Warning: 'Download' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.489]
[16:29:00.489] ./src/app/templates/dashboard-templates/page.tsx
[16:29:00.489] 2:10 Warning: 'memo' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.489]
[16:29:00.495] ./src/app/templates/dashboard-templates/student-dashboard/page.tsx
[16:29:00.496] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.496] 5:29 Warning: 'CardDescription' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.496] 5:46 Warning: 'CardHeader' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.497] 5:58 Warning: 'CardTitle' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.497]
[16:29:00.497] ./src/app/templates/dashboard-templates/teacher-signup/page.tsx
[16:29:00.497] 9:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.498] 14:3 Warning: 'Phone' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.498] 15:3 Warning: 'MapPin' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.498] 17:3 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.499] 25:3 Warning: 'Trash2' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.499] 30:3 Warning: 'Users' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.499] 36:3 Warning: 'Filter' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.499] 41:10 Warning: 'formData' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:29:00.500] 41:20 Warning: 'setFormData' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:29:00.500] 133:9 Warning: 'getStatusIcon' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:29:00.500]
[16:29:00.501] ./src/app/templates/page-templates/404/page.tsx
[16:29:00.501] 7:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.502]
[16:29:00.502] ./src/app/templates/page-templates/about/page.tsx
[16:29:00.503] 4:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.503]
[16:29:00.503] ./src/app/templates/page-templates/analytics/page.tsx
[16:29:00.504] 6:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.504] 20:3 Warning: 'Filter' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.504] 21:3 Warning: 'Calendar' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.504] 23:3 Warning: 'Zap' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.505] 25:3 Warning: 'PieChart' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.505] 26:3 Warning: 'LineChart' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.505] 31:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.506] 32:3 Warning: 'CheckCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.506] 34:3 Warning: 'GraduationCap' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.506] 35:3 Warning: 'MessageCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.507] 36:3 Warning: 'Heart' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.507] 37:3 Warning: 'ThumbsUp' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.507] 42:10 Warning: 'selectedMetric' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:29:00.508] 42:26 Warning: 'setSelectedMetric' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:29:00.508]
[16:29:00.508] ./src/app/templates/page-templates/checkout/page.tsx
[16:29:00.508] 7:10 Warning: 'Tabs' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.509] 7:16 Warning: 'TabsContent' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.509] 7:29 Warning: 'TabsList' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.509] 7:39 Warning: 'TabsTrigger' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.510] 14:3 Warning: 'XCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.510] 15:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.510] 16:3 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.511] 19:3 Warning: 'Phone' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.511] 20:3 Warning: 'MapPin' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.511] 21:3 Warning: 'Calendar' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.511] 25:3 Warning: 'Award' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.512] 27:3 Warning: 'Percent' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.512] 29:3 Warning: 'RefreshCw' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.512] 30:3 Warning: 'Eye' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.513] 31:3 Warning: 'Edit' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.513] 32:3 Warning: 'Trash2' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.513] 33:3 Warning: 'Plus' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.513] 34:3 Warning: 'Minus' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.514]
[16:29:00.514] ./src/app/templates/page-templates/contact/page.tsx
[16:29:00.514] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.515]
[16:29:00.515] ./src/app/templates/page-templates/courses-listing/page.tsx
[16:29:00.515] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.515]
[16:29:00.516] ./src/app/templates/page-templates/faq/page.tsx
[16:29:00.516] 23:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.516]
[16:29:00.516] ./src/app/templates/page-templates/faq-support/page.tsx
[16:29:00.517] 16:3 Warning: 'CheckCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.517] 17:3 Warning: 'XCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.517] 18:3 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.518] 19:3 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.518] 21:3 Warning: 'ThumbsDown' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.518] 23:3 Warning: 'Mail' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.518] 24:3 Warning: 'Phone' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.519] 26:3 Warning: 'Filter' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.519] 27:3 Warning: 'SortAsc' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.519] 28:3 Warning: 'SortDesc' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.519] 29:3 Warning: 'Download' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.520] 30:3 Warning: 'Upload' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.520] 32:3 Warning: 'Zap' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.520] 33:3 Warning: 'Users' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.520] 34:3 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.521] 35:3 Warning: 'Award' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.521] 37:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.521] 38:3 Warning: 'Info' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.521] 39:3 Warning: 'ExternalLink' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.522] 41:3 Warning: 'Share2' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.522] 42:3 Warning: 'Heart' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.522] 43:3 Warning: 'Flag' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.522] 44:3 Warning: 'Lock' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.523] 45:3 Warning: 'Unlock' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.523] 533:53 Warning: 'index' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.523]
[16:29:00.523] ./src/app/templates/page-templates/helpdesk/page.tsx
[16:29:00.524] 17:3 Warning: 'CheckCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.524] 18:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.524] 19:3 Warning: 'FileText' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.525] 21:3 Warning: 'Filter' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.525] 22:3 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.525] 24:3 Warning: 'Archive' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.525]
[16:29:00.526] ./src/app/templates/page-templates/page.tsx
[16:29:00.526] 2:10 Warning: 'memo' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.526]
[16:29:00.526] ./src/app/templates/page-templates/password-reset/page.tsx
[16:29:00.527] 2:10 Warning: 'memo' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.527]
[16:29:00.527] ./src/app/templates/page-templates/pricing/page.tsx
[16:29:00.527] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.528] 7:28 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.545]
[16:29:00.545] ./src/app/templates/page-templates/privacy/page.tsx
[16:29:00.545] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.545] 6:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.545]
[16:29:00.545] ./src/app/templates/page-templates/refund/page.tsx
[16:29:00.545] 10:3 Warning: 'ArrowLeft' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.545] 17:3 Warning: 'Mail' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.545] 18:3 Warning: 'Phone' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.545] 19:3 Warning: 'Calendar' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.545] 25:3 Warning: 'Edit' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.546] 26:3 Warning: 'Send' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.546] 27:3 Warning: 'User' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.546] 28:3 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.546] 32:3 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.546] 33:3 Warning: 'ThumbsUp' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.546] 34:3 Warning: 'ThumbsDown' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.546] 38:10 Warning: 'refundReason' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:29:00.546] 38:24 Warning: 'setRefundReason' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:29:00.546] 39:10 Warning: 'refundAmount' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:29:00.546] 39:24 Warning: 'setRefundAmount' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:29:00.546]
[16:29:00.546] ./src/app/templates/page-templates/subscription-management/page.tsx
[16:29:00.546] 11:3 Warning: 'Calendar' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.546] 14:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.546] 17:3 Warning: 'Zap' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.546] 18:3 Warning: 'Users' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.546] 19:3 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.546] 22:3 Warning: 'Bell' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.546] 23:3 Warning: 'Shield' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.546] 24:3 Warning: 'Lock' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.546] 25:3 Warning: 'ArrowRight' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.546] 26:3 Warning: 'ArrowLeft' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.546] 28:3 Warning: 'Minus' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.546] 31:3 Warning: 'Eye' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.546] 32:3 Warning: 'RefreshCw' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.546] 34:3 Warning: 'Award' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.546] 35:3 Warning: 'Gift' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.546] 36:3 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.546]
[16:29:00.546] ./src/app/templates/page-templates/team/page.tsx
[16:29:00.546] 12:3 Warning: 'Award' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.546] 13:3 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.546] 17:3 Warning: 'Twitter' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.546] 18:3 Warning: 'Globe' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.546] 19:3 Warning: 'Calendar' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.547] 20:3 Warning: 'MapPin' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.547] 21:3 Warning: 'Phone' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.547] 23:3 Warning: 'Plus' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.547] 24:3 Warning: 'Edit' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.547] 26:3 Warning: 'Trash2' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.547] 27:3 Warning: 'Filter' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.548] 29:3 Warning: 'Heart' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.549] 30:3 Warning: 'Share2' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.549] 31:3 Warning: 'Download' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.549] 34:3 Warning: 'Zap' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.550] 37:3 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.550]
[16:29:00.550] ./src/app/templates/page-templates/terms/page.tsx
[16:29:00.550] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.551] 6:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.551]
[16:29:00.551] ./src/app/templates/page-templates/testimonials/page.tsx
[16:29:00.560] 9:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.560] 13:3 Warning: 'Users' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.560] 14:3 Warning: 'Award' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.560] 16:3 Warning: 'ThumbsDown' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.560] 17:3 Warning: 'Filter' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.560] 19:3 Warning: 'Plus' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.560] 24:3 Warning: 'XCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.560] 25:3 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.560] 26:3 Warning: 'MessageCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.560] 29:3 Warning: 'GraduationCap' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.560]
[16:29:00.560] ./src/app/templates/page-templates/user-profile/page.tsx
[16:29:00.560] 11:3 Warning: 'Mail' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.560] 12:3 Warning: 'Phone' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.560] 13:3 Warning: 'MapPin' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.560] 17:3 Warning: 'Camera' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.560] 19:3 Warning: 'Bell' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.561] 20:3 Warning: 'Shield' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.561] 21:3 Warning: 'Lock' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.561] 24:3 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.561] 30:3 Warning: 'Upload' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.561] 33:3 Warning: 'Minus' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.561] 35:3 Warning: 'XCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.561] 36:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.561] 37:3 Warning: 'Heart' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.561] 39:3 Warning: 'MessageCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.561] 40:3 Warning: 'Linkedin' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.561] 41:3 Warning: 'Twitter' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.561] 42:3 Warning: 'Globe' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.561] 43:3 Warning: 'GraduationCap' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.561] 45:3 Warning: 'Zap' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.561]
[16:29:00.561] ./src/app/templates/page.tsx
[16:29:00.561] 2:10 Warning: 'memo' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.561]
[16:29:00.561] ./src/app/templates/scale-up-templates/page.tsx
[16:29:00.561] 2:10 Warning: 'memo' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.561]
[16:29:00.561] ./src/contexts/AuthContext.tsx
[16:29:00.561] 64:6 Warning: React Hook useEffect has a missing dependency: 'profile'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[16:29:00.561] 67:9 Warning: The 'createProfile' function makes the dependencies of useCallback Hook (at line 273) change on every render. Move it inside the useCallback callback. Alternatively, wrap the definition of 'createProfile' in its own useCallback() Hook. react-hooks/exhaustive-deps
[16:29:00.561] 126:9 Warning: The 'createFallbackProfile' function makes the dependencies of useCallback Hook (at line 273) change on every render. Move it inside the useCallback callback. Alternatively, wrap the definition of 'createFallbackProfile' in its own useCallback() Hook. react-hooks/exhaustive-deps
[16:29:00.561] 277:9 Warning: The 'hasPermission' function makes the dependencies of useMemo Hook (at line 568) change on every render. To fix this, wrap the definition of 'hasPermission' in its own useCallback() Hook. react-hooks/exhaustive-deps
[16:29:00.561] 301:9 Warning: The 'updateUserRole' function makes the dependencies of useMemo Hook (at line 568) change on every render. Move it inside the useMemo callback. Alternatively, wrap the definition of 'updateUserRole' in its own useCallback() Hook. react-hooks/exhaustive-deps
[16:29:00.561] 342:9 Warning: The 'refreshProfile' function makes the dependencies of useMemo Hook (at line 568) change on every render. To fix this, wrap the definition of 'refreshProfile' in its own useCallback() Hook. react-hooks/exhaustive-deps
[16:29:00.561] 455:9 Warning: The 'signIn' function makes the dependencies of useMemo Hook (at line 568) change on every render. Move it inside the useMemo callback. Alternatively, wrap the definition of 'signIn' in its own useCallback() Hook. react-hooks/exhaustive-deps
[16:29:00.561] 463:9 Warning: The 'signUp' function makes the dependencies of useMemo Hook (at line 568) change on every render. Move it inside the useMemo callback. Alternatively, wrap the definition of 'signUp' in its own useCallback() Hook. react-hooks/exhaustive-deps
[16:29:00.561] 477:9 Warning: The 'signOut' function makes the dependencies of useMemo Hook (at line 568) change on every render. Move it inside the useMemo callback. Alternatively, wrap the definition of 'signOut' in its own useCallback() Hook. react-hooks/exhaustive-deps
[16:29:00.561] 507:9 Warning: The 'signInWithGoogle' function makes the dependencies of useMemo Hook (at line 568) change on every render. Move it inside the useMemo callback. Alternatively, wrap the definition of 'signInWithGoogle' in its own useCallback() Hook. react-hooks/exhaustive-deps
[16:29:00.561] 540:9 Warning: The 'resetPassword' function makes the dependencies of useMemo Hook (at line 568) change on every render. Move it inside the useMemo callback. Alternatively, wrap the definition of 'resetPassword' in its own useCallback() Hook. react-hooks/exhaustive-deps
[16:29:00.561] 547:9 Warning: The 'updatePassword' function makes the dependencies of useMemo Hook (at line 568) change on every render. Move it inside the useMemo callback. Alternatively, wrap the definition of 'updatePassword' in its own useCallback() Hook. react-hooks/exhaustive-deps
[16:29:00.561]
[16:29:00.561] ./src/hooks/useCourseData.ts
[16:29:00.561] 83:6 Warning: React Hook useEffect has a missing dependency: 'organizeLessonsIntoSections'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[16:29:00.561] 89:30 Warning: 'index' is defined but never used. @typescript-eslint/no-unused-vars
[16:29:00.561]
[16:29:00.561] ./src/lib/supabase/server.ts
[16:29:00.561] 40:9 Warning: 'cookieString' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:29:00.561]
[16:29:00.562] info - Need to disable some ESLint rules? Learn more here: https://nextjs.org/docs/app/api-reference/config/eslint#disabling-rules
[16:29:11.224] Failed to compile.
[16:29:11.224]
[16:29:11.225] ./src/app/dashboard/courses/builder/page.tsx:47:7
[16:29:11.225] Type error: Cannot find name 'setSelectedTemplate'.
[16:29:11.225]
[16:29:11.226] [0m [90m 45 |[39m [36mif[39m (template) {
[16:29:11.226] [90m 46 |[39m setCourse(template)
[16:29:11.226] [31m[1m>[22m[39m[90m 47 |[39m setSelectedTemplate(templateId)
[16:29:11.226] [90m |[39m [31m[1m^[22m[39m
[16:29:11.227] [90m 48 |[39m setIsEditing([36mtrue[39m)
[16:29:11.227] [90m 49 |[39m }
[16:29:11.227] [90m 50 |[39m }[0m
[16:29:11.264] Next.js build worker exited with code: 1 and signal: null
[16:29:11.285] Error: Command "npm run build" exited with 1
