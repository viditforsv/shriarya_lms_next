[15:52:58.306] Running build in Washington, D.C., USA (East) – iad1
[15:52:58.307] Build machine configuration: 2 cores, 8 GB
[15:52:58.323] Cloning github.com/viditforsv/shriarya_lms_next (Branch: dev, Commit: 69ffae2)
[15:52:58.867] Cloning completed: 544.000ms
[15:53:01.888] Restored build cache from previous deployment (FLEVK6uF47PQb41HE7gpy97gxUAX)
[15:53:02.720] Running "vercel build"
[15:53:03.104] Vercel CLI 47.0.5
[15:53:03.454] Installing dependencies...
[15:53:04.883]
[15:53:04.884] added 7 packages in 1s
[15:53:04.884]
[15:53:04.885] 146 packages are looking for funding
[15:53:04.885] run `npm fund` for details
[15:53:04.915] Detected Next.js version: 15.5.2
[15:53:04.919] Running "npm run build"
[15:53:05.029]
[15:53:05.029] > shriarya_lms_next@0.1.0 build
[15:53:05.029] > next build
[15:53:05.030]
[15:53:06.146] ▲ Next.js 15.5.2
[15:53:06.147]
[15:53:06.255] Creating an optimized production build ...
[15:53:34.718] ✓ Compiled successfully in 25.6s
[15:53:34.725] Linting and checking validity of types ...
[15:53:48.172]
[15:53:48.172] ./src/app/api/courses/builder/route.ts
[15:53:48.177] 3:10 Warning: 'CourseTemplate' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.178] 45:19 Warning: 'profile' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:53:48.178] 45:35 Warning: 'profileError' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:53:48.178]
[15:53:48.178] ./src/app/api/courses/route.ts
[15:53:48.178] 26:7 Warning: 'LessonSchema' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:53:48.179] 37:7 Warning: 'ResourceSchema' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:53:48.179]
[15:53:48.179] ./src/app/api/courses-v2/route.ts
[15:53:48.179] 8:13 Warning: 'searchParams' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:53:48.179]
[15:53:48.179] ./src/app/api/lessons-v2/route.ts
[15:53:48.180] 11:11 Warning: 'published' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:53:48.180]
[15:53:48.180] ./src/app/auth/callback/route.ts
[15:53:48.180] 15:13 Warning: 'supabase' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:53:48.180]
[15:53:48.180] ./src/app/auth/page.tsx
[15:53:48.181] 33:19 Warning: 'data' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:53:48.181]
[15:53:48.181] ./src/app/auth/reset-password/page.tsx
[15:53:48.181] 23:9 Warning: 'searchParams' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:53:48.181]
[15:53:48.182] ./src/app/components-demo/content/section-editor.tsx
[15:53:48.182] 43:6 Warning: React Hook useEffect has a missing dependency: 'fetchSections'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[15:53:48.182]
[15:53:48.182] ./src/app/components-demo/student-file-access-real.tsx
[15:53:48.183] 274:19 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[15:53:48.183]
[15:53:48.184] ./src/app/components-demo/student-file-access.tsx
[15:53:48.184] 70:6 Warning: React Hook useEffect has a missing dependency: 'mockFiles'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[15:53:48.185] 250:19 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[15:53:48.185]
[15:53:48.185] ./src/app/components-demo/ui/collapsible-sidebar.tsx
[15:53:48.185] 24:3 Warning: 'Section' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.186] 25:3 Warning: 'Chapter' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.186] 37:20 Warning: 'setSyllabus' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:53:48.186]
[15:53:48.186] ./src/app/components-demo/ui/file-upload.tsx
[15:53:48.187] 139:16 Warning: Image elements must have an alt prop, either with meaningful text, or an empty string for decorative images. jsx-a11y/alt-text
[15:53:48.187]
[15:53:48.187] ./src/app/components-demo/ui/header.tsx
[15:53:48.187] 30:6 Warning: React Hook useEffect has a missing dependency: 'user'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[15:53:48.187]
[15:53:48.188] ./src/app/components-demo/ui/pdf-viewer.tsx
[15:53:48.188] 226:6 Warning: React Hook useEffect has missing dependencies: 'pdfDoc' and 'useIframe'. Either include them or remove the dependency array. react-hooks/exhaustive-deps
[15:53:48.188]
[15:53:48.188] ./src/app/course-builder/page.tsx
[15:53:48.188] 89:10 Warning: 'editingLesson' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:53:48.189] 89:25 Warning: 'setEditingLesson' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:53:48.189] 140:14 Warning: 'err' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.189] 157:14 Warning: 'err' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.189] 186:14 Warning: 'err' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.192] 211:14 Warning: 'err' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.192] 233:14 Warning: 'err' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.192]
[15:53:48.192] ./src/app/courses/[slug]/lesson/[lessonSlug]/page.tsx
[15:53:48.193] 3:31 Warning: 'memo' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.193] 9:10 Warning: 'Progress' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.193] 24:3 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.193] 26:3 Warning: 'EyeOff' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.193] 76:17 Warning: 'profile' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:53:48.194] 233:9 Warning: 'calculateProgress' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:53:48.194]
[15:53:48.194] ./src/app/dashboard/courses/[id]/edit/page.tsx
[15:53:48.194] 5:47 Warning: 'Play' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.194] 5:53 Warning: 'CheckCircle' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.194] 18:11 Warning: 'CourseBuilderProps' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.195] 43:6 Warning: React Hook useEffect has a missing dependency: 'loadCourse'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[15:53:48.195] 407:39 Warning: 'index' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.195]
[15:53:48.195] ./src/app/dashboard/courses/builder/page.tsx
[15:53:48.195] 19:3 Warning: 'Upload' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.196] 21:3 Warning: 'Video' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.198] 22:3 Warning: 'FileText' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.199] 23:3 Warning: 'CheckCircle' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.199] 26:3 Warning: 'ArrowLeft' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.199] 31:3 Warning: 'CourseStructure' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.199] 36:3 Warning: 'getTemplatesByCurriculum' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.199] 37:3 Warning: 'createCourseFromTemplate' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.200] 38:3 Warning: 'generateCourseSlug' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.201] 43:10 Warning: 'selectedTemplate' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:53:48.201] 46:10 Warning: 'isEditing' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:53:48.201]
[15:53:48.202] ./src/app/dashboard/courses/manage/page.tsx
[15:53:48.202] 14:3 Warning: 'Trash2' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.202] 16:3 Warning: 'Users' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.202] 20:3 Warning: 'Filter' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.202] 22:3 Warning: 'Play' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.202] 23:3 Warning: 'Settings' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.203] 63:6 Warning: React Hook useEffect has a missing dependency: 'fetchCourses'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[15:53:48.203]
[15:53:48.203] ./src/app/dashboard/courses/new/page.tsx
[15:53:48.203] 7:29 Warning: 'CardHeader' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.203] 7:41 Warning: 'CardTitle' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.203]
[15:53:48.204] ./src/app/dashboard/courses/page.tsx
[15:53:48.204] 33:6 Warning: React Hook useEffect has a missing dependency: 'fetchCourses'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[15:53:48.204]
[15:53:48.204] ./src/app/dashboard/courses/template-converter/page.tsx
[15:53:48.204] 18:3 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.204] 20:3 Warning: 'Settings' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.204] 22:3 Warning: 'PlayCircle' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.205] 107:15 Warning: 'result' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:53:48.205]
[15:53:48.205] ./src/app/dashboard/page.tsx
[15:53:48.205] 8:20 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.205]
[15:53:48.206] ./src/app/page.tsx
[15:53:48.206] 3:10 Warning: 'useState' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.206] 3:20 Warning: 'useEffect' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.206]
[15:53:48.206] ./src/app/privacy/page.tsx
[15:53:48.207] 5:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.209]
[15:53:48.209] ./src/app/templates/.eslintrc.js
[15:53:48.210] 1:1 Warning: Unused eslint-disable directive (no problems were reported from '@typescript-eslint/no-unused-vars').
[15:53:48.210] 2:1 Warning: Unused eslint-disable directive (no problems were reported from 'react-hooks/exhaustive-deps').
[15:53:48.210] 3:1 Warning: Unused eslint-disable directive (no problems were reported from '@next/next/no-img-element').
[15:53:48.210] 4:1 Warning: Unused eslint-disable directive (no problems were reported from 'jsx-a11y/alt-text').
[15:53:48.210]
[15:53:48.210] ./src/app/templates/course-templates/assignments/page.tsx
[15:53:48.211] 4:8 Warning: 'Link' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.211] 8:10 Warning: 'Progress' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.219] 11:3 Warning: 'ArrowLeft' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.219] 18:3 Warning: 'Download' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.219] 19:3 Warning: 'Eye' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.220] 20:3 Warning: 'Edit' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.220] 26:10 Warning: 'CompletionDot' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.220]
[15:53:48.220] ./src/app/templates/course-templates/certificate/page.tsx
[15:53:48.220] 7:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.220] 24:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.220]
[15:53:48.221] ./src/app/templates/course-templates/course-page/page.tsx
[15:53:48.221] 3:26 Warning: 'useEffect' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.221] 4:8 Warning: 'Link' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.221] 5:44 Warning: 'Download' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.221] 5:54 Warning: 'Smartphone' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.221] 5:66 Warning: 'Infinity' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.224] 5:76 Warning: 'Award' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.224] 5:122 Warning: 'Bookmark' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.224] 5:132 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.225] 5:157 Warning: 'Eye' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.225] 5:162 Warning: 'EyeOff' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.225] 9:26 Warning: 'TemplateSection' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.225] 9:43 Warning: 'TemplateCard' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.225] 34:17 Warning: 'profile' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:53:48.232] 375:19 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[15:53:48.233] 561:21 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[15:53:48.233] 615:21 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[15:53:48.233]
[15:53:48.233] ./src/app/templates/course-templates/lesson/page.tsx
[15:53:48.233] 18:3 Warning: 'Lock' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.233] 26:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.233] 30:10 Warning: 'completedLessons' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:53:48.233] 30:28 Warning: 'setCompletedLessons' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:53:48.233]
[15:53:48.233] ./src/app/templates/course-templates/page.tsx
[15:53:48.233] 2:10 Warning: 'memo' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.233]
[15:53:48.233] ./src/app/templates/course-templates/performance-analytics/page.tsx
[15:53:48.234] 9:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.234] 19:3 Warning: 'Calendar' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.234] 22:3 Warning: 'RefreshCw' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.234] 28:3 Warning: 'PieChart' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.234] 29:3 Warning: 'Activity' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.234] 35:10 Warning: 'selectedCourse' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:53:48.234] 35:26 Warning: 'setSelectedCourse' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:53:48.234]
[15:53:48.234] ./src/app/templates/course-templates/question-bank/page.tsx
[15:53:48.234] 9:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.234] 12:3 Warning: 'Filter' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.234] 22:3 Warning: 'XCircle' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.234] 23:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.234] 25:3 Warning: 'Calculator' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.234] 26:3 Warning: 'Lightbulb' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.234] 27:3 Warning: 'Brain' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.235] 103:9 Warning: 'questionTypes' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:53:48.235]
[15:53:48.235] ./src/app/templates/course-templates/quiz/page.tsx
[15:53:48.235] 18:3 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.235] 19:3 Warning: 'FileText' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.235] 22:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.235]
[15:53:48.235] ./src/app/templates/dashboard-templates/admin-panel/page.tsx
[15:53:48.235] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.236] 5:29 Warning: 'CardDescription' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.236] 5:46 Warning: 'CardHeader' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.236] 5:58 Warning: 'CardTitle' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.236]
[15:53:48.240] ./src/app/templates/dashboard-templates/analytics/page.tsx
[15:53:48.240] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.241] 6:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.241] 7:33 Warning: 'TrendingDown' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.241] 7:64 Warning: 'DollarSign' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.241]
[15:53:48.241] ./src/app/templates/dashboard-templates/institution-dashboard/page.tsx
[15:53:48.241] 9:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.241] 23:3 Warning: 'Upload' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.241] 26:3 Warning: 'Phone' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.241] 28:3 Warning: 'Globe' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.241] 31:3 Warning: 'PieChart' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.241] 33:3 Warning: 'Target' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.241] 34:3 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.241] 35:3 Warning: 'CheckCircle' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.241] 36:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.241] 37:3 Warning: 'UserPlus' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.241] 38:3 Warning: 'School' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.242] 39:3 Warning: 'BookMarked' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.242]
[15:53:48.242] ./src/app/templates/dashboard-templates/instructor-dashboard/page.tsx
[15:53:48.242] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.242] 5:29 Warning: 'CardDescription' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.242] 5:46 Warning: 'CardHeader' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.242] 5:58 Warning: 'CardTitle' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.242] 7:100 Warning: 'Download' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.242]
[15:53:48.242] ./src/app/templates/dashboard-templates/page.tsx
[15:53:48.242] 2:10 Warning: 'memo' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.242]
[15:53:48.242] ./src/app/templates/dashboard-templates/student-dashboard/page.tsx
[15:53:48.242] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.242] 5:29 Warning: 'CardDescription' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.242] 5:46 Warning: 'CardHeader' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.242] 5:58 Warning: 'CardTitle' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.243]
[15:53:48.243] ./src/app/templates/dashboard-templates/teacher-signup/page.tsx
[15:53:48.243] 9:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.243] 14:3 Warning: 'Phone' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.243] 15:3 Warning: 'MapPin' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.243] 17:3 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.243] 25:3 Warning: 'Trash2' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.243] 30:3 Warning: 'Users' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.243] 36:3 Warning: 'Filter' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.243] 41:10 Warning: 'formData' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:53:48.243] 41:20 Warning: 'setFormData' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:53:48.243] 133:9 Warning: 'getStatusIcon' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:53:48.243]
[15:53:48.243] ./src/app/templates/page-templates/404/page.tsx
[15:53:48.243] 7:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.244]
[15:53:48.244] ./src/app/templates/page-templates/about/page.tsx
[15:53:48.244] 4:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.244]
[15:53:48.244] ./src/app/templates/page-templates/analytics/page.tsx
[15:53:48.244] 6:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.244] 20:3 Warning: 'Filter' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.244] 21:3 Warning: 'Calendar' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.244] 23:3 Warning: 'Zap' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.244] 25:3 Warning: 'PieChart' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.244] 26:3 Warning: 'LineChart' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.244] 31:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.244] 32:3 Warning: 'CheckCircle' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.244] 34:3 Warning: 'GraduationCap' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.244] 35:3 Warning: 'MessageCircle' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.244] 36:3 Warning: 'Heart' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.244] 37:3 Warning: 'ThumbsUp' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.245] 42:10 Warning: 'selectedMetric' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:53:48.245] 42:26 Warning: 'setSelectedMetric' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:53:48.245]
[15:53:48.245] ./src/app/templates/page-templates/checkout/page.tsx
[15:53:48.245] 7:10 Warning: 'Tabs' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.245] 7:16 Warning: 'TabsContent' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.245] 7:29 Warning: 'TabsList' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.245] 7:39 Warning: 'TabsTrigger' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.248] 14:3 Warning: 'XCircle' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.248] 15:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.248] 16:3 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.248] 19:3 Warning: 'Phone' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.248] 20:3 Warning: 'MapPin' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.248] 21:3 Warning: 'Calendar' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.248] 25:3 Warning: 'Award' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.248] 27:3 Warning: 'Percent' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.248] 29:3 Warning: 'RefreshCw' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.248] 30:3 Warning: 'Eye' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.248] 31:3 Warning: 'Edit' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.248] 32:3 Warning: 'Trash2' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.248] 33:3 Warning: 'Plus' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.249] 34:3 Warning: 'Minus' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.249]
[15:53:48.254] ./src/app/templates/page-templates/contact/page.tsx
[15:53:48.254] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.254]
[15:53:48.254] ./src/app/templates/page-templates/courses-listing/page.tsx
[15:53:48.254] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.254]
[15:53:48.254] ./src/app/templates/page-templates/faq/page.tsx
[15:53:48.254] 23:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.255]
[15:53:48.255] ./src/app/templates/page-templates/faq-support/page.tsx
[15:53:48.255] 16:3 Warning: 'CheckCircle' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.255] 17:3 Warning: 'XCircle' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.255] 18:3 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.255] 19:3 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.255] 21:3 Warning: 'ThumbsDown' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.255] 23:3 Warning: 'Mail' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.255] 24:3 Warning: 'Phone' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.255] 26:3 Warning: 'Filter' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.255] 27:3 Warning: 'SortAsc' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.255] 28:3 Warning: 'SortDesc' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.255] 29:3 Warning: 'Download' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.255] 30:3 Warning: 'Upload' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.255] 32:3 Warning: 'Zap' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.255] 33:3 Warning: 'Users' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.256] 34:3 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.256] 35:3 Warning: 'Award' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.256] 37:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.256] 38:3 Warning: 'Info' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.256] 39:3 Warning: 'ExternalLink' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.256] 41:3 Warning: 'Share2' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.256] 42:3 Warning: 'Heart' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.256] 43:3 Warning: 'Flag' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.256] 44:3 Warning: 'Lock' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.256] 45:3 Warning: 'Unlock' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.256] 533:53 Warning: 'index' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.256]
[15:53:48.256] ./src/app/templates/page-templates/helpdesk/page.tsx
[15:53:48.256] 17:3 Warning: 'CheckCircle' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.256] 18:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.256] 19:3 Warning: 'FileText' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.257] 21:3 Warning: 'Filter' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.257] 22:3 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.257] 24:3 Warning: 'Archive' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.257]
[15:53:48.257] ./src/app/templates/page-templates/page.tsx
[15:53:48.257] 2:10 Warning: 'memo' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.257]
[15:53:48.257] ./src/app/templates/page-templates/password-reset/page.tsx
[15:53:48.257] 2:10 Warning: 'memo' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.257]
[15:53:48.257] ./src/app/templates/page-templates/pricing/page.tsx
[15:53:48.257] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.257] 7:28 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.257]
[15:53:48.258] ./src/app/templates/page-templates/privacy/page.tsx
[15:53:48.258] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.258] 6:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.258]
[15:53:48.258] ./src/app/templates/page-templates/refund/page.tsx
[15:53:48.258] 10:3 Warning: 'ArrowLeft' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.258] 17:3 Warning: 'Mail' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.258] 18:3 Warning: 'Phone' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.258] 19:3 Warning: 'Calendar' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.258] 25:3 Warning: 'Edit' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.258] 26:3 Warning: 'Send' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.258] 27:3 Warning: 'User' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.258] 28:3 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.258] 32:3 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.258] 33:3 Warning: 'ThumbsUp' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.258] 34:3 Warning: 'ThumbsDown' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.258] 38:10 Warning: 'refundReason' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:53:48.259] 38:24 Warning: 'setRefundReason' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:53:48.259] 39:10 Warning: 'refundAmount' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:53:48.259] 39:24 Warning: 'setRefundAmount' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:53:48.259]
[15:53:48.259] ./src/app/templates/page-templates/subscription-management/page.tsx
[15:53:48.259] 11:3 Warning: 'Calendar' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.259] 14:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.259] 17:3 Warning: 'Zap' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.259] 18:3 Warning: 'Users' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.259] 19:3 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.259] 22:3 Warning: 'Bell' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.259] 23:3 Warning: 'Shield' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.259] 24:3 Warning: 'Lock' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.259] 25:3 Warning: 'ArrowRight' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.259] 26:3 Warning: 'ArrowLeft' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.259] 28:3 Warning: 'Minus' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.259] 31:3 Warning: 'Eye' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.259] 32:3 Warning: 'RefreshCw' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.259] 34:3 Warning: 'Award' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.259] 35:3 Warning: 'Gift' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.260] 36:3 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.260]
[15:53:48.260] ./src/app/templates/page-templates/team/page.tsx
[15:53:48.260] 12:3 Warning: 'Award' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.260] 13:3 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.260] 17:3 Warning: 'Twitter' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.260] 18:3 Warning: 'Globe' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.260] 19:3 Warning: 'Calendar' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.260] 20:3 Warning: 'MapPin' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.260] 21:3 Warning: 'Phone' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.260] 23:3 Warning: 'Plus' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.260] 24:3 Warning: 'Edit' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.260] 26:3 Warning: 'Trash2' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.260] 27:3 Warning: 'Filter' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.260] 29:3 Warning: 'Heart' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.260] 30:3 Warning: 'Share2' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.260] 31:3 Warning: 'Download' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.260] 34:3 Warning: 'Zap' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.260] 37:3 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.261]
[15:53:48.261] ./src/app/templates/page-templates/terms/page.tsx
[15:53:48.261] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.261] 6:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.261]
[15:53:48.261] ./src/app/templates/page-templates/testimonials/page.tsx
[15:53:48.261] 9:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.261] 13:3 Warning: 'Users' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.261] 14:3 Warning: 'Award' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.261] 16:3 Warning: 'ThumbsDown' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.263] 17:3 Warning: 'Filter' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.263] 19:3 Warning: 'Plus' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.263] 24:3 Warning: 'XCircle' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.263] 25:3 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.263] 26:3 Warning: 'MessageCircle' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.264] 29:3 Warning: 'GraduationCap' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.264]
[15:53:48.264] ./src/app/templates/page-templates/user-profile/page.tsx
[15:53:48.264] 11:3 Warning: 'Mail' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.264] 12:3 Warning: 'Phone' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.264] 13:3 Warning: 'MapPin' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.264] 17:3 Warning: 'Camera' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.264] 19:3 Warning: 'Bell' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.264] 20:3 Warning: 'Shield' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.264] 21:3 Warning: 'Lock' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.264] 24:3 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.264] 30:3 Warning: 'Upload' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.264] 33:3 Warning: 'Minus' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.264] 35:3 Warning: 'XCircle' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.264] 36:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.264] 37:3 Warning: 'Heart' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.264] 39:3 Warning: 'MessageCircle' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.265] 40:3 Warning: 'Linkedin' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.265] 41:3 Warning: 'Twitter' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.265] 42:3 Warning: 'Globe' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.265] 43:3 Warning: 'GraduationCap' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.265] 45:3 Warning: 'Zap' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.265]
[15:53:48.265] ./src/app/templates/page.tsx
[15:53:48.265] 2:10 Warning: 'memo' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.265]
[15:53:48.265] ./src/app/templates/scale-up-templates/page.tsx
[15:53:48.265] 2:10 Warning: 'memo' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.265]
[15:53:48.265] ./src/app/terms/page.tsx
[15:53:48.265] 5:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.265]
[15:53:48.265] ./src/contexts/AuthContext.tsx
[15:53:48.266] 64:6 Warning: React Hook useEffect has a missing dependency: 'profile'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[15:53:48.266] 67:9 Warning: The 'createProfile' function makes the dependencies of useCallback Hook (at line 273) change on every render. Move it inside the useCallback callback. Alternatively, wrap the definition of 'createProfile' in its own useCallback() Hook. react-hooks/exhaustive-deps
[15:53:48.266] 126:9 Warning: The 'createFallbackProfile' function makes the dependencies of useCallback Hook (at line 273) change on every render. Move it inside the useCallback callback. Alternatively, wrap the definition of 'createFallbackProfile' in its own useCallback() Hook. react-hooks/exhaustive-deps
[15:53:48.269] 277:9 Warning: The 'hasPermission' function makes the dependencies of useMemo Hook (at line 570) change on every render. To fix this, wrap the definition of 'hasPermission' in its own useCallback() Hook. react-hooks/exhaustive-deps
[15:53:48.269] 301:9 Warning: The 'updateUserRole' function makes the dependencies of useMemo Hook (at line 570) change on every render. Move it inside the useMemo callback. Alternatively, wrap the definition of 'updateUserRole' in its own useCallback() Hook. react-hooks/exhaustive-deps
[15:53:48.269] 342:9 Warning: The 'refreshProfile' function makes the dependencies of useMemo Hook (at line 570) change on every render. To fix this, wrap the definition of 'refreshProfile' in its own useCallback() Hook. react-hooks/exhaustive-deps
[15:53:48.270] 455:9 Warning: The 'signIn' function makes the dependencies of useMemo Hook (at line 570) change on every render. Move it inside the useMemo callback. Alternatively, wrap the definition of 'signIn' in its own useCallback() Hook. react-hooks/exhaustive-deps
[15:53:48.270] 463:9 Warning: The 'signUp' function makes the dependencies of useMemo Hook (at line 570) change on every render. Move it inside the useMemo callback. Alternatively, wrap the definition of 'signUp' in its own useCallback() Hook. react-hooks/exhaustive-deps
[15:53:48.270] 477:9 Warning: The 'signOut' function makes the dependencies of useMemo Hook (at line 570) change on every render. Move it inside the useMemo callback. Alternatively, wrap the definition of 'signOut' in its own useCallback() Hook. react-hooks/exhaustive-deps
[15:53:48.270] 507:9 Warning: The 'signInWithGoogle' function makes the dependencies of useMemo Hook (at line 570) change on every render. Move it inside the useMemo callback. Alternatively, wrap the definition of 'signInWithGoogle' in its own useCallback() Hook. react-hooks/exhaustive-deps
[15:53:48.270] 542:9 Warning: The 'resetPassword' function makes the dependencies of useMemo Hook (at line 570) change on every render. Move it inside the useMemo callback. Alternatively, wrap the definition of 'resetPassword' in its own useCallback() Hook. react-hooks/exhaustive-deps
[15:53:48.270] 549:9 Warning: The 'updatePassword' function makes the dependencies of useMemo Hook (at line 570) change on every render. Move it inside the useMemo callback. Alternatively, wrap the definition of 'updatePassword' in its own useCallback() Hook. react-hooks/exhaustive-deps
[15:53:48.270]
[15:53:48.270] ./src/hooks/useCourseData.ts
[15:53:48.270] 83:6 Warning: React Hook useEffect has a missing dependency: 'organizeLessonsIntoSections'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[15:53:48.270] 89:30 Warning: 'index' is defined but never used. @typescript-eslint/no-unused-vars
[15:53:48.270]
[15:53:48.270] ./src/lib/supabase/server.ts
[15:53:48.270] 40:9 Warning: 'cookieString' is assigned a value but never used. @typescript-eslint/no-unused-vars
[15:53:48.270]
[15:53:48.270] info - Need to disable some ESLint rules? Learn more here: https://nextjs.org/docs/app/api-reference/config/eslint#disabling-rules
[15:53:59.050] Failed to compile.
[15:53:59.050]
[15:53:59.050] ./src/app/components-demo/ui/header.tsx:130:33
[15:53:59.050] Type error: Property 'dropdownItems' does not exist on type '{ name: string; href: string; hasDropdown: boolean; }'.
[15:53:59.050]
[15:53:59.050] [0m [90m 128 |[39m [33m<[39m[33mdiv[39m className[33m=[39m[32m"p-4"[39m[33m>[39m
[15:53:59.050] [90m 129 |[39m [33m<[39m[33mdiv[39m className[33m=[39m[32m"grid grid-cols-1 gap-3"[39m[33m>[39m
[15:53:59.051] [31m[1m>[22m[39m[90m 130 |[39m {item[33m.[39mdropdownItems[33m?[39m[33m.[39mmap((dropdownItem) [33m=>[39m (
[15:53:59.051] [90m |[39m [31m[1m^[22m[39m
[15:53:59.051] [90m 131 |[39m [33m<[39m[33mLink[39m
[15:53:59.051] [90m 132 |[39m key[33m=[39m{dropdownItem[33m.[39mname}
[15:53:59.051] [90m 133 |[39m href[33m=[39m{dropdownItem[33m.[39mhref}[0m
[15:53:59.084] Next.js build worker exited with code: 1 and signal: null
[15:53:59.106] Error: Command "npm run build" exited with 1
