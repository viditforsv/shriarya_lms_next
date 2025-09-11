[18:54:33.822] Running build in Washington, D.C., USA (East) – iad1
[18:54:33.822] Build machine configuration: 2 cores, 8 GB
[18:54:33.842] Cloning github.com/viditforsv/shriarya_lms_next (Branch: dev, Commit: 464474f)
[18:54:34.540] Cloning completed: 698.000ms
[18:54:35.970] Restored build cache from previous deployment (8gWUEMFnhjnbZwyYPJKaXx76uv3Y)
[18:54:36.545] Running "vercel build"
[18:54:36.938] Vercel CLI 47.1.1
[18:54:37.278] Installing dependencies...
[18:54:38.537]
[18:54:38.538] up to date in 1s
[18:54:38.539]
[18:54:38.539] 146 packages are looking for funding
[18:54:38.539] run `npm fund` for details
[18:54:38.571] Detected Next.js version: 15.5.2
[18:54:38.576] Running "npm run build"
[18:54:38.686]
[18:54:38.686] > shriarya_lms_next@0.1.0 build
[18:54:38.686] > next build
[18:54:38.686]
[18:54:39.823] ▲ Next.js 15.5.2
[18:54:39.824]
[18:54:39.923] Creating an optimized production build ...
[18:54:50.139] Failed to compile.
[18:54:50.140]
[18:54:50.140] ./src/app/components-demo/page.tsx
[18:54:50.140] Error: [31mx[0m Unexpected token. Did you mean `{'>'}` or `&gt;`?
[18:54:50.140] ,-[[36;1;4m/vercel/path0/src/app/components-demo/page.tsx[0m:647:1]
[18:54:50.140] [2m644[0m | content={sectionContent}
[18:54:50.140] [2m645[0m | onChange={(content) => setSectionContent(content)}
[18:54:50.140] [2m646[0m | placeholder="Enter your content here..."
[18:54:50.140] [2m647[0m | />`}</pre>
[18:54:50.140]      : [35;1m ^[0m
[18:54:50.141]  [2m648[0m |             </div>
[18:54:50.141]  [2m649[0m |             </div>
[18:54:50.141]  [2m650[0m |           </CardContent>
[18:54:50.141]      `----
[18:54:50.141] [31mx[0m Unexpected token. Did you mean `{'}'}` or `&rbrace;`?
[18:54:50.141] ,-[[36;1;4m/vercel/path0/src/app/components-demo/page.tsx[0m:647:1]
[18:54:50.141] [2m644[0m | content={sectionContent}
[18:54:50.141] [2m645[0m | onChange={(content) => setSectionContent(content)}
[18:54:50.141] [2m646[0m | placeholder="Enter your content here..."
[18:54:50.141] [2m647[0m | />`}</pre>
[18:54:50.141]      : [35;1m   ^[0m
[18:54:50.141]  [2m648[0m |             </div>
[18:54:50.141]  [2m649[0m |             </div>
[18:54:50.141]  [2m650[0m |           </CardContent>
[18:54:50.142]      `----
[18:54:50.142] [31mx[0m Expected '</', got 'jsx text (
[18:54:50.142] [31m|[0m )'
[18:54:50.142] ,-[[36;1;4m/vercel/path0/src/app/components-demo/page.tsx[0m:647:1]
[18:54:50.142] [2m644[0m | content={sectionContent}
[18:54:50.143] [2m645[0m | onChange={(content) => setSectionContent(content)}
[18:54:50.143] [2m646[0m | placeholder="Enter your content here..."
[18:54:50.143] [2m647[0m | [35;1m,[0m[35;1m-[0m[35;1m>[0m />`}</pre>
[18:54:50.143]  [2m648[0m | [35;1m`[0m[35;1m-[0m[35;1m>[0m </div>
[18:54:50.144] [2m649[0m | </div>
[18:54:50.144] [2m650[0m | </CardContent>
[18:54:50.144] [2m651[0m | </Card>
[18:54:50.144] `----
[18:54:50.145] 
[18:54:50.145] Caused by:
[18:54:50.145]     Syntax Error
[18:54:50.145] 
[18:54:50.145] Import trace for requested module:
[18:54:50.145] ./src/app/components-demo/page.tsx
[18:54:50.146] 
[18:54:50.146] ./src/app/dashboard/courses/[id]/edit/page.tsx
[18:54:50.146] Error:   [31mx[0m Unexpected token. Did you mean `{'>'}`or`&gt;`?
[18:54:50.146]      ,-[[36;1;4m/vercel/path0/src/app/dashboard/courses/[id]/edit/page.tsx[0m:467:1]
[18:54:50.146]  [2m464[0m |                               onSectionsChange={(sections) => {
[18:54:50.151]  [2m465[0m |                                 console.log('Sections updated for lesson:', lesson.title, sections)
[18:54:50.151]  [2m466[0m |                               }}
[18:54:50.151]  [2m467[0m |                             />
[18:54:50.151]      : [35;1m                             ^[0m
[18:54:50.152]  [2m468[0m |                           </div>
[18:54:50.152]  [2m469[0m |                         ))}
[18:54:50.152]  [2m470[0m |                       </div>
[18:54:50.153]      `----
[18:54:50.154]
[18:54:50.154] Caused by:
[18:54:50.154] Syntax Error
[18:54:50.154]
[18:54:50.155] Import trace for requested module:
[18:54:50.155] ./src/app/dashboard/courses/[id]/edit/page.tsx
[18:54:50.155]
[18:54:50.158]
[18:54:50.158] > Build failed because of webpack errors
[18:54:50.189] Error: Command "npm run build" exited with 1
