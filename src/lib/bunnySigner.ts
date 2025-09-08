import crypto from "crypto";

/**
 * Signs a Bunny CDN URL with token authentication
 * @param path - The file path (e.g., "/pdfs/chapter1.pdf")
 * @param baseUrl - The CDN base URL (e.g., "https://shrividhyaclasses.b-cdn.net")
 * @param secret - The token authentication key from Bunny CDN
 * @param expiresInSeconds - How long the token should be valid (default: 1 hour)
 * @returns Signed URL with token and expiry
 */
export function signBunnyUrl(
  path: string, 
  baseUrl: string, 
  secret: string, 
  expiresInSeconds: number = 3600
): string {
  const expires = Math.floor(Date.now() / 1000) + expiresInSeconds;
  
  // Create SHA256 hash: secret + path + expires
  const hash = crypto
    .createHash("sha256")
    .update(secret + path + expires)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  return `${baseUrl}${path}?token=${hash}&expires=${expires}`;
}

/**
 * Validates if a Bunny CDN token is still valid
 * @param token - The token from the URL
 * @param path - The file path
 * @param expires - The expiry timestamp
 * @param secret - The token authentication key
 * @returns True if token is valid
 */
export function validateBunnyToken(
  token: string,
  path: string,
  expires: number,
  secret: string
): boolean {
  const now = Math.floor(Date.now() / 1000);
  
  // Check if token has expired
  if (now > expires) {
    return false;
  }
  
  // Recreate the hash and compare
  const expectedHash = crypto
    .createHash("sha256")
    .update(secret + path + expires)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
    
  return token === expectedHash;
}

/**
 * Generates a signed URL for file uploads (for internal use)
 * @param fileName - The file name to upload
 * @param secret - The token authentication key
 * @param expiresInSeconds - How long the token should be valid
 * @returns Signed URL for upload
 */
export function signBunnyUploadUrl(
  fileName: string,
  secret: string,
  expiresInSeconds: number = 3600
): { url: string; token: string; expires: number } {
  const path = `/${fileName}`;
  const expires = Math.floor(Date.now() / 1000) + expiresInSeconds;
  
  const hash = crypto
    .createHash("sha256")
    .update(secret + path + expires)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  return {
    url: `https://shrividhyaclasses.b-cdn.net${path}?token=${hash}&expires=${expires}`,
    token: hash,
    expires
  };
}
