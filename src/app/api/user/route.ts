import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getUserById, updateUser, IUser } from "@/models/User";

// GET /api/user - Get the current user's data
export async function GET() {
  try {
    // Get the current user from the session
    const sessionUser = await getCurrentUser();

    if (!sessionUser) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Get the full user data from MongoDB
    const user = await getUserById(sessionUser.id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return the user data
    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      phone: user.phone,
      profession: user.profession,
      onboardingCompleted: user.onboardingCompleted,
    });
  } catch (error) {
    console.error("Error getting user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/user - Update the current user's data
export async function PUT(request: NextRequest) {
  try {
    // Get the current user from the session
    const sessionUser = await getCurrentUser();

    if (!sessionUser) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Parse the request body
    const body = await request.json();

    // Validate the request body
    if (!body) {
      return NextResponse.json({ error: "No data provided" }, { status: 400 });
    }

    // Extract and sanitize the updatable fields
    const updateData: Partial<
      Pick<IUser, "name" | "phone" | "profession" | "onboardingCompleted">
    > = {
      name: body.name,
      phone: body.phone,
      profession: body.profession,
      onboardingCompleted: body.onboardingCompleted,
    };

    // Remove undefined fields
    Object.keys(updateData).forEach(
      (key) =>
        updateData[key as keyof typeof updateData] === undefined &&
        delete updateData[key as keyof typeof updateData]
    );

    // Update the user
    const updatedUser = await updateUser(sessionUser.id, updateData);

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return the updated user data
    return NextResponse.json({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      image: updatedUser.image,
      phone: updatedUser.phone,
      profession: updatedUser.profession,
      onboardingCompleted: updatedUser.onboardingCompleted,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
