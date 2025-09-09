[16:25:44.010] Running build in Washington, D.C., USA (East) – iad1
[16:25:44.010] Build machine configuration: 2 cores, 8 GB
[16:25:44.056] Cloning github.com/viditforsv/shriarya*lms_next (Branch: dev, Commit: 3e11d9b)
[16:25:44.781] Cloning completed: 725.000ms
[16:25:47.404] Restored build cache from previous deployment (GEVDRazvaEgyNDFwTYvCsLhgwBSw)
[16:25:47.929] Running "vercel build"
[16:25:48.341] Vercel CLI 47.0.5
[16:25:48.661] Installing dependencies...
[16:25:49.914]
[16:25:49.914] up to date in 1s
[16:25:49.915]
[16:25:49.915] 146 packages are looking for funding
[16:25:49.915] run `npm fund` for details
[16:25:49.945] Detected Next.js version: 15.5.2
[16:25:49.949] Running "npm run build"
[16:25:50.053]
[16:25:50.053] > shriarya_lms_next@0.1.0 build
[16:25:50.053] > next build
[16:25:50.054]
[16:25:51.108] ▲ Next.js 15.5.2
[16:25:51.109]
[16:25:51.210] Creating an optimized production build ...
[16:26:10.982] ✓ Compiled successfully in 16.9s
[16:26:10.988] Linting and checking validity of types ...
[16:26:23.746]
[16:26:23.746] ./src/app/api/courses/builder/route.ts
[16:26:23.746] 3:10 Warning: 'CourseTemplate' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.746] 45:19 Warning: 'profile' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:26:23.746] 45:35 Warning: 'profileError' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:26:23.746]
[16:26:23.746] ./src/app/api/courses/route.ts
[16:26:23.746] 26:7 Warning: 'LessonSchema' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:26:23.746] 37:7 Warning: 'ResourceSchema' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:26:23.746]
[16:26:23.746] ./src/app/api/courses-v2/route.ts
[16:26:23.746] 8:13 Warning: 'searchParams' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:26:23.747]
[16:26:23.747] ./src/app/api/lessons-v2/route.ts
[16:26:23.747] 11:11 Warning: 'published' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:26:23.747]
[16:26:23.747] ./src/app/auth/reset-password/page.tsx
[16:26:23.747] 23:9 Warning: 'searchParams' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:26:23.747]
[16:26:23.747] ./src/app/components-demo/content/section-editor.tsx
[16:26:23.747] 43:6 Warning: React Hook useEffect has a missing dependency: 'fetchSections'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[16:26:23.747]
[16:26:23.747] ./src/app/components-demo/ui/collapsible-sidebar.tsx
[16:26:23.747] 24:3 Warning: 'Section' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.747] 25:3 Warning: 'Chapter' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.747] 37:20 Warning: 'setSyllabus' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:26:23.747]
[16:26:23.747] ./src/app/components-demo/ui/file-upload.tsx
[16:26:23.747] 139:16 Warning: Image elements must have an alt prop, either with meaningful text, or an empty string for decorative images. jsx-a11y/alt-text
[16:26:23.747]
[16:26:23.747] ./src/app/components-demo/ui/pdf-viewer.tsx
[16:26:23.748] 226:6 Warning: React Hook useEffect has missing dependencies: 'pdfDoc' and 'useIframe'. Either include them or remove the dependency array. react-hooks/exhaustive-deps
[16:26:23.748]
[16:26:23.748] ./src/app/course-builder/page.tsx
[16:26:23.748] 139:18 Warning: '*' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.748] 156:18 Warning: '_' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.748] 185:18 Warning: '_' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.748] 210:18 Warning: '_' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.748] 232:18 Warning: '_' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.748]
[16:26:23.748] ./src/app/dashboard/courses/[id]/edit/page.tsx
[16:26:23.748] 5:47 Warning: 'Play' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.748] 5:53 Warning: 'CheckCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.748] 18:11 Warning: 'CourseBuilderProps' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.748] 407:39 Warning: 'index' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.749]
[16:26:23.749] ./src/app/dashboard/courses/template-converter/page.tsx
[16:26:23.749] 104:15 Warning: 'result' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:26:23.749]
[16:26:23.749] ./src/app/templates/.eslintrc.js
[16:26:23.749] 1:1 Warning: Unused eslint-disable directive (no problems were reported from '@typescript-eslint/no-unused-vars').
[16:26:23.757] 2:1 Warning: Unused eslint-disable directive (no problems were reported from 'react-hooks/exhaustive-deps').
[16:26:23.757] 3:1 Warning: Unused eslint-disable directive (no problems were reported from '@next/next/no-img-element').
[16:26:23.757] 4:1 Warning: Unused eslint-disable directive (no problems were reported from 'jsx-a11y/alt-text').
[16:26:23.757]
[16:26:23.758] ./src/app/templates/course-templates/assignments/page.tsx
[16:26:23.758] 4:8 Warning: 'Link' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.758] 8:10 Warning: 'Progress' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.758] 11:3 Warning: 'ArrowLeft' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.758] 18:3 Warning: 'Download' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.761] 19:3 Warning: 'Eye' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.761] 20:3 Warning: 'Edit' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.761] 26:10 Warning: 'CompletionDot' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.761]
[16:26:23.761] ./src/app/templates/course-templates/certificate/page.tsx
[16:26:23.761] 7:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.761] 24:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.761]
[16:26:23.761] ./src/app/templates/course-templates/course-page/page.tsx
[16:26:23.761] 3:26 Warning: 'useEffect' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.761] 4:8 Warning: 'Link' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.762] 5:44 Warning: 'Download' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.762] 5:54 Warning: 'Smartphone' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.762] 5:66 Warning: 'Infinity' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.762] 5:76 Warning: 'Award' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.762] 5:122 Warning: 'Bookmark' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.762] 5:132 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.762] 5:157 Warning: 'Eye' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.762] 5:162 Warning: 'EyeOff' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.763] 9:26 Warning: 'TemplateSection' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.763] 9:43 Warning: 'TemplateCard' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.763] 34:17 Warning: 'profile' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:26:23.763] 375:19 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[16:26:23.763] 561:21 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[16:26:23.763] 615:21 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[16:26:23.763]
[16:26:23.763] ./src/app/templates/course-templates/lesson/page.tsx
[16:26:23.763] 18:3 Warning: 'Lock' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.763] 26:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.764] 30:10 Warning: 'completedLessons' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:26:23.764] 30:28 Warning: 'setCompletedLessons' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:26:23.764]
[16:26:23.764] ./src/app/templates/course-templates/page.tsx
[16:26:23.764] 2:10 Warning: 'memo' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.764]
[16:26:23.764] ./src/app/templates/course-templates/performance-analytics/page.tsx
[16:26:23.764] 9:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.764] 19:3 Warning: 'Calendar' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.764] 22:3 Warning: 'RefreshCw' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.764] 28:3 Warning: 'PieChart' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.764] 29:3 Warning: 'Activity' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.764] 35:10 Warning: 'selectedCourse' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:26:23.764] 35:26 Warning: 'setSelectedCourse' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:26:23.764]
[16:26:23.764] ./src/app/templates/course-templates/question-bank/page.tsx
[16:26:23.764] 9:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.764] 12:3 Warning: 'Filter' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.764] 22:3 Warning: 'XCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.764] 23:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.764] 25:3 Warning: 'Calculator' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.764] 26:3 Warning: 'Lightbulb' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.764] 27:3 Warning: 'Brain' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.764] 103:9 Warning: 'questionTypes' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:26:23.764]
[16:26:23.764] ./src/app/templates/course-templates/quiz/page.tsx
[16:26:23.764] 18:3 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.764] 19:3 Warning: 'FileText' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.765] 22:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.765]
[16:26:23.765] ./src/app/templates/dashboard-templates/admin-panel/page.tsx
[16:26:23.765] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.765] 5:29 Warning: 'CardDescription' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.765] 5:46 Warning: 'CardHeader' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.765] 5:58 Warning: 'CardTitle' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.765]
[16:26:23.765] ./src/app/templates/dashboard-templates/analytics/page.tsx
[16:26:23.765] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.765] 6:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.765] 7:33 Warning: 'TrendingDown' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.765] 7:64 Warning: 'DollarSign' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.765]
[16:26:23.765] ./src/app/templates/dashboard-templates/institution-dashboard/page.tsx
[16:26:23.765] 9:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.765] 23:3 Warning: 'Upload' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.765] 26:3 Warning: 'Phone' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.765] 28:3 Warning: 'Globe' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.765] 31:3 Warning: 'PieChart' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.765] 33:3 Warning: 'Target' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.765] 34:3 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.765] 35:3 Warning: 'CheckCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.765] 36:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.765] 37:3 Warning: 'UserPlus' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.765] 38:3 Warning: 'School' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.765] 39:3 Warning: 'BookMarked' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.765]
[16:26:23.765] ./src/app/templates/dashboard-templates/instructor-dashboard/page.tsx
[16:26:23.765] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.766] 5:29 Warning: 'CardDescription' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.766] 5:46 Warning: 'CardHeader' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.766] 5:58 Warning: 'CardTitle' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.766] 7:100 Warning: 'Download' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.766]
[16:26:23.766] ./src/app/templates/dashboard-templates/page.tsx
[16:26:23.766] 2:10 Warning: 'memo' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.766]
[16:26:23.774] ./src/app/templates/dashboard-templates/student-dashboard/page.tsx
[16:26:23.774] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.774] 5:29 Warning: 'CardDescription' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.774] 5:46 Warning: 'CardHeader' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.775] 5:58 Warning: 'CardTitle' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.775]
[16:26:23.775] ./src/app/templates/dashboard-templates/teacher-signup/page.tsx
[16:26:23.775] 9:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.775] 14:3 Warning: 'Phone' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.775] 15:3 Warning: 'MapPin' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.775] 17:3 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.775] 25:3 Warning: 'Trash2' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.775] 30:3 Warning: 'Users' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.775] 36:3 Warning: 'Filter' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.775] 41:10 Warning: 'formData' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:26:23.775] 41:20 Warning: 'setFormData' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:26:23.775] 133:9 Warning: 'getStatusIcon' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:26:23.775]
[16:26:23.775] ./src/app/templates/page-templates/404/page.tsx
[16:26:23.775] 7:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.775]
[16:26:23.775] ./src/app/templates/page-templates/about/page.tsx
[16:26:23.775] 4:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.775]
[16:26:23.775] ./src/app/templates/page-templates/analytics/page.tsx
[16:26:23.775] 6:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.775] 20:3 Warning: 'Filter' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.776] 21:3 Warning: 'Calendar' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.776] 23:3 Warning: 'Zap' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.776] 25:3 Warning: 'PieChart' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.776] 26:3 Warning: 'LineChart' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.776] 31:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.776] 32:3 Warning: 'CheckCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.776] 34:3 Warning: 'GraduationCap' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.776] 35:3 Warning: 'MessageCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.776] 36:3 Warning: 'Heart' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.776] 37:3 Warning: 'ThumbsUp' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.776] 42:10 Warning: 'selectedMetric' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:26:23.776] 42:26 Warning: 'setSelectedMetric' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:26:23.776]
[16:26:23.780] ./src/app/templates/page-templates/checkout/page.tsx
[16:26:23.780] 7:10 Warning: 'Tabs' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.780] 7:16 Warning: 'TabsContent' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.781] 7:29 Warning: 'TabsList' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.781] 7:39 Warning: 'TabsTrigger' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.781] 14:3 Warning: 'XCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.781] 15:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.782] 16:3 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.782] 19:3 Warning: 'Phone' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.782] 20:3 Warning: 'MapPin' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.783] 21:3 Warning: 'Calendar' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.783] 25:3 Warning: 'Award' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.783] 27:3 Warning: 'Percent' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.783] 29:3 Warning: 'RefreshCw' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.791] 30:3 Warning: 'Eye' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.791] 31:3 Warning: 'Edit' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.792] 32:3 Warning: 'Trash2' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.792] 33:3 Warning: 'Plus' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.792] 34:3 Warning: 'Minus' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.792]
[16:26:23.793] ./src/app/templates/page-templates/contact/page.tsx
[16:26:23.793] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.793]
[16:26:23.793] ./src/app/templates/page-templates/courses-listing/page.tsx
[16:26:23.793] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.794]
[16:26:23.794] ./src/app/templates/page-templates/faq/page.tsx
[16:26:23.794] 23:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.795]
[16:26:23.795] ./src/app/templates/page-templates/faq-support/page.tsx
[16:26:23.795] 16:3 Warning: 'CheckCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.795] 17:3 Warning: 'XCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.796] 18:3 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.796] 19:3 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.796] 21:3 Warning: 'ThumbsDown' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.796] 23:3 Warning: 'Mail' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.797] 24:3 Warning: 'Phone' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.797] 26:3 Warning: 'Filter' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.797] 27:3 Warning: 'SortAsc' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.797] 28:3 Warning: 'SortDesc' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.798] 29:3 Warning: 'Download' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.798] 30:3 Warning: 'Upload' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.798] 32:3 Warning: 'Zap' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.799] 33:3 Warning: 'Users' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.799] 34:3 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.799] 35:3 Warning: 'Award' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.799] 37:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.800] 38:3 Warning: 'Info' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.800] 39:3 Warning: 'ExternalLink' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.800] 41:3 Warning: 'Share2' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.800] 42:3 Warning: 'Heart' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.801] 43:3 Warning: 'Flag' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.801] 44:3 Warning: 'Lock' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.801] 45:3 Warning: 'Unlock' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.802] 533:53 Warning: 'index' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.802]
[16:26:23.802] ./src/app/templates/page-templates/helpdesk/page.tsx
[16:26:23.802] 17:3 Warning: 'CheckCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.803] 18:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.803] 19:3 Warning: 'FileText' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.803] 21:3 Warning: 'Filter' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.803] 22:3 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.804] 24:3 Warning: 'Archive' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.804]
[16:26:23.804] ./src/app/templates/page-templates/page.tsx
[16:26:23.804] 2:10 Warning: 'memo' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.805]
[16:26:23.805] ./src/app/templates/page-templates/password-reset/page.tsx
[16:26:23.805] 2:10 Warning: 'memo' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.817]
[16:26:23.817] ./src/app/templates/page-templates/pricing/page.tsx
[16:26:23.818] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.818] 7:28 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.818]
[16:26:23.819] ./src/app/templates/page-templates/privacy/page.tsx
[16:26:23.819] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.819] 6:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.820]
[16:26:23.820] ./src/app/templates/page-templates/refund/page.tsx
[16:26:23.820] 10:3 Warning: 'ArrowLeft' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.820] 17:3 Warning: 'Mail' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.821] 18:3 Warning: 'Phone' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.821] 19:3 Warning: 'Calendar' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.821] 25:3 Warning: 'Edit' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.821] 26:3 Warning: 'Send' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.822] 27:3 Warning: 'User' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.822] 28:3 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.822] 32:3 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.823] 33:3 Warning: 'ThumbsUp' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.823] 34:3 Warning: 'ThumbsDown' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.823] 38:10 Warning: 'refundReason' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:26:23.823] 38:24 Warning: 'setRefundReason' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:26:23.824] 39:10 Warning: 'refundAmount' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:26:23.826] 39:24 Warning: 'setRefundAmount' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:26:23.826]
[16:26:23.826] ./src/app/templates/page-templates/subscription-management/page.tsx
[16:26:23.826] 11:3 Warning: 'Calendar' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.826] 14:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.826] 17:3 Warning: 'Zap' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.826] 18:3 Warning: 'Users' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.827] 19:3 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.827] 22:3 Warning: 'Bell' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.827] 23:3 Warning: 'Shield' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.827] 24:3 Warning: 'Lock' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.827] 25:3 Warning: 'ArrowRight' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.829] 26:3 Warning: 'ArrowLeft' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.829] 28:3 Warning: 'Minus' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.829] 31:3 Warning: 'Eye' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.829] 32:3 Warning: 'RefreshCw' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.829] 34:3 Warning: 'Award' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.829] 35:3 Warning: 'Gift' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.829] 36:3 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.829]
[16:26:23.829] ./src/app/templates/page-templates/team/page.tsx
[16:26:23.829] 12:3 Warning: 'Award' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.829] 13:3 Warning: 'BookOpen' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.829] 17:3 Warning: 'Twitter' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.829] 18:3 Warning: 'Globe' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.829] 19:3 Warning: 'Calendar' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.829] 20:3 Warning: 'MapPin' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.829] 21:3 Warning: 'Phone' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.829] 23:3 Warning: 'Plus' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.829] 24:3 Warning: 'Edit' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.829] 26:3 Warning: 'Trash2' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.829] 27:3 Warning: 'Filter' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.829] 29:3 Warning: 'Heart' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.829] 30:3 Warning: 'Share2' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.829] 31:3 Warning: 'Download' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.829] 34:3 Warning: 'Zap' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.829] 37:3 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.829]
[16:26:23.829] ./src/app/templates/page-templates/terms/page.tsx
[16:26:23.829] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.829] 6:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.829]
[16:26:23.829] ./src/app/templates/page-templates/testimonials/page.tsx
[16:26:23.829] 9:10 Warning: 'TemplateLayout' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.829] 13:3 Warning: 'Users' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.830] 14:3 Warning: 'Award' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.830] 16:3 Warning: 'ThumbsDown' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.830] 17:3 Warning: 'Filter' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.830] 19:3 Warning: 'Plus' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.830] 24:3 Warning: 'XCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.830] 25:3 Warning: 'Clock' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.830] 26:3 Warning: 'MessageCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.830] 29:3 Warning: 'GraduationCap' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.830]
[16:26:23.830] ./src/app/templates/page-templates/user-profile/page.tsx
[16:26:23.830] 11:3 Warning: 'Mail' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.830] 12:3 Warning: 'Phone' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.830] 13:3 Warning: 'MapPin' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.830] 17:3 Warning: 'Camera' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.830] 19:3 Warning: 'Bell' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.830] 20:3 Warning: 'Shield' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.830] 21:3 Warning: 'Lock' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.830] 24:3 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.830] 30:3 Warning: 'Upload' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.830] 33:3 Warning: 'Minus' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.830] 35:3 Warning: 'XCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.830] 36:3 Warning: 'AlertCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.831] 37:3 Warning: 'Heart' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.831] 39:3 Warning: 'MessageCircle' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.831] 40:3 Warning: 'Linkedin' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.831] 41:3 Warning: 'Twitter' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.831] 42:3 Warning: 'Globe' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.831] 43:3 Warning: 'GraduationCap' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.831] 45:3 Warning: 'Zap' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.831]
[16:26:23.831] ./src/app/templates/page.tsx
[16:26:23.831] 2:10 Warning: 'memo' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.831]
[16:26:23.831] ./src/app/templates/scale-up-templates/page.tsx
[16:26:23.831] 2:10 Warning: 'memo' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.831]
[16:26:23.831] ./src/contexts/AuthContext.tsx
[16:26:23.831] 64:6 Warning: React Hook useEffect has a missing dependency: 'profile'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[16:26:23.831] 67:9 Warning: The 'createProfile' function makes the dependencies of useCallback Hook (at line 273) change on every render. Move it inside the useCallback callback. Alternatively, wrap the definition of 'createProfile' in its own useCallback() Hook. react-hooks/exhaustive-deps
[16:26:23.831] 126:9 Warning: The 'createFallbackProfile' function makes the dependencies of useCallback Hook (at line 273) change on every render. Move it inside the useCallback callback. Alternatively, wrap the definition of 'createFallbackProfile' in its own useCallback() Hook. react-hooks/exhaustive-deps
[16:26:23.831] 277:9 Warning: The 'hasPermission' function makes the dependencies of useMemo Hook (at line 568) change on every render. To fix this, wrap the definition of 'hasPermission' in its own useCallback() Hook. react-hooks/exhaustive-deps
[16:26:23.831] 301:9 Warning: The 'updateUserRole' function makes the dependencies of useMemo Hook (at line 568) change on every render. Move it inside the useMemo callback. Alternatively, wrap the definition of 'updateUserRole' in its own useCallback() Hook. react-hooks/exhaustive-deps
[16:26:23.831] 342:9 Warning: The 'refreshProfile' function makes the dependencies of useMemo Hook (at line 568) change on every render. To fix this, wrap the definition of 'refreshProfile' in its own useCallback() Hook. react-hooks/exhaustive-deps
[16:26:23.832] 455:9 Warning: The 'signIn' function makes the dependencies of useMemo Hook (at line 568) change on every render. Move it inside the useMemo callback. Alternatively, wrap the definition of 'signIn' in its own useCallback() Hook. react-hooks/exhaustive-deps
[16:26:23.832] 463:9 Warning: The 'signUp' function makes the dependencies of useMemo Hook (at line 568) change on every render. Move it inside the useMemo callback. Alternatively, wrap the definition of 'signUp' in its own useCallback() Hook. react-hooks/exhaustive-deps
[16:26:23.832] 477:9 Warning: The 'signOut' function makes the dependencies of useMemo Hook (at line 568) change on every render. Move it inside the useMemo callback. Alternatively, wrap the definition of 'signOut' in its own useCallback() Hook. react-hooks/exhaustive-deps
[16:26:23.832] 507:9 Warning: The 'signInWithGoogle' function makes the dependencies of useMemo Hook (at line 568) change on every render. Move it inside the useMemo callback. Alternatively, wrap the definition of 'signInWithGoogle' in its own useCallback() Hook. react-hooks/exhaustive-deps
[16:26:23.832] 540:9 Warning: The 'resetPassword' function makes the dependencies of useMemo Hook (at line 568) change on every render. Move it inside the useMemo callback. Alternatively, wrap the definition of 'resetPassword' in its own useCallback() Hook. react-hooks/exhaustive-deps
[16:26:23.832] 547:9 Warning: The 'updatePassword' function makes the dependencies of useMemo Hook (at line 568) change on every render. Move it inside the useMemo callback. Alternatively, wrap the definition of 'updatePassword' in its own useCallback() Hook. react-hooks/exhaustive-deps
[16:26:23.832]
[16:26:23.832] ./src/hooks/useCourseData.ts
[16:26:23.832] 83:6 Warning: React Hook useEffect has a missing dependency: 'organizeLessonsIntoSections'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
[16:26:23.832] 89:30 Warning: 'index' is defined but never used. @typescript-eslint/no-unused-vars
[16:26:23.832]
[16:26:23.832] ./src/lib/supabase/server.ts
[16:26:23.832] 40:9 Warning: 'cookieString' is assigned a value but never used. @typescript-eslint/no-unused-vars
[16:26:23.832]
[16:26:23.832] info - Need to disable some ESLint rules? Learn more here: https://nextjs.org/docs/app/api-reference/config/eslint#disabling-rules
[16:26:34.035] Failed to compile.
[16:26:34.036]
[16:26:34.036] ./src/app/dashboard/courses/[id]/edit/page.tsx:43:23
[16:26:34.036] Type error: Block-scoped variable 'loadCourse' used before its declaration.
[16:26:34.036]
[16:26:34.036] [0m [90m 41 |[39m [36mif[39m ([33m![39mresolvedParams) [36mreturn[39m
[16:26:34.036] [90m 42 |[39m loadCourse()
[16:26:34.037] [31m[1m>[22m[39m[90m 43 |[39m }[33m,[39m [resolvedParams[33m,[39m loadCourse])
[16:26:34.037] [90m |[39m [31m[1m^[22m[39m
[16:26:34.037] [90m 44 |[39m
[16:26:34.037] [90m 45 |[39m [36mconst[39m loadCourse [33m=[39m useCallback([36masync[39m () [33m=>[39m {
[16:26:34.037] [90m 46 |[39m [36mif[39m ([33m![39mresolvedParams) [36mreturn[39m[0m
[16:26:34.069] Next.js build worker exited with code: 1 and signal: null
[16:26:34.088] Error: Command "npm run build" exited with 1
