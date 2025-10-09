17:16:08.393 Running build in Washington, D.C., USA (East) – iad1
17:16:08.393 Build machine configuration: 2 cores, 8 GB
17:16:08.408 Cloning github.com/viditforsv/shriarya_lms_next (Branch: dev, Commit: 1b8c33f)
17:16:09.214 Cloning completed: 806.000ms
17:16:09.965 Restored build cache from previous deployment (DEdrf7TyyiWNwNGWDr35QG5bG1UB)
17:16:11.647 Running "vercel build"
17:16:12.106 Vercel CLI 48.1.6
17:16:12.454 Installing dependencies...
17:16:20.379
17:16:20.380 added 11 packages, and changed 7 packages in 8s
17:16:20.381
17:16:20.382 152 packages are looking for funding
17:16:20.382 run `npm fund` for details
17:16:20.417 Detected Next.js version: 15.5.4
17:16:20.422 Running "npm run build"
17:16:20.534
17:16:20.534 > shriarya_lms_next@0.1.0 build
17:16:20.534 > next build
17:16:20.534
17:16:21.404 ▲ Next.js 15.5.4
17:16:21.405
17:16:21.504 Creating an optimized production build ...
17:16:43.626 <w> [webpack.cache.PackFileCacheStrategy] Serializing big strings (108kiB) impacts deserialization performance (consider using Buffer instead and decode when needed)
17:16:43.812 ⚠ Compiled with warnings in 2.2s
17:16:43.813
17:16:43.813 ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
17:16:43.813 A Node.js API is used (process.versions at line: 35) which is not supported in the Edge Runtime.
17:16:43.813 Learn more: https://nextjs.org/docs/api-reference/edge-runtime
17:16:43.814
17:16:43.814 Import trace for requested module:
17:16:43.814 ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
17:16:43.814 ./node_modules/@supabase/realtime-js/dist/module/index.js
17:16:43.815 ./node_modules/@supabase/supabase-js/dist/module/index.js
17:16:43.815 ./node_modules/@supabase/ssr/dist/module/createBrowserClient.js
17:16:43.816 ./node_modules/@supabase/ssr/dist/module/index.js
17:16:43.816
17:16:43.817 ./node_modules/@supabase/supabase-js/dist/module/index.js
17:16:43.817 A Node.js API is used (process.version at line: 24) which is not supported in the Edge Runtime.
17:16:43.817 Learn more: https://nextjs.org/docs/api-reference/edge-runtime
17:16:43.817
17:16:43.817 Import trace for requested module:
17:16:43.818 ./node_modules/@supabase/supabase-js/dist/module/index.js
17:16:43.818 ./node_modules/@supabase/ssr/dist/module/createBrowserClient.js
17:16:43.818 ./node_modules/@supabase/ssr/dist/module/index.js
17:16:43.818
17:16:57.118 ✓ Compiled successfully in 32.6s
17:16:57.124 Skipping linting
17:16:57.125 Checking validity of types ...
17:17:14.717 Failed to compile.
17:17:14.717
17:17:14.717 ./src/app/api/rbac/permissions/route.ts:75:13
17:17:14.717 Type error: Object literal may only specify known properties, and 'icon' does not exist in type '{ id: string; name: string; permissions: unknown[]; }'.
17:17:14.717
17:17:14.718 [0m [90m 73 |[39m id[33m:[39m categoryName[33m,[39m
17:17:14.718 [90m 74 |[39m name[33m:[39m category[33m?[39m[33m.[39mdisplay_name [33m||[39m categoryName[33m,[39m
17:17:14.718 [31m[1m>[22m[39m[90m 75 |[39m icon[33m:[39m category[33m?[39m[33m.[39micon [33m||[39m [32m"📋"[39m[33m,[39m
17:17:14.718 [90m |[39m [31m[1m^[22m[39m
17:17:14.718 [90m 76 |[39m description[33m:[39m category[33m?[39m[33m.[39mdescription [33m||[39m [32m`${categoryName} permissions`[39m[33m,[39m
17:17:14.719 [90m 77 |[39m displayOrder[33m:[39m category[33m?[39m[33m.[39mdisplay_order [33m||[39m [35m999[39m[33m,[39m
17:17:14.719 [90m 78 |[39m tasks[33m:[39m [][33m,[39m[0m
17:17:14.755 Next.js build worker exited with code: 1 and signal: null
17:17:14.778 Error: Command "npm run build" exited with 1
