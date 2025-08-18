[14:56:03.217] Running build in Washington, D.C., USA (East) – iad1
[14:56:03.217] Build machine configuration: 4 cores, 8 GB
[14:56:03.234] Cloning github.com/viditforsv/shriarya_lms_next (Branch: main, Commit: acf4645)
[14:56:03.914] Cloning completed: 680.000ms
[14:56:05.458] Restored build cache from previous deployment (6h6tUohP1V81YSyhvFUXfJmBNaeh)
[14:56:09.026] Running "vercel build"
[14:56:09.473] Vercel CLI 45.0.10
[14:56:09.801] Installing dependencies...
[14:56:11.084]
[14:56:11.085] up to date in 958ms
[14:56:11.085]
[14:56:11.085] 145 packages are looking for funding
[14:56:11.085] run `npm fund` for details
[14:56:11.116] Detected Next.js version: 15.4.6
[14:56:11.120] Running "npm run build"
[14:56:11.235]
[14:56:11.235] > shriarya_lms_next@0.1.0 build
[14:56:11.236] > next build
[14:56:11.236]
[14:56:12.449] ▲ Next.js 15.4.6
[14:56:12.449]
[14:56:12.485] Creating an optimized production build ...
[14:56:27.751] ✓ Compiled successfully in 10.0s
[14:56:27.757] Linting and checking validity of types ...
[14:56:32.948]
[14:56:32.948] Failed to compile.
[14:56:32.949]
[14:56:32.949] ./src/app/courses/cbse/mathematics/class-10/page.tsx
[14:56:32.949] 4:21 Warning: 'Play' is defined but never used. @typescript-eslint/no-unused-vars
[14:56:32.949] 60:21 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[14:56:32.950] 334:23 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[14:56:32.950] 388:23 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[14:56:32.950]
[14:56:32.951] ./src/app/courses/ibdp/mathematics/analysis-approaches-hl/page.tsx
[14:56:32.951] 5:10 Warning: 'Button' is defined but never used. @typescript-eslint/no-unused-vars
[14:56:32.951] 7:76 Warning: 'Users2' is defined but never used. @typescript-eslint/no-unused-vars
[14:56:32.951] 7:84 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[14:56:32.951]
[14:56:32.952] ./src/app/global-error.tsx
[14:56:32.952] 82:23 Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`. react/no-unescaped-entities
[14:56:32.952]
[14:56:32.952] ./src/app/templates/course-templates/course-page/page.tsx
[14:56:32.952] 4:21 Warning: 'Play' is defined but never used. @typescript-eslint/no-unused-vars
[14:56:32.953] 69:21 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[14:56:32.953] 343:23 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[14:56:32.953] 397:23 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
[14:56:32.953]
[14:56:32.954] ./src/app/templates/course-templates/page.tsx
[14:56:32.954] 110:20 Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`. react/no-unescaped-entities
[14:56:32.954]
[14:56:32.954] ./src/app/templates/dashboard-templates/admin-panel/page.tsx
[14:56:32.954] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[14:56:32.954] 5:29 Warning: 'CardDescription' is defined but never used. @typescript-eslint/no-unused-vars
[14:56:32.955] 5:46 Warning: 'CardHeader' is defined but never used. @typescript-eslint/no-unused-vars
[14:56:32.955] 5:58 Warning: 'CardTitle' is defined but never used. @typescript-eslint/no-unused-vars
[14:56:32.955]
[14:56:32.955] ./src/app/templates/dashboard-templates/analytics/page.tsx
[14:56:32.955] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[14:56:32.956] 6:10 Warning: 'Badge' is defined but never used. @typescript-eslint/no-unused-vars
[14:56:32.956] 7:33 Warning: 'TrendingDown' is defined but never used. @typescript-eslint/no-unused-vars
[14:56:32.957] 7:64 Warning: 'DollarSign' is defined but never used. @typescript-eslint/no-unused-vars
[14:56:32.957]
[14:56:32.957] ./src/app/templates/dashboard-templates/instructor-dashboard/page.tsx
[14:56:32.957] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[14:56:32.957] 5:29 Warning: 'CardDescription' is defined but never used. @typescript-eslint/no-unused-vars
[14:56:32.958] 5:46 Warning: 'CardHeader' is defined but never used. @typescript-eslint/no-unused-vars
[14:56:32.958] 5:58 Warning: 'CardTitle' is defined but never used. @typescript-eslint/no-unused-vars
[14:56:32.958] 7:100 Warning: 'Download' is defined but never used. @typescript-eslint/no-unused-vars
[14:56:32.958] 168:50 Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`. react/no-unescaped-entities
[14:56:32.959]
[14:56:32.959] ./src/app/templates/dashboard-templates/page.tsx
[14:56:32.959] 104:20 Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`. react/no-unescaped-entities
[14:56:32.959]
[14:56:32.959] ./src/app/templates/dashboard-templates/student-dashboard/page.tsx
[14:56:32.959] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[14:56:32.960] 5:29 Warning: 'CardDescription' is defined but never used. @typescript-eslint/no-unused-vars
[14:56:32.960] 5:46 Warning: 'CardHeader' is defined but never used. @typescript-eslint/no-unused-vars
[14:56:32.960] 5:58 Warning: 'CardTitle' is defined but never used. @typescript-eslint/no-unused-vars
[14:56:32.960] 160:50 Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`. react/no-unescaped-entities
[14:56:32.960] 285:74 Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`. react/no-unescaped-entities
[14:56:32.961]
[14:56:32.961] ./src/app/templates/page-templates/about/page.tsx
[14:56:32.961] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[14:56:32.961] 125:52 Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`. react/no-unescaped-entities
[14:56:32.961] 140:52 Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`. react/no-unescaped-entities
[14:56:32.961] 155:52 Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`. react/no-unescaped-entities
[14:56:32.962]
[14:56:32.962] ./src/app/templates/page-templates/contact/page.tsx
[14:56:32.963] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[14:56:32.963]
[14:56:32.963] ./src/app/templates/page-templates/login/page.tsx
[14:56:32.964] 173:22 Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`. react/no-unescaped-entities
[14:56:32.964] 195:59 Error: `"` can be escaped with `&quot;`, `&ldquo;`, `&#34;`, `&rdquo;`. react/no-unescaped-entities
[14:56:32.964] 195:71 Error: `"` can be escaped with `&quot;`, `&ldquo;`, `&#34;`, `&rdquo;`. react/no-unescaped-entities
[14:56:32.964]
[14:56:32.964] ./src/app/templates/page-templates/page.tsx
[14:56:32.964] 119:20 Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`. react/no-unescaped-entities
[14:56:32.964]
[14:56:32.964] ./src/app/templates/page-templates/pricing/page.tsx
[14:56:32.964] 3:10 Warning: 'Breadcrumb' is defined but never used. @typescript-eslint/no-unused-vars
[14:56:32.964] 7:28 Warning: 'Star' is defined but never used. @typescript-eslint/no-unused-vars
[14:56:32.964]
[14:56:32.964] info - Need to disable some ESLint rules? Learn more here: https://nextjs.org/docs/app/api-reference/config/eslint#disabling-rules
[14:56:32.983] Error: Command "npm run build" exited with 1
