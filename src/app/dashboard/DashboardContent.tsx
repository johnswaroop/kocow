"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User } from "@/lib/auth";
import { mockSpaces } from "@/data/mockSpaces";

interface Booking {
  _id: string;
  spaceId: string;
  startTime: string;
  endTime: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  createdAt: string;
}

interface DashboardContentProps {
  user: User;
}

export default function DashboardContent({ user }: DashboardContentProps) {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("/api/bookings");
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        const data = await response.json();
        setBookings(data.bookings);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load bookings"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Filter bookings based on status and date
  const filteredBookings = bookings.filter((booking) => {
    const bookingDate = new Date(booking.startTime);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);

    // Status filter
    if (statusFilter !== "all" && booking.status !== statusFilter) {
      return false;
    }

    // Date filter
    switch (dateFilter) {
      case "today":
        return bookingDate.toDateString() === today.toDateString();
      case "tomorrow":
        return bookingDate.toDateString() === tomorrow.toDateString();
      case "week":
        return bookingDate <= nextWeek;
      case "all":
      default:
        return true;
    }
  });

  // Get space details for a booking
  const getSpaceDetails = (spaceId: string) => {
    return (
      mockSpaces.find((space) => space.id === spaceId) || {
        name: "Unknown Space",
        description: "Space details not available",
        images: [
          "https://images.unsplash.com/photo-1497366216548-37526070297c",
        ],
        category: "Unknown",
        capacity: 0,
        hourlyRate: 0,
      }
    );
  };

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
                    alt={user.name || "User"}
                    className="w-16 h-16 rounded-lg mr-4 border-2 border-white/50"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-lg bg-[rgb(255,70,46)]/10 flex items-center justify-center mr-4">
                    <span className="text-2xl font-bold text-[rgb(255,70,46)]">
                      {(user.name || "U").charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    Welcome back, {(user.name || "User").split(" ")[0]}!
                  </h1>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  href="/spaces"
                  className="px-6 py-2.5 bg-[rgb(255,70,46)] text-white rounded-md hover:bg-[rgb(255,70,46)]/90 transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
                >
                  <svg
                    className="w-5 h-5"
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
                    />
                  </svg>
                  Book Now
                </Link>
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
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Link
              href="/spaces"
              className="bg-white/30 backdrop-blur-md p-6 rounded-lg border border-white/20 shadow-lg hover:bg-white/40 transition-all duration-300 group"
            >
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 rounded-md bg-[rgb(255,70,46)] flex items-center justify-center text-white mr-3 group-hover:scale-110 transition-transform duration-200">
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
                <h2 className="text-xl font-semibold text-gray-800 group-hover:text-[rgb(255,70,46)] transition-colors duration-200">
                  Browse Spaces
                </h2>
              </div>
              <p className="text-gray-600 ml-13 pl-1">
                Discover and book available coworking spaces that match your
                needs
              </p>
            </Link>
          </div>

          {/* Bookings section */}
          <div className="bg-white/30 backdrop-blur-md p-6 mb-8 rounded-lg border border-white/20 shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                  Your Bookings
                </h2>
                <p className="text-sm text-gray-600">
                  Manage and view all your workspace bookings
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
                {/* Status filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 bg-white/50 backdrop-blur-sm border border-white/30 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-[rgb(255,70,46)]/50 focus:border-transparent transition-all duration-200"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="completed">Completed</option>
                </select>

                {/* Date filter */}
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="px-4 py-2 bg-white/50 backdrop-blur-sm border border-white/30 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-[rgb(255,70,46)]/50 focus:border-transparent transition-all duration-200"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="tomorrow">Tomorrow</option>
                  <option value="week">Next 7 Days</option>
                </select>
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[rgb(255,70,46)]"></div>
              </div>
            ) : error ? (
              <div className="text-center py-8 px-4">
                <div className="text-red-500 mb-4">{error}</div>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-[rgb(255,70,46)] text-white rounded-md hover:bg-[rgb(255,70,46)]/90 transition-all duration-200"
                >
                  Try Again
                </button>
              </div>
            ) : filteredBookings.length > 0 ? (
              <div className="space-y-4">
                {filteredBookings.map((booking) => {
                  const space = getSpaceDetails(booking.spaceId);
                  return (
                    <div
                      key={booking._id}
                      className="bg-white/50 backdrop-blur-sm rounded-lg border border-white/20 overflow-hidden hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex flex-col md:flex-row">
                        {/* Space Image */}
                        <div className="relative md:w-1/4 h-48 md:h-auto">
                          <img
                            src={space.images[0]}
                            alt={space.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2">
                            <span
                              className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                                booking.status === "confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : booking.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : booking.status === "cancelled"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {booking.status}
                            </span>
                          </div>
                        </div>

                        {/* Booking Details */}
                        <div className="flex-1 p-4">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                {space.name}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {space.category}
                              </p>
                            </div>
                            <button
                              onClick={() =>
                                router.push(`/booking/${booking._id}`)
                              }
                              className="mt-2 md:mt-0 px-4 py-1.5 bg-[rgb(255,70,46)] text-white rounded-md hover:bg-[rgb(255,70,46)]/90 transition-all duration-200 text-sm"
                            >
                              View Details
                            </button>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <div className="flex items-center text-gray-600">
                              <svg
                                className="w-4 h-4 mr-1.5"
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
                                />
                              </svg>
                              <div>
                                <p className="text-xs font-medium text-gray-500">
                                  Date
                                </p>
                                <p className="text-sm text-gray-800">
                                  {new Date(
                                    booking.startTime
                                  ).toLocaleDateString()}{" "}
                                  -{" "}
                                  {new Date(
                                    booking.endTime
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center text-gray-600">
                              <svg
                                className="w-4 h-4 mr-1.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              <div>
                                <p className="text-xs font-medium text-gray-500">
                                  Time
                                </p>
                                <p className="text-sm text-gray-800">
                                  {new Date(
                                    booking.startTime
                                  ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}{" "}
                                  -{" "}
                                  {new Date(booking.endTime).toLocaleTimeString(
                                    [],
                                    {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    }
                                  )}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center text-gray-600">
                              <svg
                                className="w-4 h-4 mr-1.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                              </svg>
                              <div>
                                <p className="text-xs font-medium text-gray-500">
                                  Capacity
                                </p>
                                <p className="text-sm text-gray-800">
                                  {space.capacity} people
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center text-gray-600">
                              <svg
                                className="w-4 h-4 mr-1.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              <div>
                                <p className="text-xs font-medium text-gray-500">
                                  Rate
                                </p>
                                <p className="text-sm text-gray-800">
                                  ₹{space.hourlyRate}/hour
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
                  No bookings found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or browse our spaces to make a new
                  booking!
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
