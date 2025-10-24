import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/courses/enrolled";

  console.log("Auth callback - Origin:", origin);
  console.log("Auth callback - Code:", code ? "present" : "missing");
  console.log("Auth callback - Next:", next);

  if (code) {
    try {
      // For PKCE, we need to let the client handle the session
      // The server-side exchange doesn't work with PKCE flow
      // Instead, we'll redirect to the client with the code

      console.log("Auth callback - Redirecting to client-side handling");
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || origin;

      // Redirect to the main auth page with the code
      return NextResponse.redirect(`${baseUrl}/auth?code=${code}&next=${next}`);
    } catch (error) {
      console.error("Auth callback - Unexpected error:", error);
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || origin;
      return NextResponse.redirect(
        `${baseUrl}/auth?error=Authentication failed`
      );
    }
  }

  // Return the user to an error page with instructions
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || origin;
  console.log(
    "Auth callback - No code, redirecting to:",
    `${baseUrl}/auth?error=No authentication code received`
  );
  return NextResponse.redirect(
    `${baseUrl}/auth?error=No authentication code received`
  );
}
