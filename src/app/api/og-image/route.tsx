import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "ShriArya LMS Course";
    const description =
      searchParams.get("description") || "Learn with ShriArya LMS";
    const curriculum = searchParams.get("curriculum") || "";
    const subject = searchParams.get("subject") || "";
    const price = searchParams.get("price") || "0";

    // Color scheme matching your brand
    const primaryColor = "#e27447";
    const secondaryColor = "#d1653a";
    const textColor = "#1e293b";
    const mutedColor = "#64748b";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f8fafc",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          {/* Header with gradient background */}
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "200px",
              background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
              alignItems: "center",
              justifyContent: "center",
              padding: "40px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              {/* Brand logo placeholder */}
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  backgroundColor: "white",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "40px",
                  fontWeight: "bold",
                  color: primaryColor,
                }}
              >
                SA
              </div>
              <div
                style={{
                  color: "white",
                  fontSize: "48px",
                  fontWeight: "bold",
                }}
              >
                ShriArya LMS
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div
            style={{
              display: "flex",
              width: "100%",
              flex: 1,
              padding: "60px",
              gap: "40px",
            }}
          >
            {/* Course info section */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                gap: "20px",
                justifyContent: "center",
              }}
            >
              {/* Course title */}
              <div
                style={{
                  fontSize: "64px",
                  fontWeight: "bold",
                  color: textColor,
                  lineHeight: "1.2",
                  wordBreak: "break-word",
                }}
              >
                {title}
              </div>

              {/* Description */}
              <div
                style={{
                  fontSize: "28px",
                  color: mutedColor,
                  lineHeight: "1.4",
                  wordBreak: "break-word",
                }}
              >
                {description.length > 120
                  ? `${description.substring(0, 120)}...`
                  : description}
              </div>

              {/* Tags and metadata */}
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  marginTop: "20px",
                  flexWrap: "wrap",
                }}
              >
                {curriculum && (
                  <div
                    style={{
                      padding: "12px 24px",
                      backgroundColor: "#dbeafe",
                      color: "#1e40af",
                      borderRadius: "8px",
                      fontSize: "20px",
                      fontWeight: "600",
                    }}
                  >
                    {curriculum}
                  </div>
                )}
                {subject && (
                  <div
                    style={{
                      padding: "12px 24px",
                      backgroundColor: "#f3e8ff",
                      color: "#6b21a8",
                      borderRadius: "8px",
                      fontSize: "20px",
                      fontWeight: "600",
                    }}
                  >
                    {subject}
                  </div>
                )}
                {price && parseInt(price) > 0 && (
                  <div
                    style={{
                      padding: "12px 24px",
                      backgroundColor: "#fef3c7",
                      color: "#92400e",
                      borderRadius: "8px",
                      fontSize: "20px",
                      fontWeight: "600",
                    }}
                  >
                    ₹{parseInt(price).toLocaleString()}
                  </div>
                )}
                {price && parseInt(price) === 0 && (
                  <div
                    style={{
                      padding: "12px 24px",
                      backgroundColor: "#d1fae5",
                      color: "#065f46",
                      borderRadius: "8px",
                      fontSize: "20px",
                      fontWeight: "600",
                    }}
                  >
                    Free Course
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              width: "100%",
              padding: "30px 60px",
              backgroundColor: "#fefefe",
              borderTop: `2px solid ${primaryColor}`,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontSize: "20px",
                color: mutedColor,
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke={mutedColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>Learn at Your Own Pace</span>
            </div>
            <div
              style={{
                fontSize: "20px",
                color: mutedColor,
              }}
            >
              shrividhya.in
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error("Error generating OG image:", error);
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
