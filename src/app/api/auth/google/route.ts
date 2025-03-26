import { OAuth2Client } from "google-auth-library";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SignJWT } from "jose";
import { User } from "@/lib/auth";

// Secret key for JWT signing
const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-minimum-32-chars-long"
);

// Google OAuth client configuration
const client = new OAuth2Client({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: `${
    process.env.BASE_URL || "http://localhost:3000"
  }/api/auth/google/callback`,
});

// Cookie management helper
const cookieManager = {
  async set(name: string, value: string, options: Record<string, unknown>) {
    try {
      const cookieStore = await cookies();
      cookieStore.set(name, value, options);
      return true;
    } catch (error) {
      console.error("Error setting cookie:", error);
      return false;
    }
  },
};

// Generate Google OAuth URL
export async function GET(request: NextRequest) {
  const redirectUrl =
    request.nextUrl.searchParams.get("redirect") || "/dashboard";

  // Generate auth URL for Google
  const authUrl = client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
    prompt: "consent",
    state: redirectUrl,
  });

  return NextResponse.json({ url: authUrl });
}

// Handle user sign-in
export async function POST(request: NextRequest) {
  try {
    console.log("[Google Auth] Processing POST request");
    const { credential } = await request.json();

    // Verify the token with Google
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      console.error("[Google Auth] Invalid token - no payload");
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    console.log(
      "[Google Auth] Token verified successfully. User:",
      payload.email
    );

    // Create user object
    const user: User = {
      id: payload.sub,
      name: payload.name || null,
      email: payload.email || null,
      image: payload.picture || null,
      provider: "google",
    };

    // Import the findOrCreateUser function directly here to avoid circular dependencies
    const { findOrCreateUser } = await import("@/models/User");

    try {
      console.log(
        "[Google Auth] Attempting to find or create user in database"
      );
      const dbUser = await findOrCreateUser({
        id: payload.sub,
        email: payload.email || "",
        name: payload.name || "",
        image: payload.picture,
      });
      console.log(
        "[Google Auth] Database user operation result:",
        dbUser ? "Success" : "Failed"
      );
    } catch (dbError) {
      console.error("[Google Auth] Database error:", dbError);
      // Continue anyway to at least create the session
    }

    // Create JWT session
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    const session = {
      user,
      expires: expires.toISOString(),
    };

    console.log("[Google Auth] Creating session token");
    const token = await new SignJWT({ session })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(expires)
      .sign(SECRET_KEY);

    // Set the cookie
    console.log("[Google Auth] Setting session cookie");
    await cookieManager.set("session", token, {
      expires,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Error authenticating with Google:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
