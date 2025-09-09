[15:57:30.100] Running build in Washington, D.C., USA (East) – iad1
[15:57:30.105] Build machine configuration: 2 cores, 8 GB
[15:57:30.125] Cloning github.com/viditforsv/shriarya_lms_next (Branch: dev, Commit: 686b1a8)
[15:57:30.938] Cloning completed: 813.000ms
[15:57:33.630] Restored build cache from previous deployment (FLEVK6uF47PQb41HE7gpy97gxUAX)
[15:57:34.134] Running "vercel build"
[15:57:34.539] Vercel CLI 47.0.5
[15:57:34.889] Installing dependencies...
[15:57:36.513]
[15:57:36.515] added 7 packages in 1s
[15:57:36.515]
[15:57:36.516] 146 packages are looking for funding
[15:57:36.517] run `npm fund` for details
[15:57:36.546] Detected Next.js version: 15.5.2
[15:57:36.550] Running "npm run build"
[15:57:36.684]
[15:57:36.685] > shriarya_lms_next@0.1.0 build
[15:57:36.685] > next build
[15:57:36.686]
[15:57:37.794] ▲ Next.js 15.5.2
[15:57:37.795]
[15:57:37.901] Creating an optimized production build ...
[15:58:05.774] ✓ Compiled successfully in 25.0s
[15:58:05.780] Linting and checking validity of types ...
[15:58:19.427]
[15:58:19.427] Failed to compile.
[15:58:19.427]
[15:58:19.427] ./src/app/api/courses/builder/route.ts
[15:58:19.427] 3:10 Warning: 'CourseTemplate' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.427] 45:19 Warning: 'profile' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:58:19.427] 45:35 Warning: 'profileError' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:58:19.427]
[15:58:19.427] ./src/app/api/courses/route.ts
[15:58:19.427] 26:7 Warning: 'LessonSchema' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:58:19.428] 37:7 Warning: 'ResourceSchema' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:58:19.428]
[15:58:19.428] ./src/app/api/courses-v2/route.ts
[15:58:19.428] 8:13 Warning: 'searchParams' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:58:19.428]
[15:58:19.428] ./src/app/api/lessons-v2/route.ts
[15:58:19.428] 11:11 Warning: 'published' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:58:19.428]
[15:58:19.428] ./src/app/auth/reset-password/page.tsx
[15:58:19.428] 23:9 Warning: 'searchParams' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:58:19.428]
[15:58:19.428] ./src/app/components-demo/content/section-editor.tsx
[15:58:19.428] 43:6 Warning: React Hook useEffect has a missing dependency: 'fetchSections'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[15:58:19.429]
[15:58:19.429] ./src/app/components-demo/student-file-access-real.tsx
[15:58:19.429] 274:19 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[15:58:19.429]
[15:58:19.429] ./src/app/components-demo/student-file-access.tsx
[15:58:19.429] 70:6 Warning: React Hook useEffect has a missing dependency: 'mockFiles'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[15:58:19.429] 250:19 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[15:58:19.429]
[15:58:19.429] ./src/app/components-demo/ui/collapsible-sidebar.tsx
[15:58:19.431] 24:3 Warning: 'Section' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.431] 25:3 Warning: 'Chapter' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.431] 37:20 Warning: 'setSyllabus' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:58:19.431]
[15:58:19.431] ./src/app/components-demo/ui/file-upload.tsx
[15:58:19.431] 139:16 Warning: Image elements must have an alt prop, either with meaningful text, or an empty string for decorative images. jsx-a11y/alt-text
[15:58:19.431]
[15:58:19.431] ./src/app/components-demo/ui/header.tsx
[15:58:19.431] 30:6 Warning: React Hook useEffect has a missing dependency: 'user'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[15:58:19.431] 142:20 Error: 'ChevronDown' is not defined. react/jsx-no-undef
[15:58:19.431] 266:20 Error: 'ChevronDown' is not defined. react/jsx-no-undef
[15:58:19.431]
[15:58:19.431] ./src/app/components-demo/ui/pdf-viewer.tsx
[15:58:19.431] 226:6 Warning: React Hook useEffect has missing dependencies: 'pdfDoc' and 'useIframe'. Either include them or remove the dependency array. react-hooks/exhaustive-deps
[15:58:19.431]
[15:58:19.431] ./src/app/course-builder/page.tsx
[15:58:19.431] 89:10 Warning: 'editingLesson' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:58:19.431] 89:25 Warning: 'setEditingLesson' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:58:19.432] 140:14 Warning: 'err' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.432] 157:14 Warning: 'err' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.432] 186:14 Warning: 'err' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.444] 211:14 Warning: 'err' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.447] 233:14 Warning: 'err' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.448]
[15:58:19.448] ./src/app/courses/[slug]/lesson/[lessonSlug]/page.tsx
[15:58:19.448] 3:31 Warning: 'memo' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.448] 9:10 Warning: 'Progress' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.448] 24:3 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.448] 26:3 Warning: 'EyeOff' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.448] 76:17 Warning: 'profile' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:58:19.448] 233:9 Warning: 'calculateProgress' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:58:19.448]
[15:58:19.448] ./src/app/dashboard/courses/[id]/edit/page.tsx
[15:58:19.448] 5:47 Warning: 'Play' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.448] 5:53 Warning: 'CheckCircle' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.448] 18:11 Warning: 'CourseBuilderProps' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.448] 43:6 Warning: React Hook useEffect has a missing dependency: 'loadCourse'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[15:58:19.448] 407:39 Warning: 'index' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.448]
[15:58:19.448] ./src/app/dashboard/courses/builder/page.tsx
[15:58:19.448] 19:3 Warning: 'Upload' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.448] 21:3 Warning: 'Video' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.449] 22:3 Warning: 'FileText' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.449] 23:3 Warning: 'CheckCircle' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.449] 26:3 Warning: 'ArrowLeft' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.449] 31:3 Warning: 'CourseStructure' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.449] 36:3 Warning: 'getTemplatesByCurriculum' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.449] 37:3 Warning: 'createCourseFromTemplate' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.449] 38:3 Warning: 'generateCourseSlug' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.449] 43:10 Warning: 'selectedTemplate' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:58:19.449] 46:10 Warning: 'isEditing' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:58:19.449]
[15:58:19.449] ./src/app/dashboard/courses/manage/page.tsx
[15:58:19.449] 14:3 Warning: 'Trash2' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.449] 16:3 Warning: 'Users' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.449] 20:3 Warning: 'Filter' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.449] 22:3 Warning: 'Play' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.449] 23:3 Warning: 'Settings' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.449] 63:6 Warning: React Hook useEffect has a missing dependency: 'fetchCourses'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[15:58:19.449]
[15:58:19.449] ./src/app/dashboard/courses/new/page.tsx
[15:58:19.449] 7:29 Warning: 'CardHeader' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.449] 7:41 Warning: 'CardTitle' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.449]
[15:58:19.449] ./src/app/dashboard/courses/page.tsx
[15:58:19.449] 33:6 Warning: React Hook useEffect has a missing dependency: 'fetchCourses'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[15:58:19.449]
[15:58:19.449] ./src/app/dashboard/courses/template-converter/page.tsx
[15:58:19.449] 18:3 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.449] 20:3 Warning: 'Settings' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.449] 22:3 Warning: 'PlayCircle' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.449] 107:15 Warning: 'result' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:58:19.449]
[15:58:19.449] ./src/app/dashboard/page.tsx
[15:58:19.449] 8:20 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.449]
[15:58:19.449] ./src/app/page.tsx
[15:58:19.449] 3:10 Warning: 'useState' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.450] 3:20 Warning: 'useEffect' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.450]
[15:58:19.450] ./src/app/privacy/page.tsx
[15:58:19.450] 5:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.454]
[15:58:19.454] ./src/app/templates/.eslintrc.js
[15:58:19.454] 1:1 Warning: Unused eslint-disable directive (no problems were reported from '@typescript-eslint/no-unused-vars').
[15:58:19.454] 2:1 Warning: Unused eslint-disable directive (no problems were reported from 'react-hooks/exhaustive-deps').
[15:58:19.454] 3:1 Warning: Unused eslint-disable directive (no problems were reported from '@next/next/no-img-element').
[15:58:19.454] 4:1 Warning: Unused eslint-disable directive (no problems were reported from 'jsx-a11y/alt-text').
[15:58:19.454]
[15:58:19.454] ./src/app/templates/course-templates/assignments/page.tsx
[15:58:19.454] 4:8 Warning: 'Link' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.454] 8:10 Warning: 'Progress' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.454] 11:3 Warning: 'ArrowLeft' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.454] 18:3 Warning: 'Download' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.454] 19:3 Warning: 'Eye' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.454] 20:3 Warning: 'Edit' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.454] 26:10 Warning: 'CompletionDot' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.454]
[15:58:19.454] ./src/app/templates/course-templates/certificate/page.tsx
[15:58:19.454] 7:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.454] 24:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.454]
[15:58:19.454] ./src/app/templates/course-templates/course-page/page.tsx
[15:58:19.454] 3:26 Warning: 'useEffect' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.454] 4:8 Warning: 'Link' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.454] 5:44 Warning: 'Download' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.454] 5:54 Warning: 'Smartphone' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.454] 5:66 Warning: 'Infinity' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.454] 5:76 Warning: 'Award' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.454] 5:122 Warning: 'Bookmark' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.454] 5:132 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.454] 5:157 Warning: 'Eye' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.455] 5:162 Warning: 'EyeOff' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.462] 9:26 Warning: 'TemplateSection' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.462] 9:43 Warning: 'TemplateCard' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.462] 34:17 Warning: 'profile' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:58:19.462] 375:19 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[15:58:19.462] 561:21 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[15:58:19.462] 615:21 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[15:58:19.462]
[15:58:19.462] ./src/app/templates/course-templates/lesson/page.tsx
[15:58:19.462] 18:3 Warning: 'Lock' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.462] 26:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.462] 30:10 Warning: 'completedLessons' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:58:19.462] 30:28 Warning: 'setCompletedLessons' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:58:19.462]
[15:58:19.462] ./src/app/templates/course-templates/page.tsx
[15:58:19.462] 2:10 Warning: 'memo' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.462]
[15:58:19.462] ./src/app/templates/course-templates/performance-analytics/page.tsx
[15:58:19.462] 9:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.462] 19:3 Warning: 'Calendar' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.462] 22:3 Warning: 'RefreshCw' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.462] 28:3 Warning: 'PieChart' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.462] 29:3 Warning: 'Activity' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.465] 35:10 Warning: 'selectedCourse' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:58:19.465] 35:26 Warning: 'setSelectedCourse' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:58:19.465]
[15:58:19.465] ./src/app/templates/course-templates/question-bank/page.tsx
[15:58:19.465] 9:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.465] 12:3 Warning: 'Filter' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.465] 22:3 Warning: 'XCircle' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.465] 23:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.465] 25:3 Warning: 'Calculator' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.465] 26:3 Warning: 'Lightbulb' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.465] 27:3 Warning: 'Brain' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.465] 103:9 Warning: 'questionTypes' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:58:19.465]
[15:58:19.465] ./src/app/templates/course-templates/quiz/page.tsx
[15:58:19.465] 18:3 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.465] 19:3 Warning: 'FileText' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.465] 22:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.467]
[15:58:19.467] ./src/app/templates/dashboard-templates/admin-panel/page.tsx
[15:58:19.467] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.467] 5:29 Warning: 'CardDescription' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.467] 5:46 Warning: 'CardHeader' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.467] 5:58 Warning: 'CardTitle' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.467]
[15:58:19.467] ./src/app/templates/dashboard-templates/analytics/page.tsx
[15:58:19.467] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.467] 6:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.467] 7:33 Warning: 'TrendingDown' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.467] 7:64 Warning: 'DollarSign' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.467]
[15:58:19.467] ./src/app/templates/dashboard-templates/institution-dashboard/page.tsx
[15:58:19.467] 9:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.467] 23:3 Warning: 'Upload' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.467] 26:3 Warning: 'Phone' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.467] 28:3 Warning: 'Globe' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.467] 31:3 Warning: 'PieChart' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.467] 33:3 Warning: 'Target' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.467] 34:3 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.467] 35:3 Warning: 'CheckCircle' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.467] 36:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.467] 37:3 Warning: 'UserPlus' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.467] 38:3 Warning: 'School' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.467] 39:3 Warning: 'BookMarked' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.467]
[15:58:19.467] ./src/app/templates/dashboard-templates/instructor-dashboard/page.tsx
[15:58:19.467] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.467] 5:29 Warning: 'CardDescription' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.467] 5:46 Warning: 'CardHeader' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.467] 5:58 Warning: 'CardTitle' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.467] 7:100 Warning: 'Download' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.467]
[15:58:19.467] ./src/app/templates/dashboard-templates/page.tsx
[15:58:19.467] 2:10 Warning: 'memo' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.467]
[15:58:19.467] ./src/app/templates/dashboard-templates/student-dashboard/page.tsx
[15:58:19.467] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.467] 5:29 Warning: 'CardDescription' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.467] 5:46 Warning: 'CardHeader' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.468] 5:58 Warning: 'CardTitle' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.468]
[15:58:19.468] ./src/app/templates/dashboard-templates/teacher-signup/page.tsx
[15:58:19.468] 9:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.468] 14:3 Warning: 'Phone' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.468] 15:3 Warning: 'MapPin' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.468] 17:3 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.468] 25:3 Warning: 'Trash2' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.468] 30:3 Warning: 'Users' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.468] 36:3 Warning: 'Filter' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.468] 41:10 Warning: 'formData' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:58:19.468] 41:20 Warning: 'setFormData' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:58:19.468] 133:9 Warning: 'getStatusIcon' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:58:19.468]
[15:58:19.468] ./src/app/templates/page-templates/404/page.tsx
[15:58:19.468] 7:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.468]
[15:58:19.468] ./src/app/templates/page-templates/about/page.tsx
[15:58:19.468] 4:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.468]
[15:58:19.468] ./src/app/templates/page-templates/analytics/page.tsx
[15:58:19.468] 6:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.468] 20:3 Warning: 'Filter' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.468] 21:3 Warning: 'Calendar' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.468] 23:3 Warning: 'Zap' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.468] 25:3 Warning: 'PieChart' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.468] 26:3 Warning: 'LineChart' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.468] 31:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.468] 32:3 Warning: 'CheckCircle' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.468] 34:3 Warning: 'GraduationCap' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.468] 35:3 Warning: 'MessageCircle' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.468] 36:3 Warning: 'Heart' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.468] 37:3 Warning: 'ThumbsUp' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.468] 42:10 Warning: 'selectedMetric' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:58:19.469] 42:26 Warning: 'setSelectedMetric' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:58:19.469]
[15:58:19.469] ./src/app/templates/page-templates/checkout/page.tsx
[15:58:19.469] 7:10 Warning: 'Tabs' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.469] 7:16 Warning: 'TabsContent' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.469] 7:29 Warning: 'TabsList' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.469] 7:39 Warning: 'TabsTrigger' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.469] 14:3 Warning: 'XCircle' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.469] 15:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.469] 16:3 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.469] 19:3 Warning: 'Phone' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.469] 20:3 Warning: 'MapPin' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.469] 21:3 Warning: 'Calendar' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.469] 25:3 Warning: 'Award' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.469] 27:3 Warning: 'Percent' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.469] 29:3 Warning: 'RefreshCw' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.469] 30:3 Warning: 'Eye' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.469] 31:3 Warning: 'Edit' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.469] 32:3 Warning: 'Trash2' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.469] 33:3 Warning: 'Plus' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.469] 34:3 Warning: 'Minus' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.469]
[15:58:19.469] ./src/app/templates/page-templates/contact/page.tsx
[15:58:19.469] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.469]
[15:58:19.469] ./src/app/templates/page-templates/courses-listing/page.tsx
[15:58:19.473] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.473]
[15:58:19.477] ./src/app/templates/page-templates/faq/page.tsx
[15:58:19.477] 23:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.477]
[15:58:19.477] ./src/app/templates/page-templates/faq-support/page.tsx
[15:58:19.477] 16:3 Warning: 'CheckCircle' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.477] 17:3 Warning: 'XCircle' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.477] 18:3 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.477] 19:3 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.477] 21:3 Warning: 'ThumbsDown' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.477] 23:3 Warning: 'Mail' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.477] 24:3 Warning: 'Phone' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.477] 26:3 Warning: 'Filter' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.477] 27:3 Warning: 'SortAsc' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.477] 28:3 Warning: 'SortDesc' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.477] 29:3 Warning: 'Download' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.477] 30:3 Warning: 'Upload' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.477] 32:3 Warning: 'Zap' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.477] 33:3 Warning: 'Users' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.477] 34:3 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.477] 35:3 Warning: 'Award' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.477] 37:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.477] 38:3 Warning: 'Info' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.477] 39:3 Warning: 'ExternalLink' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.477] 41:3 Warning: 'Share2' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.477] 42:3 Warning: 'Heart' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.477] 43:3 Warning: 'Flag' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.477] 44:3 Warning: 'Lock' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.477] 45:3 Warning: 'Unlock' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.477] 533:53 Warning: 'index' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.477]
[15:58:19.477] ./src/app/templates/page-templates/helpdesk/page.tsx
[15:58:19.477] 17:3 Warning: 'CheckCircle' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.477] 18:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.477] 19:3 Warning: 'FileText' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.477] 21:3 Warning: 'Filter' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.477] 22:3 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.478] 24:3 Warning: 'Archive' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.478]
[15:58:19.478] ./src/app/templates/page-templates/page.tsx
[15:58:19.478] 2:10 Warning: 'memo' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.478]
[15:58:19.478] ./src/app/templates/page-templates/password-reset/page.tsx
[15:58:19.478] 2:10 Warning: 'memo' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.478]
[15:58:19.478] ./src/app/templates/page-templates/pricing/page.tsx
[15:58:19.478] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.478] 7:28 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.478]
[15:58:19.478] ./src/app/templates/page-templates/privacy/page.tsx
[15:58:19.478] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.478] 6:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.478]
[15:58:19.479] ./src/app/templates/page-templates/refund/page.tsx
[15:58:19.479] 10:3 Warning: 'ArrowLeft' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.479] 17:3 Warning: 'Mail' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.479] 18:3 Warning: 'Phone' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.479] 19:3 Warning: 'Calendar' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.479] 25:3 Warning: 'Edit' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.479] 26:3 Warning: 'Send' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.479] 27:3 Warning: 'User' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.479] 28:3 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.479] 32:3 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.479] 33:3 Warning: 'ThumbsUp' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.479] 34:3 Warning: 'ThumbsDown' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.479] 38:10 Warning: 'refundReason' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:58:19.479] 38:24 Warning: 'setRefundReason' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:58:19.479] 39:10 Warning: 'refundAmount' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:58:19.479] 39:24 Warning: 'setRefundAmount' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:58:19.479]
[15:58:19.479] ./src/app/templates/page-templates/subscription-management/page.tsx
[15:58:19.479] 11:3 Warning: 'Calendar' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.479] 14:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.479] 17:3 Warning: 'Zap' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.479] 18:3 Warning: 'Users' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.480] 19:3 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.480] 22:3 Warning: 'Bell' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.480] 23:3 Warning: 'Shield' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.480] 24:3 Warning: 'Lock' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.480] 25:3 Warning: 'ArrowRight' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.480] 26:3 Warning: 'ArrowLeft' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.480] 28:3 Warning: 'Minus' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.480] 31:3 Warning: 'Eye' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.480] 32:3 Warning: 'RefreshCw' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.480] 34:3 Warning: 'Award' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.485] 35:3 Warning: 'Gift' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.486] 36:3 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.486]
[15:58:19.486] ./src/app/templates/page-templates/team/page.tsx
[15:58:19.486] 12:3 Warning: 'Award' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.486] 13:3 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.487] 17:3 Warning: 'Twitter' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.487] 18:3 Warning: 'Globe' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.487] 19:3 Warning: 'Calendar' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.487] 20:3 Warning: 'MapPin' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.487] 21:3 Warning: 'Phone' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.487] 23:3 Warning: 'Plus' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.488] 24:3 Warning: 'Edit' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.488] 26:3 Warning: 'Trash2' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.488] 27:3 Warning: 'Filter' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.488] 29:3 Warning: 'Heart' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.488] 30:3 Warning: 'Share2' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.488] 31:3 Warning: 'Download' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.488] 34:3 Warning: 'Zap' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.488] 37:3 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.488]
[15:58:19.488] ./src/app/templates/page-templates/terms/page.tsx
[15:58:19.488] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.488] 6:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.488]
[15:58:19.489] ./src/app/templates/page-templates/testimonials/page.tsx
[15:58:19.489] 9:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.489] 13:3 Warning: 'Users' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.489] 14:3 Warning: 'Award' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.489] 16:3 Warning: 'ThumbsDown' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.489] 17:3 Warning: 'Filter' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.490] 19:3 Warning: 'Plus' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.490] 24:3 Warning: 'XCircle' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.490] 25:3 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.490] 26:3 Warning: 'MessageCircle' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.490] 29:3 Warning: 'GraduationCap' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.490]
[15:58:19.491] ./src/app/templates/page-templates/user-profile/page.tsx
[15:58:19.491] 11:3 Warning: 'Mail' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.491] 12:3 Warning: 'Phone' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.491] 13:3 Warning: 'MapPin' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.491] 17:3 Warning: 'Camera' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.491] 19:3 Warning: 'Bell' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.491] 20:3 Warning: 'Shield' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.492] 21:3 Warning: 'Lock' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.492] 24:3 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.492] 30:3 Warning: 'Upload' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.492] 33:3 Warning: 'Minus' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.492] 35:3 Warning: 'XCircle' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.493] 36:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.493] 37:3 Warning: 'Heart' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.493] 39:3 Warning: 'MessageCircle' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.493] 40:3 Warning: 'Linkedin' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.493] 41:3 Warning: 'Twitter' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.493] 42:3 Warning: 'Globe' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.493] 43:3 Warning: 'GraduationCap' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.493] 45:3 Warning: 'Zap' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.493]
[15:58:19.493] ./src/app/templates/page.tsx
[15:58:19.493] 2:10 Warning: 'memo' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.493]
[15:58:19.493] ./src/app/templates/scale-up-templates/page.tsx
[15:58:19.493] 2:10 Warning: 'memo' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.493]
[15:58:19.493] ./src/app/terms/page.tsx
[15:58:19.493] 5:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.493]
[15:58:19.493] ./src/contexts/AuthContext.tsx
[15:58:19.493] 64:6 Warning: React Hook useEffect has a missing dependency: 'profile'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[15:58:19.493] 67:9 Warning: The 'createProfile' function makes the dependencies of useCallback Hook (at line 273) change on every render. Move it inside the useCallback callback. Alternatively, wrap the definition of 'createProfile' in its own useCallback() Hook. react-hooks/exhaustive-deps
[15:58:19.493] 126:9 Warning: The 'createFallbackProfile' function makes the dependencies of useCallback Hook (at line 273) change on every render. Move it inside the useCallback callback. Alternatively, wrap the definition of 'createFallbackProfile' in its own useCallback() Hook. react-hooks/exhaustive-deps
[15:58:19.493] 277:9 Warning: The 'hasPermission' function makes the dependencies of useMemo Hook (at line 570) change on every render. To fix this, wrap the definition of 'hasPermission' in its own useCallback() Hook. react-hooks/exhaustive-deps
[15:58:19.494] 301:9 Warning: The 'updateUserRole' function makes the dependencies of useMemo Hook (at line 570) change on every render. Move it inside the useMemo callback. Alternatively, wrap the definition of 'updateUserRole' in its own useCallback() Hook. react-hooks/exhaustive-deps
[15:58:19.494] 342:9 Warning: The 'refreshProfile' function makes the dependencies of useMemo Hook (at line 570) change on every render. To fix this, wrap the definition of 'refreshProfile' in its own useCallback() Hook. react-hooks/exhaustive-deps
[15:58:19.494] 455:9 Warning: The 'signIn' function makes the dependencies of useMemo Hook (at line 570) change on every render. Move it inside the useMemo callback. Alternatively, wrap the definition of 'signIn' in its own useCallback() Hook. react-hooks/exhaustive-deps
[15:58:19.494] 463:9 Warning: The 'signUp' function makes the dependencies of useMemo Hook (at line 570) change on every render. Move it inside the useMemo callback. Alternatively, wrap the definition of 'signUp' in its own useCallback() Hook. react-hooks/exhaustive-deps
[15:58:19.494] 477:9 Warning: The 'signOut' function makes the dependencies of useMemo Hook (at line 570) change on every render. Move it inside the useMemo callback. Alternatively, wrap the definition of 'signOut' in its own useCallback() Hook. react-hooks/exhaustive-deps
[15:58:19.494] 507:9 Warning: The 'signInWithGoogle' function makes the dependencies of useMemo Hook (at line 570) change on every render. Move it inside the useMemo callback. Alternatively, wrap the definition of 'signInWithGoogle' in its own useCallback() Hook. react-hooks/exhaustive-deps
[15:58:19.494] 542:9 Warning: The 'resetPassword' function makes the dependencies of useMemo Hook (at line 570) change on every render. Move it inside the useMemo callback. Alternatively, wrap the definition of 'resetPassword' in its own useCallback() Hook. react-hooks/exhaustive-deps
[15:58:19.494] 549:9 Warning: The 'updatePassword' function makes the dependencies of useMemo Hook (at line 570) change on every render. Move it inside the useMemo callback. Alternatively, wrap the definition of 'updatePassword' in its own useCallback() Hook. react-hooks/exhaustive-deps
[15:58:19.494]
[15:58:19.494] ./src/hooks/useCourseData.ts
[15:58:19.494] 83:6 Warning: React Hook useEffect has a missing dependency: 'organizeLessonsIntoSections'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[15:58:19.494] 89:30 Warning: 'index' is defined but never used. @typescript-eslint/no-unused-vars
[15:58:19.494]
[15:58:19.494] ./src/lib/supabase/server.ts
[15:58:19.494] 40:9 Warning: 'cookieString' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:58:19.494]
[15:58:19.494] info - Need to disable some ESLint rules? Learn more here: https://nextjs.org/docs/app/api-reference/config/eslint#disabling-rules
[15:58:19.506] Error: Command "npm run build" exited with 1
