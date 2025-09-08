[23:18:55.402] Running build in Washington, D.C., USA (East) – iad1
[23:18:55.403] Build machine configuration: 2 cores, 8 GB
[23:18:55.419] Cloning github.com/viditforsv/shriarya_lms_next (Branch: main, Commit: 403fb0f)
[23:18:55.937] Cloning completed: 518.000ms
[23:18:59.062] Restored build cache from previous deployment (ECApGAhLLWLrknCpnzEvQVsATAMY)
[23:18:59.605] Running "vercel build"
[23:19:00.009] Vercel CLI 47.0.5
[23:19:00.358] Installing dependencies...
[23:19:03.230]
[23:19:03.230] added 9 packages in 3s
[23:19:03.231]
[23:19:03.231] 146 packages are looking for funding
[23:19:03.232] run `npm fund` for details
[23:19:03.264] Detected Next.js version: 15.5.2
[23:19:03.268] Running "npm run build"
[23:19:03.377]
[23:19:03.377] > shriarya_lms_next@0.1.0 build
[23:19:03.378] > next build
[23:19:03.378]
[23:19:04.461] ▲ Next.js 15.5.2
[23:19:04.462]
[23:19:04.565] Creating an optimized production build ...
[23:19:21.160] <w> [webpack.cache.PackFileCacheStrategy] Serializing big strings (108kiB) impacts deserialization performance (consider using Buffer instead and decode when needed)
[23:19:30.109] ✓ Compiled successfully in 22.7s
[23:19:30.114] Linting and checking validity of types ...
[23:19:43.360]
[23:19:43.361] ./src/app/api/courses/builder/route.ts
[23:19:43.361] 3:10 Warning: 'CourseTemplate' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.362] 45:19 Warning: 'profile' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:19:43.362] 45:35 Warning: 'profileError' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:19:43.362]
[23:19:43.363] ./src/app/api/courses/route.ts
[23:19:43.363] 26:7 Warning: 'LessonSchema' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:19:43.363] 37:7 Warning: 'ResourceSchema' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:19:43.363]
[23:19:43.364] ./src/app/api/courses-v2/route.ts
[23:19:43.364] 8:13 Warning: 'searchParams' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:19:43.364]
[23:19:43.364] ./src/app/api/lessons-v2/route.ts
[23:19:43.365] 11:11 Warning: 'published' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:19:43.365]
[23:19:43.365] ./src/app/auth/page.tsx
[23:19:43.365] 3:20 Warning: 'useEffect' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.366]
[23:19:43.366] ./src/app/components-demo/content/section-editor.tsx
[23:19:43.366] 43:6 Warning: React Hook useEffect has a missing dependency: 'fetchSections'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[23:19:43.366]
[23:19:43.367] ./src/app/components-demo/student-file-access-real.tsx
[23:19:43.367] 274:19 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[23:19:43.367]
[23:19:43.368] ./src/app/components-demo/student-file-access.tsx
[23:19:43.368] 70:6 Warning: React Hook useEffect has a missing dependency: 'mockFiles'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[23:19:43.368] 250:19 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[23:19:43.368]
[23:19:43.368] ./src/app/components-demo/ui/collapsible-sidebar.tsx
[23:19:43.368] 24:3 Warning: 'Section' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.369] 25:3 Warning: 'Chapter' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.369] 37:20 Warning: 'setSyllabus' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:19:43.369]
[23:19:43.370] ./src/app/components-demo/ui/file-upload.tsx
[23:19:43.370] 139:16 Warning: Image elements must have an alt prop, either with meaningful text, or an empty string for decorative images. jsx-a11y/alt-text
[23:19:43.370]
[23:19:43.370] ./src/app/components-demo/ui/pdf-viewer.tsx
[23:19:43.371] 226:6 Warning: React Hook useEffect has missing dependencies: 'pdfDoc' and 'useIframe'. Either include them or remove the dependency array. react-hooks/exhaustive-deps
[23:19:43.372]
[23:19:43.372] ./src/app/course-builder/page.tsx
[23:19:43.372] 89:10 Warning: 'editingLesson' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:19:43.372] 89:25 Warning: 'setEditingLesson' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:19:43.373] 140:14 Warning: 'err' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.373] 157:14 Warning: 'err' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.375] 186:14 Warning: 'err' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.376] 211:14 Warning: 'err' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.376] 233:14 Warning: 'err' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.376]
[23:19:43.376] ./src/app/courses/[slug]/lesson/[lessonSlug]/page.tsx
[23:19:43.377] 3:31 Warning: 'memo' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.380] 9:10 Warning: 'Progress' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.380] 24:3 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.380] 26:3 Warning: 'EyeOff' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.381] 76:17 Warning: 'profile' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:19:43.389] 233:9 Warning: 'calculateProgress' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:19:43.389]
[23:19:43.389] ./src/app/dashboard/courses/[id]/edit/page.tsx
[23:19:43.389] 5:47 Warning: 'Play' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.389] 5:53 Warning: 'CheckCircle' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.390] 18:11 Warning: 'CourseBuilderProps' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.390] 43:6 Warning: React Hook useEffect has a missing dependency: 'loadCourse'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[23:19:43.390] 407:39 Warning: 'index' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.390]
[23:19:43.390] ./src/app/dashboard/courses/builder/page.tsx
[23:19:43.390] 19:3 Warning: 'Upload' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.390] 21:3 Warning: 'Video' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.391] 22:3 Warning: 'FileText' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.391] 23:3 Warning: 'CheckCircle' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.391] 26:3 Warning: 'ArrowLeft' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.391] 31:3 Warning: 'CourseStructure' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.394] 36:3 Warning: 'getTemplatesByCurriculum' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.394] 37:3 Warning: 'createCourseFromTemplate' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.394] 38:3 Warning: 'generateCourseSlug' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.394] 43:10 Warning: 'selectedTemplate' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:19:43.394] 46:10 Warning: 'isEditing' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:19:43.395]
[23:19:43.395] ./src/app/dashboard/courses/manage/page.tsx
[23:19:43.395] 14:3 Warning: 'Trash2' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.395] 16:3 Warning: 'Users' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.395] 20:3 Warning: 'Filter' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.396] 22:3 Warning: 'Play' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.396] 23:3 Warning: 'Settings' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.396] 63:6 Warning: React Hook useEffect has a missing dependency: 'fetchCourses'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[23:19:43.396]
[23:19:43.396] ./src/app/dashboard/courses/new/page.tsx
[23:19:43.397] 7:29 Warning: 'CardHeader' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.397] 7:41 Warning: 'CardTitle' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.398]
[23:19:43.406] ./src/app/dashboard/courses/page.tsx
[23:19:43.406] 33:6 Warning: React Hook useEffect has a missing dependency: 'fetchCourses'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[23:19:43.406]
[23:19:43.407] ./src/app/dashboard/courses/template-converter/page.tsx
[23:19:43.407] 18:3 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.407] 20:3 Warning: 'Settings' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.407] 22:3 Warning: 'PlayCircle' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.407] 107:15 Warning: 'result' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:19:43.407]
[23:19:43.407] ./src/app/dashboard/page.tsx
[23:19:43.408] 8:20 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.409]
[23:19:43.409] ./src/app/page.tsx
[23:19:43.409] 3:10 Warning: 'useState' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.409] 3:20 Warning: 'useEffect' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.409]
[23:19:43.409] ./src/app/privacy/page.tsx
[23:19:43.409] 5:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.410]
[23:19:43.410] ./src/app/templates/.eslintrc.js
[23:19:43.410] 1:1 Warning: Unused eslint-disable directive (no problems were reported from '@typescript-eslint/no-unused-vars').
[23:19:43.410] 2:1 Warning: Unused eslint-disable directive (no problems were reported from 'react-hooks/exhaustive-deps').
[23:19:43.410] 3:1 Warning: Unused eslint-disable directive (no problems were reported from '@next/next/no-img-element').
[23:19:43.411] 4:1 Warning: Unused eslint-disable directive (no problems were reported from 'jsx-a11y/alt-text').
[23:19:43.411]
[23:19:43.411] ./src/app/templates/course-templates/assignments/page.tsx
[23:19:43.411] 4:8 Warning: 'Link' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.411] 8:10 Warning: 'Progress' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.412] 11:3 Warning: 'ArrowLeft' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.412] 18:3 Warning: 'Download' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.412] 19:3 Warning: 'Eye' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.412] 20:3 Warning: 'Edit' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.412] 26:10 Warning: 'CompletionDot' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.412]
[23:19:43.412] ./src/app/templates/course-templates/certificate/page.tsx
[23:19:43.412] 7:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.413] 24:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.413]
[23:19:43.413] ./src/app/templates/course-templates/course-page/page.tsx
[23:19:43.413] 3:26 Warning: 'useEffect' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.413] 4:8 Warning: 'Link' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.413] 5:44 Warning: 'Download' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.413] 5:54 Warning: 'Smartphone' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.414] 5:66 Warning: 'Infinity' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.414] 5:76 Warning: 'Award' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.414] 5:122 Warning: 'Bookmark' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.414] 5:132 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.414] 5:157 Warning: 'Eye' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.414] 5:162 Warning: 'EyeOff' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.415] 9:26 Warning: 'TemplateSection' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.415] 9:43 Warning: 'TemplateCard' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.415] 34:17 Warning: 'profile' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:19:43.415] 375:19 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[23:19:43.415] 561:21 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[23:19:43.415] 615:21 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[23:19:43.416]
[23:19:43.416] ./src/app/templates/course-templates/lesson/page.tsx
[23:19:43.416] 18:3 Warning: 'Lock' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.416] 26:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.416] 30:10 Warning: 'completedLessons' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:19:43.416] 30:28 Warning: 'setCompletedLessons' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:19:43.417]
[23:19:43.417] ./src/app/templates/course-templates/page.tsx
[23:19:43.417] 2:10 Warning: 'memo' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.417]
[23:19:43.417] ./src/app/templates/course-templates/performance-analytics/page.tsx
[23:19:43.417] 9:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.418] 19:3 Warning: 'Calendar' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.418] 22:3 Warning: 'RefreshCw' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.418] 28:3 Warning: 'PieChart' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.418] 29:3 Warning: 'Activity' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.418] 35:10 Warning: 'selectedCourse' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:19:43.418] 35:26 Warning: 'setSelectedCourse' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:19:43.419]
[23:19:43.419] ./src/app/templates/course-templates/question-bank/page.tsx
[23:19:43.419] 9:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.419] 12:3 Warning: 'Filter' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.419] 22:3 Warning: 'XCircle' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.419] 23:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.419] 25:3 Warning: 'Calculator' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.419] 26:3 Warning: 'Lightbulb' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.419] 27:3 Warning: 'Brain' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.419] 103:9 Warning: 'questionTypes' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:19:43.419]
[23:19:43.419] ./src/app/templates/course-templates/quiz/page.tsx
[23:19:43.420] 18:3 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.420] 19:3 Warning: 'FileText' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.420] 22:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.420]
[23:19:43.420] ./src/app/templates/dashboard-templates/admin-panel/page.tsx
[23:19:43.420] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.420] 5:29 Warning: 'CardDescription' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.420] 5:46 Warning: 'CardHeader' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.421] 5:58 Warning: 'CardTitle' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.421]
[23:19:43.421] ./src/app/templates/dashboard-templates/analytics/page.tsx
[23:19:43.421] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.421] 6:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.421] 7:33 Warning: 'TrendingDown' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.421] 7:64 Warning: 'DollarSign' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.421]
[23:19:43.421] ./src/app/templates/dashboard-templates/institution-dashboard/page.tsx
[23:19:43.422] 9:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.422] 23:3 Warning: 'Upload' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.431] 26:3 Warning: 'Phone' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.431] 28:3 Warning: 'Globe' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.431] 31:3 Warning: 'PieChart' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.431] 33:3 Warning: 'Target' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.432] 34:3 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.432] 35:3 Warning: 'CheckCircle' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.432] 36:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.432] 37:3 Warning: 'UserPlus' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.432] 38:3 Warning: 'School' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.432] 39:3 Warning: 'BookMarked' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.433]
[23:19:43.433] ./src/app/templates/dashboard-templates/instructor-dashboard/page.tsx
[23:19:43.433] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.433] 5:29 Warning: 'CardDescription' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.433] 5:46 Warning: 'CardHeader' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.433] 5:58 Warning: 'CardTitle' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.433] 7:100 Warning: 'Download' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.433]
[23:19:43.433] ./src/app/templates/dashboard-templates/page.tsx
[23:19:43.434] 2:10 Warning: 'memo' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.434]
[23:19:43.434] ./src/app/templates/dashboard-templates/student-dashboard/page.tsx
[23:19:43.434] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.434] 5:29 Warning: 'CardDescription' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.434] 5:46 Warning: 'CardHeader' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.434] 5:58 Warning: 'CardTitle' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.434]
[23:19:43.434] ./src/app/templates/dashboard-templates/teacher-signup/page.tsx
[23:19:43.435] 9:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.435] 14:3 Warning: 'Phone' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.435] 15:3 Warning: 'MapPin' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.435] 17:3 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.435] 25:3 Warning: 'Trash2' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.435] 30:3 Warning: 'Users' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.436] 36:3 Warning: 'Filter' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.436] 41:10 Warning: 'formData' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:19:43.436] 41:20 Warning: 'setFormData' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:19:43.436] 133:9 Warning: 'getStatusIcon' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:19:43.436]
[23:19:43.436] ./src/app/templates/page-templates/404/page.tsx
[23:19:43.436] 7:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.436]
[23:19:43.436] ./src/app/templates/page-templates/about/page.tsx
[23:19:43.436] 4:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.436]
[23:19:43.437] ./src/app/templates/page-templates/analytics/page.tsx
[23:19:43.437] 6:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.437] 20:3 Warning: 'Filter' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.437] 21:3 Warning: 'Calendar' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.437] 23:3 Warning: 'Zap' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.437] 25:3 Warning: 'PieChart' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.437] 26:3 Warning: 'LineChart' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.438] 31:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.438] 32:3 Warning: 'CheckCircle' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.438] 34:3 Warning: 'GraduationCap' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.438] 35:3 Warning: 'MessageCircle' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.438] 36:3 Warning: 'Heart' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.438] 37:3 Warning: 'ThumbsUp' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.439] 42:10 Warning: 'selectedMetric' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:19:43.439] 42:26 Warning: 'setSelectedMetric' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:19:43.439]
[23:19:43.439] ./src/app/templates/page-templates/checkout/page.tsx
[23:19:43.439] 7:10 Warning: 'Tabs' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.439] 7:16 Warning: 'TabsContent' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.439] 7:29 Warning: 'TabsList' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.440] 7:39 Warning: 'TabsTrigger' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.440] 14:3 Warning: 'XCircle' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.440] 15:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.440] 16:3 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.440] 19:3 Warning: 'Phone' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.440] 20:3 Warning: 'MapPin' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.440] 21:3 Warning: 'Calendar' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.440] 25:3 Warning: 'Award' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.441] 27:3 Warning: 'Percent' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.441] 29:3 Warning: 'RefreshCw' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.441] 30:3 Warning: 'Eye' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.441] 31:3 Warning: 'Edit' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.441] 32:3 Warning: 'Trash2' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.441] 33:3 Warning: 'Plus' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.441] 34:3 Warning: 'Minus' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.442]
[23:19:43.442] ./src/app/templates/page-templates/contact/page.tsx
[23:19:43.442] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.442]
[23:19:43.442] ./src/app/templates/page-templates/courses-listing/page.tsx
[23:19:43.442] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.442]
[23:19:43.442] ./src/app/templates/page-templates/faq/page.tsx
[23:19:43.442] 23:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.442]
[23:19:43.443] ./src/app/templates/page-templates/faq-support/page.tsx
[23:19:43.443] 16:3 Warning: 'CheckCircle' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.443] 17:3 Warning: 'XCircle' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.443] 18:3 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.443] 19:3 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.443] 21:3 Warning: 'ThumbsDown' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.444] 23:3 Warning: 'Mail' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.444] 24:3 Warning: 'Phone' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.444] 26:3 Warning: 'Filter' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.444] 27:3 Warning: 'SortAsc' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.444] 28:3 Warning: 'SortDesc' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.444] 29:3 Warning: 'Download' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.444] 30:3 Warning: 'Upload' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.444] 32:3 Warning: 'Zap' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.444] 33:3 Warning: 'Users' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.444] 34:3 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.445] 35:3 Warning: 'Award' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.446] 37:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.446] 38:3 Warning: 'Info' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.446] 39:3 Warning: 'ExternalLink' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.446] 41:3 Warning: 'Share2' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.446] 42:3 Warning: 'Heart' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.446] 43:3 Warning: 'Flag' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.447] 44:3 Warning: 'Lock' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.447] 45:3 Warning: 'Unlock' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.447] 533:53 Warning: 'index' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.447]
[23:19:43.447] ./src/app/templates/page-templates/helpdesk/page.tsx
[23:19:43.447] 17:3 Warning: 'CheckCircle' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.447] 18:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.447] 19:3 Warning: 'FileText' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.448] 21:3 Warning: 'Filter' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.448] 22:3 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.448] 24:3 Warning: 'Archive' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.448]
[23:19:43.448] ./src/app/templates/page-templates/page.tsx
[23:19:43.448] 2:10 Warning: 'memo' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.449]
[23:19:43.449] ./src/app/templates/page-templates/password-reset/page.tsx
[23:19:43.449] 2:10 Warning: 'memo' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.449]
[23:19:43.449] ./src/app/templates/page-templates/pricing/page.tsx
[23:19:43.449] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.449] 7:28 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.449]
[23:19:43.449] ./src/app/templates/page-templates/privacy/page.tsx
[23:19:43.449] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.449] 6:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.450]
[23:19:43.450] ./src/app/templates/page-templates/refund/page.tsx
[23:19:43.450] 10:3 Warning: 'ArrowLeft' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.450] 17:3 Warning: 'Mail' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.450] 18:3 Warning: 'Phone' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.450] 19:3 Warning: 'Calendar' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.450] 25:3 Warning: 'Edit' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.451] 26:3 Warning: 'Send' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.458] 27:3 Warning: 'User' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.458] 28:3 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.458] 32:3 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.458] 33:3 Warning: 'ThumbsUp' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.459] 34:3 Warning: 'ThumbsDown' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.459] 38:10 Warning: 'refundReason' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:19:43.459] 38:24 Warning: 'setRefundReason' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:19:43.459] 39:10 Warning: 'refundAmount' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:19:43.459] 39:24 Warning: 'setRefundAmount' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:19:43.459]
[23:19:43.459] ./src/app/templates/page-templates/subscription-management/page.tsx
[23:19:43.459] 11:3 Warning: 'Calendar' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.459] 14:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.459] 17:3 Warning: 'Zap' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.460] 18:3 Warning: 'Users' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.460] 19:3 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.460] 22:3 Warning: 'Bell' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.460] 23:3 Warning: 'Shield' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.460] 24:3 Warning: 'Lock' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.460] 25:3 Warning: 'ArrowRight' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.460] 26:3 Warning: 'ArrowLeft' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.461] 28:3 Warning: 'Minus' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.461] 31:3 Warning: 'Eye' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.461] 32:3 Warning: 'RefreshCw' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.461] 34:3 Warning: 'Award' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.461] 35:3 Warning: 'Gift' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.461] 36:3 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.462]
[23:19:43.462] ./src/app/templates/page-templates/team/page.tsx
[23:19:43.462] 12:3 Warning: 'Award' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.462] 13:3 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.462] 17:3 Warning: 'Twitter' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.462] 18:3 Warning: 'Globe' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.462] 19:3 Warning: 'Calendar' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.462] 20:3 Warning: 'MapPin' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.462] 21:3 Warning: 'Phone' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.463] 23:3 Warning: 'Plus' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.463] 24:3 Warning: 'Edit' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.463] 26:3 Warning: 'Trash2' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.463] 27:3 Warning: 'Filter' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.463] 29:3 Warning: 'Heart' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.463] 30:3 Warning: 'Share2' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.463] 31:3 Warning: 'Download' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.463] 34:3 Warning: 'Zap' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.464] 37:3 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.464]
[23:19:43.464] ./src/app/templates/page-templates/terms/page.tsx
[23:19:43.464] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.464] 6:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.465]
[23:19:43.465] ./src/app/templates/page-templates/testimonials/page.tsx
[23:19:43.465] 9:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.465] 13:3 Warning: 'Users' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.465] 14:3 Warning: 'Award' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.465] 16:3 Warning: 'ThumbsDown' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.466] 17:3 Warning: 'Filter' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.466] 19:3 Warning: 'Plus' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.466] 24:3 Warning: 'XCircle' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.466] 25:3 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.466] 26:3 Warning: 'MessageCircle' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.466] 29:3 Warning: 'GraduationCap' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.467]
[23:19:43.467] ./src/app/templates/page-templates/user-profile/page.tsx
[23:19:43.467] 11:3 Warning: 'Mail' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.467] 12:3 Warning: 'Phone' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.467] 13:3 Warning: 'MapPin' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.467] 17:3 Warning: 'Camera' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.468] 19:3 Warning: 'Bell' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.468] 20:3 Warning: 'Shield' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.468] 21:3 Warning: 'Lock' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.468] 24:3 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.468] 30:3 Warning: 'Upload' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.468] 33:3 Warning: 'Minus' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.469] 35:3 Warning: 'XCircle' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.469] 36:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.469] 37:3 Warning: 'Heart' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.469] 39:3 Warning: 'MessageCircle' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.469] 40:3 Warning: 'Linkedin' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.469] 41:3 Warning: 'Twitter' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.469] 42:3 Warning: 'Globe' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.469] 43:3 Warning: 'GraduationCap' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.469] 45:3 Warning: 'Zap' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.469]
[23:19:43.470] ./src/app/templates/page.tsx
[23:19:43.470] 2:10 Warning: 'memo' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.470]
[23:19:43.470] ./src/app/templates/scale-up-templates/page.tsx
[23:19:43.470] 2:10 Warning: 'memo' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.470]
[23:19:43.471] ./src/app/terms/page.tsx
[23:19:43.471] 5:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.471]
[23:19:43.471] ./src/contexts/AuthContext.tsx
[23:19:43.471] 65:9 Warning: The 'createProfile' function makes the dependencies of useCallback Hook (at line 271) change on every render. Move it inside the useCallback callback. Alternatively, wrap the definition of 'createProfile' in its own useCallback() Hook. react-hooks/exhaustive-deps
[23:19:43.471] 124:9 Warning: The 'createFallbackProfile' function makes the dependencies of useCallback Hook (at line 271) change on every render. Move it inside the useCallback callback. Alternatively, wrap the definition of 'createFallbackProfile' in its own useCallback() Hook. react-hooks/exhaustive-deps
[23:19:43.472]
[23:19:43.472] ./src/hooks/useCourseData.ts
[23:19:43.472] 83:6 Warning: React Hook useEffect has a missing dependency: 'organizeLessonsIntoSections'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[23:19:43.472] 89:30 Warning: 'index' is defined but never used. @typescript-eslint/no-unused-vars
[23:19:43.472]
[23:19:43.472] ./src/lib/supabase/server.ts
[23:19:43.472] 40:9 Warning: 'cookieString' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:19:43.472]
[23:19:43.472] info - Need to disable some ESLint rules? Learn more here: https://nextjs.org/docs/app/api-reference/config/eslint#disabling-rules
[23:19:54.726] Failed to compile.
[23:19:54.727]
[23:19:54.727] ./src/app/api/lessons/route.ts:120:31
[23:19:54.727] Type error: Property 'course_id' does not exist on type '{ title: string; lesson_order: number; slug: string; is_preview: boolean; type: "video" | "document" | "quiz" | "assignment" | "practice"; description?: string | undefined; content?: string | undefined; duration?: string | undefined; }'.
[23:19:54.728]
[23:19:54.728] [0m [90m 118 |[39m [33m.[39m[36mfrom[39m([32m'courses'[39m)
[23:19:54.728] [90m 119 |[39m [33m.[39mselect([32m'id'[39m)
[23:19:54.728] [31m[1m>[22m[39m[90m 120 |[39m [33m.[39meq([32m'id'[39m[33m,[39m validatedData[33m.[39mcourse_id)
[23:19:54.729] [90m |[39m [31m[1m^[22m[39m
[23:19:54.729] [90m 121 |[39m [33m.[39msingle()
[23:19:54.729] [90m 122 |[39m  
[23:19:54.729] [90m 123 |[39m [36mif[39m (courseError [33m||[39m [33m![39mcourse) {[0m
[23:19:54.759] Next.js build worker exited with code: 1 and signal: null
[23:19:54.781] Error: Command "npm run build" exited with 1
