21:32:53.576 Running build in Washington, D.C., USA (East) – iad1
21:32:53.576 Build machine configuration: 2 cores, 8 GB
21:32:53.599 Cloning github.com/viditforsv/shriarya_lms_next (Branch: dev, Commit: f060539)
21:32:54.524 Cloning completed: 924.000ms
21:32:54.886 Restored build cache from previous deployment (B1cE9dvK8EYYaEWHamMkyZ29pe7W)
21:32:55.430 Running "vercel build"
21:32:55.829 Vercel CLI 48.0.2
21:32:56.169 Installing dependencies...
21:32:57.839
21:32:57.840 up to date in 1s
21:32:57.840
21:32:57.840 151 packages are looking for funding
21:32:57.841 run `npm fund` for details
21:32:57.868 Detected Next.js version: 15.5.3
21:32:57.873 Running "npm run build"
21:32:57.978
21:32:57.978 > shriarya_lms_next@0.1.0 build
21:32:57.979 > next build
21:32:57.979
21:32:59.015 ▲ Next.js 15.5.3
21:32:59.016
21:32:59.119 Creating an optimized production build ...
21:33:10.799 <w> [webpack.cache.PackFileCacheStrategy] Serializing big strings (108kiB) impacts deserialization performance (consider using Buffer instead and decode when needed)
21:33:17.109 ✓ Compiled successfully in 15.2s
21:33:17.114 Skipping linting
21:33:17.114 Checking validity of types ...
21:33:32.648 Failed to compile.
21:33:32.649
21:33:32.649 ./src/components/MyAssignments.tsx:57:45
21:33:32.649 Type error: Property 'access_token' does not exist on type 'User'.
21:33:32.649
21:33:32.649 [0m [90m 55 |[39m {
21:33:32.649 [90m 56 |[39m headers[33m:[39m {
21:33:32.649 [31m[1m>[22m[39m[90m 57 |[39m [33mAuthorization[39m[33m:[39m [32m`Bearer ${user.access_token}`[39m[33m,[39m
21:33:32.649 [90m |[39m [31m[1m^[22m[39m
21:33:32.650 [90m 58 |[39m [32m"Content-Type"[39m[33m:[39m [32m"application/json"[39m[33m,[39m
21:33:32.650 [90m 59 |[39m }[33m,[39m
21:33:32.650 [90m 60 |[39m }[0m
21:33:32.682 Next.js build worker exited with code: 1 and signal: null
21:33:32.704 Error: Command "npm run build" exited with 1
