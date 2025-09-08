[23:00:37.012] Running build in Washington, D.C., USA (East) – iad1
[23:00:37.012] Build machine configuration: 2 cores, 8 GB
[23:00:37.030] Cloning github.com/viditforsv/shriarya_lms_next (Branch: main, Commit: 31be469)
[23:00:37.528] Cloning completed: 497.000ms
[23:00:41.829] Restored build cache from previous deployment (ECApGAhLLWLrknCpnzEvQVsATAMY)
[23:00:42.537] Running "vercel build"
[23:00:42.987] Vercel CLI 47.0.5
[23:00:43.339] Installing dependencies...
[23:00:44.920]
[23:00:44.921] added 9 packages in 1s
[23:00:44.921]
[23:00:44.921] 146 packages are looking for funding
[23:00:44.922] run `npm fund` for details
[23:00:44.951] Detected Next.js version: 15.5.2
[23:00:44.955] Running "npm run build"
[23:00:45.064]
[23:00:45.064] > shriarya_lms_next@0.1.0 build
[23:00:45.064] > next build
[23:00:45.065]
[23:00:46.161] ▲ Next.js 15.5.2
[23:00:46.162]
[23:00:46.271] Creating an optimized production build ...
[23:01:02.950] <w> [webpack.cache.PackFileCacheStrategy] Serializing big strings (108kiB) impacts deserialization performance (consider using Buffer instead and decode when needed)
[23:01:12.280] ✓ Compiled successfully in 23.1s
[23:01:12.287] Linting and checking validity of types ...
[23:01:25.355]
[23:01:25.355] ./src/app/api/courses/builder/route.ts
[23:01:25.355] 3:10 Warning: 'CourseTemplate' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.356] 45:19 Warning: 'profile' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:01:25.356] 45:35 Warning: 'profileError' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:01:25.356]
[23:01:25.356] ./src/app/api/courses/route.ts
[23:01:25.356] 26:7 Warning: 'LessonSchema' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:01:25.357] 37:7 Warning: 'ResourceSchema' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:01:25.357]
[23:01:25.357] ./src/app/api/courses-v2/route.ts
[23:01:25.357] 9:11 Warning: 'published' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:01:25.357] 10:11 Warning: 'category' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:01:25.357] 11:11 Warning: 'difficulty' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:01:25.358]
[23:01:25.358] ./src/app/api/lessons-v2/route.ts
[23:01:25.358] 11:11 Warning: 'published' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:01:25.358]
[23:01:25.358] ./src/app/auth/page.tsx
[23:01:25.358] 3:20 Warning: 'useEffect' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.359]
[23:01:25.359] ./src/app/components-demo/content/section-editor.tsx
[23:01:25.359] 43:6 Warning: React Hook useEffect has a missing dependency: 'fetchSections'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[23:01:25.359]
[23:01:25.359] ./src/app/components-demo/student-file-access-real.tsx
[23:01:25.359] 274:19 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[23:01:25.360]
[23:01:25.360] ./src/app/components-demo/student-file-access.tsx
[23:01:25.360] 70:6 Warning: React Hook useEffect has a missing dependency: 'mockFiles'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[23:01:25.360] 250:19 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[23:01:25.360]
[23:01:25.361] ./src/app/components-demo/ui/collapsible-sidebar.tsx
[23:01:25.361] 24:3 Warning: 'Section' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.361] 25:3 Warning: 'Chapter' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.361] 37:20 Warning: 'setSyllabus' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:01:25.361]
[23:01:25.362] ./src/app/components-demo/ui/file-upload.tsx
[23:01:25.362] 139:16 Warning: Image elements must have an alt prop, either with meaningful text, or an empty string for decorative images. jsx-a11y/alt-text
[23:01:25.362]
[23:01:25.363] ./src/app/components-demo/ui/pdf-viewer.tsx
[23:01:25.363] 226:6 Warning: React Hook useEffect has missing dependencies: 'pdfDoc' and 'useIframe'. Either include them or remove the dependency array. react-hooks/exhaustive-deps
[23:01:25.363]
[23:01:25.363] ./src/app/course-builder/page.tsx
[23:01:25.364] 16:3 Warning: 'Users' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.364] 19:3 Warning: 'Eye' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.367] 20:3 Warning: 'EyeOff' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.367] 22:3 Warning: 'Upload' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.367] 93:10 Warning: 'editingLesson' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:01:25.368] 93:25 Warning: 'setEditingLesson' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:01:25.368] 144:14 Warning: 'err' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.368] 161:14 Warning: 'err' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.368] 190:14 Warning: 'err' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.370] 215:14 Warning: 'err' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.370] 237:14 Warning: 'err' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.376]
[23:01:25.376] ./src/app/courses/[slug]/lesson/[lessonSlug]/page.tsx
[23:01:25.376] 3:31 Warning: 'memo' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.376] 9:10 Warning: 'Progress' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.376] 24:3 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.377] 26:3 Warning: 'EyeOff' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.377] 76:17 Warning: 'profile' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:01:25.377] 233:9 Warning: 'calculateProgress' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:01:25.377]
[23:01:25.377] ./src/app/dashboard/courses/[id]/edit/page.tsx
[23:01:25.377] 5:47 Warning: 'Play' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.378] 5:53 Warning: 'CheckCircle' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.378] 18:11 Warning: 'CourseBuilderProps' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.378] 43:6 Warning: React Hook useEffect has a missing dependency: 'loadCourse'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[23:01:25.378] 407:39 Warning: 'index' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.378]
[23:01:25.378] ./src/app/dashboard/courses/builder/page.tsx
[23:01:25.378] 19:3 Warning: 'Upload' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.379] 21:3 Warning: 'Video' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.379] 22:3 Warning: 'FileText' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.379] 23:3 Warning: 'CheckCircle' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.379] 26:3 Warning: 'ArrowLeft' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.379] 31:3 Warning: 'CourseStructure' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.379] 36:3 Warning: 'getTemplatesByCurriculum' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.379] 37:3 Warning: 'createCourseFromTemplate' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.380] 38:3 Warning: 'generateCourseSlug' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.380] 43:10 Warning: 'selectedTemplate' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:01:25.380] 46:10 Warning: 'isEditing' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:01:25.380]
[23:01:25.380] ./src/app/dashboard/courses/manage/page.tsx
[23:01:25.380] 14:3 Warning: 'Trash2' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.381] 16:3 Warning: 'Users' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.381] 20:3 Warning: 'Filter' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.381] 22:3 Warning: 'Play' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.381] 23:3 Warning: 'Settings' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.381] 63:6 Warning: React Hook useEffect has a missing dependency: 'fetchCourses'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[23:01:25.381]
[23:01:25.381] ./src/app/dashboard/courses/new/page.tsx
[23:01:25.382] 7:29 Warning: 'CardHeader' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.382] 7:41 Warning: 'CardTitle' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.382]
[23:01:25.382] ./src/app/dashboard/courses/page.tsx
[23:01:25.382] 33:6 Warning: React Hook useEffect has a missing dependency: 'fetchCourses'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[23:01:25.382]
[23:01:25.382] ./src/app/dashboard/courses/template-converter/page.tsx
[23:01:25.383] 18:3 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.383] 20:3 Warning: 'Settings' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.383] 22:3 Warning: 'PlayCircle' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.383] 107:15 Warning: 'result' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:01:25.383]
[23:01:25.383] ./src/app/dashboard/page.tsx
[23:01:25.383] 8:20 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.383]
[23:01:25.383] ./src/app/page.tsx
[23:01:25.391] 3:10 Warning: 'useState' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.392] 3:20 Warning: 'useEffect' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.392]
[23:01:25.392] ./src/app/privacy/page.tsx
[23:01:25.392] 5:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.392]
[23:01:25.393] ./src/app/templates/course-templates/assignments/page.tsx
[23:01:25.393] 4:8 Warning: 'Link' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.393] 8:10 Warning: 'Progress' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.393] 11:3 Warning: 'ArrowLeft' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.393] 18:3 Warning: 'Download' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.393] 19:3 Warning: 'Eye' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.395] 20:3 Warning: 'Edit' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.395] 26:10 Warning: 'CompletionDot' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.396]
[23:01:25.396] ./src/app/templates/course-templates/certificate/page.tsx
[23:01:25.396] 7:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.396] 24:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.396]
[23:01:25.396] ./src/app/templates/course-templates/course-page/page.tsx
[23:01:25.396] 3:26 Warning: 'useEffect' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.396] 4:8 Warning: 'Link' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.396] 5:44 Warning: 'Download' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.397] 5:54 Warning: 'Smartphone' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.397] 5:66 Warning: 'Infinity' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.397] 5:76 Warning: 'Award' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.397] 5:122 Warning: 'Bookmark' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.397] 5:132 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.397] 5:157 Warning: 'Eye' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.397] 5:162 Warning: 'EyeOff' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.397] 9:26 Warning: 'TemplateSection' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.398] 9:43 Warning: 'TemplateCard' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.398] 34:17 Warning: 'profile' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:01:25.398] 375:19 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[23:01:25.398] 561:21 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[23:01:25.398] 615:21 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[23:01:25.398]
[23:01:25.398] ./src/app/templates/course-templates/lesson/page.tsx
[23:01:25.398] 18:3 Warning: 'Lock' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.398] 26:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.399] 30:10 Warning: 'completedLessons' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:01:25.399] 30:28 Warning: 'setCompletedLessons' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:01:25.400]
[23:01:25.400] ./src/app/templates/course-templates/page.tsx
[23:01:25.400] 2:10 Warning: 'memo' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.400]
[23:01:25.400] ./src/app/templates/course-templates/performance-analytics/page.tsx
[23:01:25.401] 9:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.401] 19:3 Warning: 'Calendar' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.401] 22:3 Warning: 'RefreshCw' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.401] 28:3 Warning: 'PieChart' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.401] 29:3 Warning: 'Activity' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.401] 35:10 Warning: 'selectedCourse' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:01:25.401] 35:26 Warning: 'setSelectedCourse' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:01:25.401]
[23:01:25.402] ./src/app/templates/course-templates/question-bank/page.tsx
[23:01:25.402] 9:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.402] 12:3 Warning: 'Filter' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.402] 22:3 Warning: 'XCircle' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.403] 23:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.403] 25:3 Warning: 'Calculator' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.403] 26:3 Warning: 'Lightbulb' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.403] 27:3 Warning: 'Brain' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.403] 103:9 Warning: 'questionTypes' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:01:25.403]
[23:01:25.403] ./src/app/templates/course-templates/quiz/page.tsx
[23:01:25.404] 18:3 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.404] 19:3 Warning: 'FileText' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.404] 22:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.404]
[23:01:25.404] ./src/app/templates/dashboard-templates/admin-panel/page.tsx
[23:01:25.404] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.404] 5:29 Warning: 'CardDescription' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.405] 5:46 Warning: 'CardHeader' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.405] 5:58 Warning: 'CardTitle' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.405]
[23:01:25.405] ./src/app/templates/dashboard-templates/analytics/page.tsx
[23:01:25.405] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.405] 6:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.405] 7:33 Warning: 'TrendingDown' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.405] 7:64 Warning: 'DollarSign' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.406]
[23:01:25.406] ./src/app/templates/dashboard-templates/institution-dashboard/page.tsx
[23:01:25.406] 9:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.406] 23:3 Warning: 'Upload' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.413] 26:3 Warning: 'Phone' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.414] 28:3 Warning: 'Globe' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.414] 31:3 Warning: 'PieChart' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.414] 33:3 Warning: 'Target' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.414] 34:3 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.414] 35:3 Warning: 'CheckCircle' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.414] 36:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.414] 37:3 Warning: 'UserPlus' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.415] 38:3 Warning: 'School' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.415] 39:3 Warning: 'BookMarked' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.415]
[23:01:25.415] ./src/app/templates/dashboard-templates/instructor-dashboard/page.tsx
[23:01:25.415] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.416] 5:29 Warning: 'CardDescription' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.416] 5:46 Warning: 'CardHeader' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.416] 5:58 Warning: 'CardTitle' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.416] 7:100 Warning: 'Download' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.417]
[23:01:25.417] ./src/app/templates/dashboard-templates/page.tsx
[23:01:25.417] 2:10 Warning: 'memo' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.417]
[23:01:25.417] ./src/app/templates/dashboard-templates/student-dashboard/page.tsx
[23:01:25.417] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.417] 5:29 Warning: 'CardDescription' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.417] 5:46 Warning: 'CardHeader' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.418] 5:58 Warning: 'CardTitle' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.418]
[23:01:25.418] ./src/app/templates/dashboard-templates/teacher-signup/page.tsx
[23:01:25.418] 9:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.418] 14:3 Warning: 'Phone' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.419] 15:3 Warning: 'MapPin' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.419] 17:3 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.419] 25:3 Warning: 'Trash2' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.419] 30:3 Warning: 'Users' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.419] 36:3 Warning: 'Filter' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.419] 41:10 Warning: 'formData' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:01:25.419] 41:20 Warning: 'setFormData' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:01:25.420] 133:9 Warning: 'getStatusIcon' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:01:25.420]
[23:01:25.420] ./src/app/templates/page-templates/404/page.tsx
[23:01:25.420] 7:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.420]
[23:01:25.421] ./src/app/templates/page-templates/about/page.tsx
[23:01:25.421] 4:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.421]
[23:01:25.421] ./src/app/templates/page-templates/analytics/page.tsx
[23:01:25.421] 6:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.421] 20:3 Warning: 'Filter' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.422] 21:3 Warning: 'Calendar' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.422] 23:3 Warning: 'Zap' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.422] 25:3 Warning: 'PieChart' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.422] 26:3 Warning: 'LineChart' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.422] 31:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.422] 32:3 Warning: 'CheckCircle' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.423] 34:3 Warning: 'GraduationCap' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.423] 35:3 Warning: 'MessageCircle' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.423] 36:3 Warning: 'Heart' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.423] 37:3 Warning: 'ThumbsUp' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.423] 42:10 Warning: 'selectedMetric' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:01:25.424] 42:26 Warning: 'setSelectedMetric' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:01:25.424]
[23:01:25.424] ./src/app/templates/page-templates/checkout/page.tsx
[23:01:25.424] 7:10 Warning: 'Tabs' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.424] 7:16 Warning: 'TabsContent' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.424] 7:29 Warning: 'TabsList' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.425] 7:39 Warning: 'TabsTrigger' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.425] 14:3 Warning: 'XCircle' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.425] 15:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.425] 16:3 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.426] 19:3 Warning: 'Phone' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.426] 20:3 Warning: 'MapPin' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.426] 21:3 Warning: 'Calendar' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.426] 25:3 Warning: 'Award' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.427] 27:3 Warning: 'Percent' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.427] 29:3 Warning: 'RefreshCw' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.427] 30:3 Warning: 'Eye' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.427] 31:3 Warning: 'Edit' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.427] 32:3 Warning: 'Trash2' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.428] 33:3 Warning: 'Plus' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.428] 34:3 Warning: 'Minus' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.428]
[23:01:25.428] ./src/app/templates/page-templates/contact/page.tsx
[23:01:25.428] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.428]
[23:01:25.428] ./src/app/templates/page-templates/courses-listing/page.tsx
[23:01:25.428] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.429]
[23:01:25.429] ./src/app/templates/page-templates/faq/page.tsx
[23:01:25.429] 23:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.429]
[23:01:25.429] ./src/app/templates/page-templates/faq-support/page.tsx
[23:01:25.430] 16:3 Warning: 'CheckCircle' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.430] 17:3 Warning: 'XCircle' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.430] 18:3 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.430] 19:3 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.431] 21:3 Warning: 'ThumbsDown' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.441] 23:3 Warning: 'Mail' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.441] 24:3 Warning: 'Phone' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.441] 26:3 Warning: 'Filter' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.441] 27:3 Warning: 'SortAsc' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.441] 28:3 Warning: 'SortDesc' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.442] 29:3 Warning: 'Download' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.442] 30:3 Warning: 'Upload' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.442] 32:3 Warning: 'Zap' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.442] 33:3 Warning: 'Users' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.442] 34:3 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.443] 35:3 Warning: 'Award' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.443] 37:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.443] 38:3 Warning: 'Info' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.443] 39:3 Warning: 'ExternalLink' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.444] 41:3 Warning: 'Share2' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.444] 42:3 Warning: 'Heart' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.444] 43:3 Warning: 'Flag' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.444] 44:3 Warning: 'Lock' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.445] 45:3 Warning: 'Unlock' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.445] 533:53 Warning: 'index' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.445]
[23:01:25.445] ./src/app/templates/page-templates/helpdesk/page.tsx
[23:01:25.446] 17:3 Warning: 'CheckCircle' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.446] 18:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.446] 19:3 Warning: 'FileText' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.446] 21:3 Warning: 'Filter' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.447] 22:3 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.447] 24:3 Warning: 'Archive' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.447]
[23:01:25.447] ./src/app/templates/page-templates/page.tsx
[23:01:25.447] 2:10 Warning: 'memo' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.447]
[23:01:25.447] ./src/app/templates/page-templates/password-reset/page.tsx
[23:01:25.447] 2:10 Warning: 'memo' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.448]
[23:01:25.448] ./src/app/templates/page-templates/pricing/page.tsx
[23:01:25.448] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.448] 7:28 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.448]
[23:01:25.448] ./src/app/templates/page-templates/privacy/page.tsx
[23:01:25.448] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.448] 6:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.448]
[23:01:25.448] ./src/app/templates/page-templates/refund/page.tsx
[23:01:25.449] 10:3 Warning: 'ArrowLeft' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.449] 17:3 Warning: 'Mail' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.449] 18:3 Warning: 'Phone' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.449] 19:3 Warning: 'Calendar' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.449] 25:3 Warning: 'Edit' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.449] 26:3 Warning: 'Send' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.450] 27:3 Warning: 'User' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.450] 28:3 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.450] 32:3 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.450] 33:3 Warning: 'ThumbsUp' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.450] 34:3 Warning: 'ThumbsDown' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.450] 38:10 Warning: 'refundReason' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:01:25.451] 38:24 Warning: 'setRefundReason' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:01:25.451] 39:10 Warning: 'refundAmount' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:01:25.451] 39:24 Warning: 'setRefundAmount' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:01:25.451]
[23:01:25.451] ./src/app/templates/page-templates/subscription-management/page.tsx
[23:01:25.451] 11:3 Warning: 'Calendar' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.452] 14:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.453] 17:3 Warning: 'Zap' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.453] 18:3 Warning: 'Users' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.453] 19:3 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.453] 22:3 Warning: 'Bell' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.453] 23:3 Warning: 'Shield' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.454] 24:3 Warning: 'Lock' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.454] 25:3 Warning: 'ArrowRight' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.454] 26:3 Warning: 'ArrowLeft' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.454] 28:3 Warning: 'Minus' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.454] 31:3 Warning: 'Eye' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.455] 32:3 Warning: 'RefreshCw' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.455] 34:3 Warning: 'Award' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.455] 35:3 Warning: 'Gift' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.455] 36:3 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.455]
[23:01:25.455] ./src/app/templates/page-templates/team/page.tsx
[23:01:25.456] 12:3 Warning: 'Award' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.456] 13:3 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.456] 17:3 Warning: 'Twitter' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.456] 18:3 Warning: 'Globe' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.456] 19:3 Warning: 'Calendar' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.456] 20:3 Warning: 'MapPin' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.457] 21:3 Warning: 'Phone' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.457] 23:3 Warning: 'Plus' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.457] 24:3 Warning: 'Edit' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.457] 26:3 Warning: 'Trash2' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.457] 27:3 Warning: 'Filter' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.457] 29:3 Warning: 'Heart' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.458] 30:3 Warning: 'Share2' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.458] 31:3 Warning: 'Download' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.458] 34:3 Warning: 'Zap' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.458] 37:3 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.458]
[23:01:25.458] ./src/app/templates/page-templates/terms/page.tsx
[23:01:25.458] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.458] 6:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.458]
[23:01:25.458] ./src/app/templates/page-templates/testimonials/page.tsx
[23:01:25.459] 9:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.459] 13:3 Warning: 'Users' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.459] 14:3 Warning: 'Award' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.459] 16:3 Warning: 'ThumbsDown' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.459] 17:3 Warning: 'Filter' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.459] 19:3 Warning: 'Plus' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.459] 24:3 Warning: 'XCircle' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.460] 25:3 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.460] 26:3 Warning: 'MessageCircle' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.460] 29:3 Warning: 'GraduationCap' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.461]
[23:01:25.461] ./src/app/templates/page-templates/user-profile/page.tsx
[23:01:25.462] 11:3 Warning: 'Mail' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.462] 12:3 Warning: 'Phone' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.462] 13:3 Warning: 'MapPin' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.462] 17:3 Warning: 'Camera' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.462] 19:3 Warning: 'Bell' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.463] 20:3 Warning: 'Shield' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.463] 21:3 Warning: 'Lock' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.463] 24:3 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.463] 30:3 Warning: 'Upload' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.463] 33:3 Warning: 'Minus' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.463] 35:3 Warning: 'XCircle' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.471] 36:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.471] 37:3 Warning: 'Heart' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.471] 39:3 Warning: 'MessageCircle' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.471] 40:3 Warning: 'Linkedin' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.472] 41:3 Warning: 'Twitter' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.472] 42:3 Warning: 'Globe' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.472] 43:3 Warning: 'GraduationCap' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.472] 45:3 Warning: 'Zap' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.472]
[23:01:25.472] ./src/app/templates/page.tsx
[23:01:25.472] 2:10 Warning: 'memo' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.473]
[23:01:25.473] ./src/app/templates/scale-up-templates/page.tsx
[23:01:25.473] 2:10 Warning: 'memo' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.473]
[23:01:25.473] ./src/app/terms/page.tsx
[23:01:25.473] 5:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.474]
[23:01:25.474] ./src/contexts/AuthContext.tsx
[23:01:25.474] 161:6 Warning: React Hook useCallback has missing dependencies: 'createFallbackProfile' and 'createProfile'. Either include them or remove the dependency array. react-hooks/exhaustive-deps
[23:01:25.474]
[23:01:25.474] ./src/hooks/useCourseData.ts
[23:01:25.474] 83:6 Warning: React Hook useEffect has a missing dependency: 'organizeLessonsIntoSections'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[23:01:25.475] 89:30 Warning: 'index' is defined but never used. @typescript-eslint/no-unused-vars
[23:01:25.475]
[23:01:25.475] ./src/lib/supabase/server.ts
[23:01:25.475] 40:9 Warning: 'cookieString' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:01:25.475]
[23:01:25.475] info - Need to disable some ESLint rules? Learn more here: https://nextjs.org/docs/app/api-reference/config/eslint#disabling-rules
[23:01:35.831] Failed to compile.
[23:01:35.831]
[23:01:35.831] ./src/app/api/courses-v2/route.ts:81:8
[23:01:35.831] Type error: Property 'from' does not exist on type 'Promise<SupabaseClient<any, "public", "public", any, any>>'.
[23:01:35.831]
[23:01:35.831] [0m [90m 79 |[39m [90m// Check if slug already exists[39m
[23:01:35.831] [90m 80 |[39m [36mconst[39m { data[33m:[39m existingCourse } [33m=[39m [36mawait[39m supabase
[23:01:35.831] [31m[1m>[22m[39m[90m 81 |[39m [33m.[39m[36mfrom[39m([32m'courses'[39m)
[23:01:35.831] [90m |[39m [31m[1m^[22m[39m
[23:01:35.831] [90m 82 |[39m [33m.[39mselect([32m'id'[39m)
[23:01:35.831] [90m 83 |[39m [33m.[39meq([32m'slug'[39m[33m,[39m slug)
[23:01:35.831] [90m 84 |[39m [33m.[39msingle()[0m
[23:01:35.865] Next.js build worker exited with code: 1 and signal: null
[23:01:35.886] Error: Command "npm run build" exited with 1
