"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User } from "@/lib/auth";

interface DashboardContentProps {
  user: User;
}

export default function DashboardContent({ user }: DashboardContentProps) {
  const router = useRouter();
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This would typically fetch the user's bookings from the API
    // Using a timeout to simulate loading for now
    const timer = setTimeout(() => {
      setUpcomingBookings([]);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSignOut = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[rgb(255,70,46)]/10 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 -right-24 w-96 h-96 bg-[rgb(255,70,46)]/5 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-24 left-1/3 w-96 h-96 bg-[rgb(255,70,46)]/10 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Welcome card */}
          <div className="bg-white/30 backdrop-blur-md p-6 mb-8 rounded-lg border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-16 h-16 rounded-lg mr-4 border-2 border-white/50"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-lg bg-[rgb(255,70,46)]/10 flex items-center justify-center mr-4">
                    <span className="text-2xl font-bold text-[rgb(255,70,46)]">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    Welcome back, {user.name.split(" ")[0]}!
                  </h1>
                  <p className="text-gray-600">
                    {user.profession
                      ? `${user.profession} | ${user.email}`
                      : user.email}
                  </p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 bg-white/40 backdrop-blur-sm text-gray-700 rounded-md hover:bg-white/60 transition-all duration-200 border border-white/30 flex items-center space-x-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Link
              href="/spaces"
              className="bg-white/30 backdrop-blur-md p-6 rounded-lg border border-white/20 shadow-lg hover:bg-white/40 transition-all duration-300"
            >
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 rounded-md bg-[rgb(255,70,46)] flex items-center justify-center text-white mr-3">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    ></path>
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Browse Spaces
                </h2>
              </div>
              <p className="text-gray-600 ml-13 pl-1">
                Discover and book available coworking spaces that match your
                needs
              </p>
            </Link>

            <div className="bg-white/30 backdrop-blur-md p-6 rounded-lg border border-white/20 shadow-lg">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 rounded-md bg-[rgb(255,70,46)] flex items-center justify-center text-white mr-3">
                  <svg
                    className="w-6 h-6"
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
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  My Bookings
                </h2>
              </div>
              <p className="text-gray-600 ml-13 pl-1">
                View and manage your upcoming and past bookings
              </p>
            </div>
          </div>

          {/* Upcoming bookings */}
          <div className="bg-white/30 backdrop-blur-md p-6 mb-8 rounded-lg border border-white/20 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Upcoming Bookings
            </h2>

            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[rgb(255,70,46)]"></div>
              </div>
            ) : upcomingBookings.length > 0 ? (
              <div className="space-y-4">
                {/* Bookings would be mapped here */}
                <p>Your bookings will appear here</p>
              </div>
            ) : (
              <div className="text-center py-8 px-4">
                <svg
                  className="w-16 h-16 text-[rgb(255,70,46)]/30 mx-auto mb-4"
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
                <h3 className="text-gray-800 font-medium mb-2">
                  No bookings yet
                </h3>
                <p className="text-gray-600 mb-6">
                  You don't have any upcoming bookings. Browse our spaces to
                  book your first workspace!
                </p>
                <Link
                  href="/spaces"
                  className="px-6 py-3 bg-[rgb(255,70,46)] hover:bg-[rgb(255,70,46)]/90 text-white rounded-md shadow-md hover:shadow-lg transition-all duration-300 inline-block"
                >
                  Browse Spaces
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
