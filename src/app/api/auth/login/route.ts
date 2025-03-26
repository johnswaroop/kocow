import { NextRequest, NextResponse } from "next/server";
import { createSession } from "@/lib/auth";
import { findOrCreateUser } from "@/models/User";
import { connectToDatabase } from "@/lib/mongoose";

export async function POST(request: NextRequest) {
  try {
    console.log("[Login API] Processing login request");

    // Connect to database
    await connectToDatabase();

    // Parse the request body
    const body = await request.json();
    const { name, email } = body;

    if (!name || !email) {
      console.error("[Login API] Missing required fields");
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    console.log("[Login API] Attempting to create or find user", { email });

    // Generate a unique ID for the user if creating one
    const userId = `local_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 15)}`;

    // Find or create the user
    const user = await findOrCreateUser({
      id: userId,
      name,
      email,
      image: undefined,
    });

    if (!user) {
      console.error("[Login API] Failed to create or find user");
      return NextResponse.json(
        { error: "Failed to create user" },
        { status: 500 }
      );
    }

    console.log("[Login API] User created/found successfully:", user.id);

    // Create a session
    await createSession({
      id: user.id,
      name: user.name,
      email: user.email,
      provider: "local",
    });

    console.log("[Login API] Session created successfully");

    return NextResponse.json({ success: true, userId: user.id });
  } catch (error) {
    console.error("[Login API] Error processing login:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
