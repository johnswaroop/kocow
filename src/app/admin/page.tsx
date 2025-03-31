"use client";

import { useState, useEffect } from "react";
import { mockSpaces } from "@/data/mockSpaces";
import Link from "next/link";

interface Booking {
  id: string;
  spaceId: string;
  userId: string;
  userName: string;
  userEmail: string;
  startTime: string;
  status: string;
  duration: number;
  totalAmount: number;
}

interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  profession?: string;
  onboardingCompleted: boolean;
}

export default function AdminDashboard() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [bookingsRes, usersRes] = await Promise.all([
          fetch("/api/admin/bookings"),
          fetch("/api/admin/users"),
        ]);

        if (!bookingsRes.ok || !usersRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const [bookingsData, usersData] = await Promise.all([
          bookingsRes.json(),
          usersRes.json(),
        ]);

        setBookings(bookingsData.bookings || []);
        setUsers(usersData.users || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredBookings = bookings.filter((booking) => {
    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;

    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      (booking.userName?.toLowerCase() || "").includes(searchLower) ||
      (booking.userEmail?.toLowerCase() || "").includes(searchLower);

    // Date filtering
    const today = new Date();
    const bookingDate = new Date(booking.startTime);
    const isToday = bookingDate.toDateString() === today.toDateString();
    const isThisWeek =
      bookingDate >= new Date(today.setDate(today.getDate() - 7));

    const matchesDate =
      dateFilter === "all" ||
      (dateFilter === "today" && isToday) ||
      (dateFilter === "week" && isThisWeek);

    return matchesStatus && matchesSearch && matchesDate;
  });

  // Calculate dashboard stats
  const totalRevenue = bookings.reduce(
    (sum, booking) => sum + (booking.totalAmount || 0),
    0
  );
  const todayBookings = bookings.filter(
    (b) => new Date(b.startTime).toDateString() === new Date().toDateString()
  ).length;
  const weeklyBookings = bookings.filter(
    (b) =>
      new Date(b.startTime) >=
      new Date(new Date().setDate(new Date().getDate() - 7))
  ).length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-medium text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-medium text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-[rgb(255,70,46)]">
                Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center">
              <Link
                href="/admin/login"
                className="text-gray-700 hover:text-[rgb(255,70,46)] transition-colors font-medium"
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all border-l-4 border-[rgb(255,70,46)]">
            <h3 className="text-gray-600 text-sm font-medium">Total Revenue</h3>
            <p className="text-2xl font-bold text-[rgb(255,70,46)]">
              ₹{totalRevenue}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all border-l-4 border-blue-500">
            <h3 className="text-gray-600 text-sm font-medium">
              Today&apos;s Bookings
            </h3>
            <p className="text-2xl font-bold text-blue-600">{todayBookings}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all border-l-4 border-green-500">
            <h3 className="text-gray-600 text-sm font-medium">
              Weekly Bookings
            </h3>
            <p className="text-2xl font-bold text-green-600">
              {weeklyBookings}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all border-l-4 border-purple-500">
            <h3 className="text-gray-600 text-sm font-medium">Total Users</h3>
            <p className="text-2xl font-bold text-purple-600">{users.length}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search bookings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-[rgb(255,70,46)] focus:ring-[rgb(255,70,46)] pl-10 py-2.5 text-base text-gray-900 placeholder-gray-500 bg-white"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-md border-2 border-gray-300 shadow-sm focus:border-[rgb(255,70,46)] focus:ring-[rgb(255,70,46)] bg-white px-4 py-2.5 text-base text-gray-900 font-medium min-w-[140px] cursor-pointer hover:border-[rgb(255,70,46)] transition-colors appearance-none"
              >
                <option value="all" className="text-gray-900 py-2">
                  All Status
                </option>
                <option value="pending" className="text-gray-900 py-2">
                  Pending
                </option>
                <option value="confirmed" className="text-gray-900 py-2">
                  Confirmed
                </option>
                <option value="completed" className="text-gray-900 py-2">
                  Completed
                </option>
                <option value="cancelled" className="text-gray-900 py-2">
                  Cancelled
                </option>
              </select>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="rounded-md border-2 border-gray-300 shadow-sm focus:border-[rgb(255,70,46)] focus:ring-[rgb(255,70,46)] bg-white px-4 py-2.5 text-base text-gray-900 font-medium min-w-[140px] cursor-pointer hover:border-[rgb(255,70,46)] transition-colors appearance-none"
              >
                <option value="all" className="text-gray-900 py-2">
                  All Time
                </option>
                <option value="today" className="text-gray-900 py-2">
                  Today
                </option>
                <option value="week" className="text-gray-900 py-2">
                  This Week
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-800">
              Recent Bookings
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Booking ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Space
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {booking.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {booking.userName || "Unknown User"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {mockSpaces.find((s) => s.id === booking.spaceId)?.name ||
                        "Unknown Space"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(booking.startTime).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {booking.duration || 0} hours
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[rgb(255,70,46)]">
                      ₹{booking.totalAmount || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${
                          booking.status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : ""
                        }
                        ${
                          booking.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : ""
                        }
                        ${
                          booking.status === "completed"
                            ? "bg-blue-100 text-blue-800"
                            : ""
                        }
                        ${
                          booking.status === "cancelled"
                            ? "bg-red-100 text-red-800"
                            : ""
                        }`}
                      >
                        {booking.status || "Unknown"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-[rgb(255,70,46)] hover:text-[rgb(255,70,46)]/80 transition-colors font-medium">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
