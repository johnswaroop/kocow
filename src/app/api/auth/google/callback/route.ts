import { OAuth2Client } from "google-auth-library";
import { NextRequest, NextResponse } from "next/server";
import { User, createSession } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongoose";
import { findOrCreateUser } from "@/models/User";

// Google OAuth client configuration
const client = new OAuth2Client({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: `${
    process.env.BASE_URL || "http://localhost:3000"
  }/api/auth/google/callback`,
});

// Initialize MongoDB connection
connectToDatabase().catch(console.error);

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.redirect(
        new URL("/auth/error?error=NoCodeProvided", request.url)
      );
    }

    // Exchange the code for tokens
    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);

    // Get user info using the access token
    const userInfoClient = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      }
    );

    const userInfo = await userInfoClient.json();

    // Save user to database or update existing user
    const dbUser = await findOrCreateUser({
      id: userInfo.sub,
      email: userInfo.email,
      name: userInfo.name,
      image: userInfo.picture,
    });

    // Create user object for session
    const user: User = {
      id: userInfo.sub,
      name: userInfo.name || null,
      email: userInfo.email || null,
      image: userInfo.picture || null,
      provider: "google",
    };

    // Create JWT session
    await createSession(user);

    // Check if onboarding is completed
    const redirectTo = dbUser.onboardingCompleted
      ? "/dashboard"
      : searchParams.get("state") || "/onboarding";

    // Redirect to the final destination
    return NextResponse.redirect(new URL(redirectTo, request.url));
  } catch (error) {
    console.error("Error in Google callback:", error);
    return NextResponse.redirect(
      new URL("/auth/error?error=AuthenticationFailed", request.url)
    );
  }
}
