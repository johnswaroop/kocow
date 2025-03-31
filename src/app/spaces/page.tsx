"use client";

import { useRouter } from "next/navigation";
import { mockSpaces } from "@/data/mockSpaces";
import SpaceCard from "@/components/spaces/SpaceCard";

export default function SpacesPage() {
  const router = useRouter();

  const handleSpaceClick = (spaceId: string) => {
    router.push(`/spaces/${spaceId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[rgb(255,70,46)]/5 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 -right-24 w-96 h-96 bg-[rgb(255,70,46)]/3 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-24 left-1/3 w-96 h-96 bg-[rgb(255,70,46)]/5 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Refined title section */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Available <span className="text-[rgb(255,70,46)]">Spaces</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Browse our selection of premium coworking spaces and find the
            perfect environment for your work style.
          </p>
        </div>

        {/* Spaces grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {mockSpaces.map((space) => (
            <SpaceCard
              key={space.id}
              space={space}
              onClick={() => handleSpaceClick(space.id)}
            />
          ))}
        </div>

        {/* Refined Dashboard CTA */}
        <div className="mt-20 bg-white/40 backdrop-blur-sm rounded-xl shadow-sm p-8 border border-gray-100/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-left max-w-2xl">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
                Manage Your Bookings
              </h2>
              <p className="text-gray-600 text-sm md:text-base">
                Access your dashboard to view your current bookings, manage
                reservations, and track your space usage history.
              </p>
            </div>
            <button
              onClick={() => router.push("/dashboard")}
              className="px-5 py-2.5 bg-[rgb(255,70,46)] text-white rounded-md hover:bg-[rgb(255,70,46)]/90 transition-all duration-300 flex items-center gap-2 whitespace-nowrap text-sm md:text-base"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 md:h-5 md:w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zM3 16a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z" />
              </svg>
              My Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
