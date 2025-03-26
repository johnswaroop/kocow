import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// Cookie management helper
const cookieManager = {
  async delete(name: string) {
    try {
      const cookieStore = await cookies();
      cookieStore.delete(name);
      return true;
    } catch (error) {
      console.error("Error deleting cookie:", error);
      return false;
    }
  },
};

export async function POST() {
  try {
    // Clear the session cookie
    await cookieManager.delete("session");

    // Return success response
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error signing out:", error);
    return NextResponse.json({ error: "Failed to sign out" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    // Clear the session cookie
    await cookieManager.delete("session");

    // Get the redirect URL from query params or default to home
    const redirectTo = request.nextUrl.searchParams.get("redirect") || "/";

    // Redirect to the specified URL
    return NextResponse.redirect(new URL(redirectTo, request.url));
  } catch (error) {
    console.error("Error signing out:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}
