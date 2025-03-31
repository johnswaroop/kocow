"use client";

import Link from "next/link";
import { mockSpaces } from "@/data/mockSpaces";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[rgb(255,70,46)]/10 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 -right-24 w-96 h-96 bg-[rgb(255,70,46)]/5 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-24 left-1/3 w-96 h-96 bg-[rgb(255,70,46)]/10 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c"
            alt="Coworking Space"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Your Perfect Workspace Awaits
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Book flexible coworking spaces, private offices, and virtual offices
            with ease. Start working in your ideal environment today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/spaces"
              className="px-8 py-4 bg-[rgb(255,70,46)] text-white rounded-md hover:bg-[rgb(255,70,46)]/90 transition-all duration-200 text-lg font-medium shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
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
            <Link
              href="/spaces"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-md hover:bg-white/20 transition-all duration-200 text-lg font-medium border border-white/20 flex items-center justify-center gap-2"
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
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              View Spaces
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Spaces Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Featured Workspaces
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most popular workspaces, designed to meet your
              professional needs with flexible booking options.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockSpaces.map((space) => (
              <div
                key={space.id}
                className="bg-white/30 backdrop-blur-md rounded-lg border border-white/20 overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                <div className="relative h-48">
                  <img
                    src={space.images[0]}
                    alt={space.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-semibold text-white mb-1">
                      {space.name}
                    </h3>
                    <p className="text-white/90 text-sm">{space.category}</p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-gray-600">
                      <svg
                        className="w-5 h-5 mr-1"
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
                      <span className="text-sm">{space.capacity} people</span>
                    </div>
                    {space.id !== "space-002" && space.id !== "space-003" && (
                      <div className="text-[rgb(255,70,46)] font-semibold">
                        ₹{space.hourlyRate}/hour
                      </div>
                    )}
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {space.shortDescription}
                  </p>

                  <Link
                    href={`/spaces/${space.id}`}
                    className={`block w-full px-4 py-2 bg-[rgb(255,70,46)] text-white rounded-md hover:bg-[rgb(255,70,46)]/90 transition-all duration-200 text-center ${
                      space.id === "space-002" || space.id === "space-003"
                        ? "bg-[rgb(255,70,46)]"
                        : ""
                    }`}
                  >
                    {space.id === "space-002" || space.id === "space-003"
                      ? "Contact Us"
                      : "Book Now"}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 relative z-10 bg-white/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Why Choose Our Workspaces?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the perfect blend of comfort, productivity, and
              flexibility in our carefully designed workspaces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/30 backdrop-blur-md p-6 rounded-lg border border-white/20">
              <div className="w-12 h-12 bg-[rgb(255,70,46)]/10 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-[rgb(255,70,46)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                High-Speed Internet
              </h3>
              <p className="text-gray-600">
                Stay connected with our reliable, high-speed internet connection
                available 24/7.
              </p>
            </div>

            <div className="bg-white/30 backdrop-blur-md p-6 rounded-lg border border-white/20">
              <div className="w-12 h-12 bg-[rgb(255,70,46)]/10 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-[rgb(255,70,46)]"
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
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Flexible Booking
              </h3>
              <p className="text-gray-600">
                Book by the hour or day with our flexible scheduling options to
                suit your needs.
              </p>
            </div>

            <div className="bg-white/30 backdrop-blur-md p-6 rounded-lg border border-white/20">
              <div className="w-12 h-12 bg-[rgb(255,70,46)]/10 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-[rgb(255,70,46)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Professional Environment
              </h3>
              <p className="text-gray-600">
                Work in a clean, professional environment with modern amenities
                and comfortable seating.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-600 mb-8">
            Join our community of professionals and find your perfect workspace
            today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/spaces"
              className="px-8 py-4 bg-[rgb(255,70,46)] text-white rounded-md hover:bg-[rgb(255,70,46)]/90 transition-all duration-200 text-lg font-medium shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
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
              Book Your Space
            </Link>
            <Link
              href="/auth/signin"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-gray-800 rounded-md hover:bg-white/20 transition-all duration-200 text-lg font-medium border border-gray-200 flex items-center justify-center gap-2"
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
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
