import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import { Booking } from "@/models/Booking";
import { getSession } from "@/lib/auth";
import { sendEmail } from "@/lib/email";
import { getBookingConfirmationEmail } from "@/templates/emails/bookingConfirmation";

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
    const { spaceId, startTime, date, duration } = body;
    console.log("body:", body);
    if (!spaceId || !startTime || !date || !duration) {
      console.error(
        "[Bookings API] Missing required fields, spaceId:",
        spaceId,
        "startTime:",
        startTime,
        "date:",
        date,
        "duration:",
        duration
      );
      return NextResponse.json(
        { error: "Space ID, date, start time, and duration are required" },
        { status: 400 }
      );
    }

    // Create the booking with combined date and time
    const [hours, minutes] = startTime.split(":");
    const bookingDate = new Date(date);
    bookingDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

    const booking = await Booking.create({
      userId: session.user.id,
      spaceId,
      startTime: bookingDate,
      duration: parseInt(duration),
      status: "pending",
    });

    console.log("booking:", booking);

    console.log("[Bookings API] Booking created successfully:", booking._id);

    // Send confirmation email
    try {
      if (!session.user.email) {
        console.log(
          "[Bookings API] No email address found for user, skipping email notification"
        );
        return NextResponse.json({ success: true, booking });
      }

      const emailHtml = getBookingConfirmationEmail({
        userName: session.user.name || "User",
        spaceName: "Your Space", // You might want to fetch the actual space name
        date: date,
        startTime: startTime,
        bookingId: booking._id.toString(),
      });

      await sendEmail({
        to: session.user.email,
        subject: "Booking Confirmation",
        html: emailHtml,
      });

      console.log("[Bookings API] Confirmation email sent successfully");
    } catch (emailError) {
      console.error(
        "[Bookings API] Error sending confirmation email:",
        emailError
      );
      // Don't throw the error, as the booking was still created successfully
    }

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

    // Build query
    interface BookingQuery {
      userId: string;
      status?: string;
      startTime?: {
        $gte: Date;
      };
    }
    const query: BookingQuery = { userId: session.user.id };

    if (status) {
      query.status = status;
    }

    if (startDate) {
      query.startTime = {
        $gte: new Date(startDate),
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
