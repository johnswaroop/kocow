import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import { User } from "@/models/User";

export async function GET(request: NextRequest) {
  try {
    // Connect to database
    await connectToDatabase();

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");

    // Build query
    interface UserQuery {
      $or?: Array<{
        name?: { $regex: string; $options: string };
        email?: { $regex: string; $options: string };
      }>;
    }
    const query: UserQuery = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    // Fetch users
    const users = await User.find(query)
      .select("name email phone profession onboardingCompleted")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error("[Admin Users API] Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
