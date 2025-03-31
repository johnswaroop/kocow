import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import { Booking } from "@/models/Booking";
import { User } from "@/models/User";
import { Types } from "mongoose";

interface BookingWithUser {
  _id: Types.ObjectId;
  spaceId: string;
  userId: string;
  startTime: Date;
  status: string;
  duration?: number;
  totalAmount?: number;
  __v: number;
  user?: {
    name: string;
    email: string;
  };
}

type LeanBooking = {
  _id: Types.ObjectId;
  userId: string;
  spaceId: string;
  startTime: Date;
  status: string;
  duration?: number;
  totalAmount?: number;
  __v: number;
};

type LeanUser = {
  _id: Types.ObjectId;
  id: string;
  name: string;
  email: string;
  __v: number;
};

export async function GET(request: NextRequest) {
  try {
    // Connect to database
    await connectToDatabase();

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const startDate = searchParams.get("startDate");

    // Build query
    interface BookingQuery {
      status?: string;
      startTime?: {
        $gte: Date;
      };
    }
    const query: BookingQuery = {};

    if (status) {
      query.status = status;
    }

    if (startDate) {
      query.startTime = {
        $gte: new Date(startDate),
      };
    }

    // Fetch bookings
    const bookings = (await Booking.find(query)
      .sort({ startTime: -1 })
      .lean()) as LeanBooking[];

    // Get unique user IDs from bookings
    const userIds = [...new Set(bookings.map((b) => b.userId))];

    // Fetch user details for all unique user IDs
    const users = (await User.find({ id: { $in: userIds } })
      .select("id name email")
      .lean()) as LeanUser[];

    // Create a map of user details for quick lookup
    const userMap = new Map(users.map((user) => [user.id, user]));

    // Transform the data to include user details
    const transformedBookings = (bookings as unknown as BookingWithUser[]).map(
      (booking) => {
        const user = userMap.get(booking.userId);
        return {
          id: booking._id.toString(),
          spaceId: booking.spaceId,
          userId: booking.userId,
          userName: user?.name || "Unknown User",
          userEmail: user?.email || "unknown@email.com",
          startTime: booking.startTime,
          status: booking.status,
          duration: booking.duration || 4, // Default duration for demo
          totalAmount: booking.totalAmount || 0, // Default amount for demo
        };
      }
    );

    return NextResponse.json({ success: true, bookings: transformedBookings });
  } catch (error) {
    console.error("[Admin Bookings API] Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
