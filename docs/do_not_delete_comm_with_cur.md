## Error Type

Console Error

## Error Message

Failed to create initial progress: 401

    at DynamicLessonPage.useCallback[createInitialProgress] (src/app/courses/[slug]/lesson/[lessonSlug]/page.tsx:253:17)
    at async DynamicLessonPage.useEffect.fetchUserProgress (src/app/courses/[slug]/lesson/[lessonSlug]/page.tsx:324:13)

## Code Frame

251 | } else {
252 | const errorText = await response.text();

> 253 | console.error("Failed to create initial progress:", response.status);

      |                 ^

254 | console.error("Error response body:", errorText);
255 |
256 | // If it's a 401 error, the user might not be properly authenticated

Next.js version: 15.5.3 (Turbopack)

## Error Type

Console Error

## Error Message

Error response body: "{\"error\":\"Unauthorized\"}"

    at DynamicLessonPage.useCallback[createInitialProgress] (src/app/courses/[slug]/lesson/[lessonSlug]/page.tsx:254:17)
    at async DynamicLessonPage.useEffect.fetchUserProgress (src/app/courses/[slug]/lesson/[lessonSlug]/page.tsx:324:13)

## Code Frame

252 | const errorText = await response.text();
253 | console.error("Failed to create initial progress:", response.status);

> 254 | console.error("Error response body:", errorText);

      |                 ^

255 |
256 | // If it's a 401 error, the user might not be properly authenticated
257 | if (response.status === 401) {

Next.js version: 15.5.3 (Turbopack)
