"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { mockSpaces } from "@/data/mockSpaces";
import { Suspense } from "react";

function BookingConfirmationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get query params
  const spaceId = searchParams.get("spaceId");
  const date = searchParams.get("date");
  const startTime = searchParams.get("startTime");
  const duration = searchParams.get("duration");
  const total = searchParams.get("total");

  // Find space from mock data
  const space = mockSpaces.find((s) => s.id === spaceId);

  // Redirect to dashboard after 3 seconds
  useEffect(() => {
    if (!spaceId || !date || !startTime || !duration || !total || !space) {
      router.push("/spaces");
      return;
    }

    const timer = setTimeout(() => {
      router.push("/dashboard");
    }, 3000);

    return () => clearTimeout(timer);
  }, [spaceId, date, startTime, duration, total, space, router]);

  // If required params are missing, show loading
  if (!spaceId || !date || !startTime || !duration || !total || !space) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="w-full h-96 rounded-lg bg-white/30 backdrop-blur-md animate-pulse"></div>
        </div>
      </div>
    );
  }

  // Calculate end time
  const startTimeObj = new Date(`2000-01-01T${startTime}`);
  const endTimeObj = new Date(
    startTimeObj.getTime() + parseInt(duration) * 60 * 60 * 1000
  );
  const endTime = endTimeObj.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[rgb(255,70,46)]/10 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 -right-24 w-96 h-96 bg-[rgb(255,70,46)]/5 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-24 left-1/3 w-96 h-96 bg-[rgb(255,70,46)]/10 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Success card */}
          <div className="rounded-lg backdrop-blur-md bg-white/30 border border-white/20 shadow-lg overflow-hidden mb-8">
            <div className="p-6">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-[rgb(255,70,46)]/10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-[rgb(255,70,46)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
                Booking Confirmed!
              </h1>
              <p className="text-gray-600 text-center">
                Thank you for choosing Kohinoor Spaces. Your booking has been
                confirmed.
              </p>
              <p className="text-sm text-gray-500 text-center mt-4">
                Redirecting to dashboard...
              </p>
            </div>
          </div>

          {/* Booking details */}
          <div className="rounded-lg backdrop-blur-md bg-white/30 border border-white/20 shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Booking Details
              </h2>

              <div className="space-y-6">
                {/* Booking ID */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-[rgb(255,70,46)]/10 rounded-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-[rgb(255,70,46)]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-600">Booking ID</span>
                  </div>
                  <span className="text-gray-800 font-medium">{spaceId}</span>
                </div>

                {/* Space name */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-[rgb(255,70,46)]/10 rounded-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-[rgb(255,70,46)]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-600">Space</span>
                  </div>
                  <span className="text-gray-800 font-medium">
                    {space.name}
                  </span>
                </div>

                {/* Date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-[rgb(255,70,46)]/10 rounded-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-[rgb(255,70,46)]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-600">Date</span>
                  </div>
                  <span className="text-gray-800 font-medium">{date}</span>
                </div>

                {/* Time */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-[rgb(255,70,46)]/10 rounded-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-[rgb(255,70,46)]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-600">Time</span>
                  </div>
                  <span className="text-gray-800 font-medium">
                    {startTime} - {endTime}
                  </span>
                </div>

                {/* Duration */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-[rgb(255,70,46)]/10 rounded-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-[rgb(255,70,46)]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-600">Duration</span>
                  </div>
                  <span className="text-gray-800 font-medium">
                    {duration} hour{parseInt(duration) > 1 ? "s" : ""}
                  </span>
                </div>

                <div className="w-full h-px bg-gray-200 my-4"></div>

                {/* Total */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-[rgb(255,70,46)]/10 rounded-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-[rgb(255,70,46)]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-600">Total</span>
                  </div>
                  <span className="text-gray-800 font-medium">₹{total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ParentContainer() {
  return (
    <Suspense>
      <BookingConfirmationPage></BookingConfirmationPage>
    </Suspense>
  );
}
