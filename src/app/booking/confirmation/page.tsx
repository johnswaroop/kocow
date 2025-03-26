"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { mockSpaces } from "@/data/mockSpaces";
import Link from "next/link";

export default function BookingConfirmationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [bookingId, setBookingId] = useState<string>("");

  // Get query params
  const spaceId = searchParams.get("spaceId");
  const date = searchParams.get("date");
  const startTime = searchParams.get("startTime");
  const duration = searchParams.get("duration");
  const total = searchParams.get("total");

  // Find space from mock data
  const space = mockSpaces.find((s) => s.id === spaceId);

  // Generate a fake booking ID on load
  useEffect(() => {
    // Generate a random booking ID
    const randomId = Math.random().toString(36).substring(2, 10).toUpperCase();
    setBookingId(`KS-${randomId}`);
  }, []);

  // Calculate end time
  const calculateEndTime = () => {
    if (!startTime) return "";

    const [hours, minutes] = startTime.split(":").map(Number);
    const durationNum = duration ? parseInt(duration) : 0;
    const endHours = hours + durationNum;
    const formattedEndHours = endHours < 10 ? `0${endHours}` : `${endHours}`;

    return `${formattedEndHours}:${minutes === 0 ? "00" : minutes}`;
  };

  // If required params are missing, redirect back to spaces
  useEffect(() => {
    if (!spaceId || !date || !startTime || !duration || !total || !space) {
      router.push("/spaces");
    }
  }, [spaceId, date, startTime, duration, total, space, router]);

  // If required params are missing, show loading
  if (!spaceId || !date || !startTime || !duration || !total || !space) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 py-12">
        <div className="container mx-auto px-4">
          <div className="w-full h-96 rounded-2xl bg-white/30 backdrop-blur-md animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 -right-24 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-24 left-1/3 w-96 h-96 bg-violet-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Success card */}
          <div className="rounded-2xl backdrop-blur-md bg-white/30 border border-white/20 shadow-lg overflow-hidden text-center p-8">
            {/* Success icon */}
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Booking Confirmed!
            </h1>
            <p className="text-gray-600 mb-8">
              Your space has been successfully booked. An email confirmation has
              been sent to your registered email address.
            </p>

            {/* Booking details */}
            <div className="rounded-xl bg-white/50 backdrop-blur-sm p-6 mb-8 text-left border border-white/30">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Booking Details
              </h2>

              <div className="grid grid-cols-2 gap-y-4 text-sm">
                <div>
                  <p className="text-gray-500">Booking ID:</p>
                  <p className="font-medium text-gray-800">{bookingId}</p>
                </div>
                <div>
                  <p className="text-gray-500">Space:</p>
                  <p className="font-medium text-gray-800">{space.name}</p>
                </div>
                <div>
                  <p className="text-gray-500">Date:</p>
                  <p className="font-medium text-gray-800">
                    {new Date(date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Time:</p>
                  <p className="font-medium text-gray-800">
                    {startTime} - {calculateEndTime()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Duration:</p>
                  <p className="font-medium text-gray-800">
                    {duration} hour{parseInt(duration) > 1 ? "s" : ""}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Total Amount:</p>
                  <p className="font-medium text-gray-800">
                    ${parseFloat(total).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="px-6 py-3 bg-white/40 backdrop-blur-sm text-gray-700 rounded-xl hover:bg-white/60 transition-all duration-200 border border-white/30 text-center"
              >
                View My Bookings
              </Link>

              <Link
                href="/spaces"
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center"
              >
                Book Another Space
              </Link>
            </div>
          </div>

          {/* Calendar button */}
          <div className="mt-8 text-center">
            <button className="inline-flex items-center px-4 py-2 bg-white/40 backdrop-blur-sm text-gray-700 rounded-lg hover:bg-white/60 transition-all duration-200 border border-white/30 text-sm">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
              Add to Calendar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
