[23:38:35.750] Running build in Washington, D.C., USA (East) – iad1
[23:38:35.750] Build machine configuration: 2 cores, 8 GB
[23:38:35.766] Cloning github.com/viditforsv/shriarya_lms_next (Branch: dev, Commit: b4012d4)
[23:38:36.709] Cloning completed: 943.000ms
[23:38:37.923] Restored build cache from previous deployment (F7sdUYx37zhTG9vmioLvefx3pMVv)
[23:38:38.494] Running "vercel build"
[23:38:38.892] Vercel CLI 47.0.5
[23:38:39.246] Installing dependencies...
[23:38:40.465]
[23:38:40.466] up to date in 998ms
[23:38:40.466]
[23:38:40.467] 146 packages are looking for funding
[23:38:40.467] run `npm fund` for details
[23:38:40.496] Detected Next.js version: 15.5.2
[23:38:40.500] Running "npm run build"
[23:38:40.613]
[23:38:40.614] > shriarya_lms_next@0.1.0 build
[23:38:40.614] > next build
[23:38:40.615]
[23:38:41.726] ▲ Next.js 15.5.2
[23:38:41.727]
[23:38:41.825] Creating an optimized production build ...
[23:39:03.624] ✓ Compiled successfully in 18.8s
[23:39:03.630] Linting and checking validity of types ...
[23:39:12.876]
[23:39:12.877] Failed to compile.
[23:39:12.878]
[23:39:12.878] ./src/app/admin/course-templates/page.tsx
[23:39:12.878] 7:10 Error: 'Input' is defined but never used. @typescript-eslint/no-unused-vars
[23:39:12.878] 37:14 Error: 'err' is defined but never used. @typescript-eslint/no-unused-vars
[23:39:12.878] 58:14 Error: 'err' is defined but never used. @typescript-eslint/no-unused-vars
[23:39:12.878]
[23:39:12.879] ./src/app/api/course-templates/route.ts
[23:39:12.879] 3:10 Error: 'CourseTemplate' is defined but never used. @typescript-eslint/no-unused-vars
[23:39:12.879] 3:26 Error: 'TemplateField' is defined but never used. @typescript-eslint/no-unused-vars
[23:39:12.879] 3:41 Error: 'TemplateSettings' is defined but never used. @typescript-eslint/no-unused-vars
[23:39:12.880]
[23:39:12.880] ./src/app/api/test/route.ts
[23:39:12.880] 6:12 Error: 'error' is defined but never used. @typescript-eslint/no-unused-vars
[23:39:12.880]
[23:39:12.880] ./src/app/courses/[slug]/lesson/[lessonSlug]/page.tsx
[23:39:12.881] 30:3 Error: 'getLessonsByCourseSlugSync' is defined but never used. @typescript-eslint/no-unused-vars
[23:39:12.881] 31:3 Error: 'getLessonBySlug' is defined but never used. @typescript-eslint/no-unused-vars
[23:39:12.881] 32:3 Error: 'LessonConfig' is defined but never used. @typescript-eslint/no-unused-vars
[23:39:12.881] 33:3 Error: 'ResourceConfig' is defined but never used. @typescript-eslint/no-unused-vars
[23:39:12.881] 43:19 Error: Unexpected any. Specify a different type. @typescript-eslint/no-explicit-any
[23:39:12.882] 117:76 Error: Unexpected any. Specify a different type. @typescript-eslint/no-explicit-any
[23:39:12.882]
[23:39:12.882] ./src/app/courses/[slug]/page.tsx
[23:39:12.882] 19:3 Error: 'CourseConfig' is defined but never used. @typescript-eslint/no-unused-vars
[23:39:12.882] 30:10 Error: 'isFallback' is assigned a value but never used. @typescript-eslint/no-unused-vars
[23:39:12.882] 64:73 Error: Unexpected any. Specify a different type. @typescript-eslint/no-explicit-any
[23:39:12.882] 107:73 Error: Unexpected any. Specify a different type. @typescript-eslint/no-explicit-any
[23:39:12.882]
[23:39:12.882] ./src/app/minimal-lesson/page.tsx
[23:39:12.882] 43:74 Error: Unexpected any. Specify a different type. @typescript-eslint/no-explicit-any
[23:39:12.882]
[23:39:12.882] ./src/app/test-lesson/page.tsx
[23:39:12.882] 24:50 Error: Unexpected any. Specify a different type. @typescript-eslint/no-explicit-any
[23:39:12.882] 104:50 Error: Unexpected any. Specify a different type. @typescript-eslint/no-explicit-any
[23:39:12.883]
[23:39:12.883] ./src/components/DynamicCourseRenderer.tsx
[23:39:12.883] 5:29 Warning: 'CardDescription' is defined but never used. @typescript-eslint/no-unused-vars
[23:39:12.883] 6:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[23:39:12.883] 88:69 Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`. react/no-unescaped-entities
[23:39:12.883] 112:43 Error: Unexpected any. Specify a different type. @typescript-eslint/no-explicit-any
[23:39:12.883] 114:40 Error: Unexpected any. Specify a different type. @typescript-eslint/no-explicit-any
[23:39:12.883]
[23:39:12.883] ./src/lib/course-template-renderer.ts
[23:39:12.883] 60:45 Error: 'courseSlug' is defined but never used. @typescript-eslint/no-unused-vars
[23:39:12.883] 76:30 Error: Unexpected any. Specify a different type. @typescript-eslint/no-explicit-any
[23:39:12.889] 127:85 Error: Unexpected any. Specify a different type. @typescript-eslint/no-explicit-any
[23:39:12.890] 128:37 Error: Unexpected any. Specify a different type. @typescript-eslint/no-explicit-any
[23:39:12.890]
[23:39:12.890] ./src/types/course-templates.ts
[23:39:12.890] 55:19 Error: Unexpected any. Specify a different type. @typescript-eslint/no-explicit-any
[23:39:12.890] 59:15 Error: Unexpected any. Specify a different type. @typescript-eslint/no-explicit-any
[23:39:12.891] 72:34 Error: Unexpected any. Specify a different type. @typescript-eslint/no-explicit-any
[23:39:12.891] 109:33 Error: Unexpected any. Specify a different type. @typescript-eslint/no-explicit-any
[23:39:12.891] 139:32 Error: Unexpected any. Specify a different type. @typescript-eslint/no-explicit-any
[23:39:12.891]
[23:39:12.893] info - Need to disable some ESLint rules? Learn more here: https://nextjs.org/docs/app/api-reference/config/eslint#disabling-rules
[23:39:12.931] Error: Command "npm run build" exited with 1
