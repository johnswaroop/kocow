import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import { Booking } from "@/models/Booking";
import { getSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    console.log("[Bookings API] Processing create booking request");

    // Connect to database
    await connectToDatabase();

    // Get the current user's session
    const session = await getSession();
    if (!session?.user?.id) {
      console.error("[Bookings API] No authenticated user found");
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Parse the request body
    const body = await request.json();
    const { spaceId, startTime, endTime } = body;

    if (!spaceId || !startTime || !endTime) {
      console.error("[Bookings API] Missing required fields");
      return NextResponse.json(
        { error: "Space ID, start time, and end time are required" },
        { status: 400 }
      );
    }

    // Create the booking
    const booking = await Booking.create({
      userId: session.user.id,
      spaceId,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      status: "pending",
    });

    console.log("[Bookings API] Booking created successfully:", booking._id);

    return NextResponse.json({ success: true, booking });
  } catch (error) {
    console.error("[Bookings API] Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log("[Bookings API] Processing fetch bookings request");

    // Connect to database
    await connectToDatabase();

    // Get the current user's session
    const session = await getSession();
    if (!session?.user?.id) {
      console.error("[Bookings API] No authenticated user found");
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    // Build query
    const query: any = { userId: session.user.id };

    if (status) {
      query.status = status;
    }

    if (startDate && endDate) {
      query.startTime = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    // Fetch bookings
    const bookings = await Booking.find(query).sort({ startTime: 1 }).lean();

    console.log(
      "[Bookings API] Successfully fetched bookings for user:",
      session.user.id
    );

    return NextResponse.json({ success: true, bookings });
  } catch (error) {
    console.error("[Bookings API] Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
