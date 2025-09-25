17:04:34.376 Running build in Washington, D.C., USA (East) – iad1
17:04:34.377 Build machine configuration: 2 cores, 8 GB
17:04:34.405 Cloning github.com/viditforsv/shriarya_lms_next (Branch: dev, Commit: aa3acf0)
17:04:35.120 Cloning completed: 715.000ms
17:04:36.557 Restored build cache from previous deployment (DEdrf7TyyiWNwNGWDr35QG5bG1UB)
17:04:37.181 Running "vercel build"
17:04:37.583 Vercel CLI 48.1.6
17:04:37.931 Installing dependencies...
17:04:45.851
17:04:45.853 added 11 packages, and changed 7 packages in 8s
17:04:45.854
17:04:45.855 152 packages are looking for funding
17:04:45.855 run `npm fund` for details
17:04:45.889 Detected Next.js version: 15.5.4
17:04:45.893 Running "npm run build"
17:04:46.027
17:04:46.028 > shriarya_lms_next@0.1.0 build
17:04:46.028 > next build
17:04:46.029
17:04:46.857 ▲ Next.js 15.5.4
17:04:46.858
17:04:46.956 Creating an optimized production build ...
17:05:08.508 <w> [webpack.cache.PackFileCacheStrategy] Serializing big strings (108kiB) impacts deserialization performance (consider using Buffer instead and decode when needed)
17:05:08.713 ⚠ Compiled with warnings in 2.1s
17:05:08.713
17:05:08.714 ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
17:05:08.715 A Node.js API is used (process.versions at line: 35) which is not supported in the Edge Runtime.
17:05:08.715 Learn more: https://nextjs.org/docs/api-reference/edge-runtime
17:05:08.715
17:05:08.715 Import trace for requested module:
17:05:08.715 ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
17:05:08.715 ./node_modules/@supabase/realtime-js/dist/module/index.js
17:05:08.716 ./node_modules/@supabase/supabase-js/dist/module/index.js
17:05:08.716 ./node_modules/@supabase/ssr/dist/module/createBrowserClient.js
17:05:08.716 ./node_modules/@supabase/ssr/dist/module/index.js
17:05:08.716
17:05:08.716 ./node_modules/@supabase/supabase-js/dist/module/index.js
17:05:08.716 A Node.js API is used (process.version at line: 24) which is not supported in the Edge Runtime.
17:05:08.717 Learn more: https://nextjs.org/docs/api-reference/edge-runtime
17:05:08.717
17:05:08.717 Import trace for requested module:
17:05:08.717 ./node_modules/@supabase/supabase-js/dist/module/index.js
17:05:08.717 ./node_modules/@supabase/ssr/dist/module/createBrowserClient.js
17:05:08.717 ./node_modules/@supabase/ssr/dist/module/index.js
17:05:08.719
17:05:21.568 ✓ Compiled successfully in 31.9s
17:05:21.575 Skipping linting
17:05:21.575 Checking validity of types ...
17:05:38.377 Failed to compile.
17:05:38.378
17:05:38.378 src/app/courses/[slug]/pdf-assignment/[assignmentId]/page.tsx
17:05:38.378 Type error: Type 'PageProps' does not satisfy the constraint 'import("/vercel/path0/.next/types/app/courses/[slug]/pdf-assignment/[assignmentId]/page").PageProps'.
17:05:38.378 Types of property 'params' are incompatible.
17:05:38.378 Type '{ slug: string; assignmentId: string; }' is missing the following properties from type 'Promise<any>': then, catch, finally, [Symbol.toStringTag]
17:05:38.378
17:05:38.413 Next.js build worker exited with code: 1 and signal: null
17:05:38.436 Error: Command "npm run build" exited with 1
