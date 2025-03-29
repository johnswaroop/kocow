import Image from "next/image";
import { Space } from "@/data/mockSpaces";

interface SpaceCardProps {
  space: Space;
  onClick: () => void;
}

export default function SpaceCard({ space, onClick }: SpaceCardProps) {
  return (
    <div className="group cursor-pointer h-full" onClick={onClick}>
      <div className="h-full overflow-hidden rounded-lg backdrop-blur-md bg-white/30 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/40 flex flex-col">
        {/* Image container with overlay */}
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={`${space.images[0]}?auto=format&fit=crop&w=600&q=80`}
            alt={space.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
            <div className="p-4 w-full">
              <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-[rgb(255,70,46)]/90 backdrop-blur-sm rounded-md">
                {space.category}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-[rgb(255,70,46)] transition-colors">
              {space.name}
            </h3>
            <div className="flex items-center space-x-1 bg-[rgb(255,70,46)]/10 backdrop-blur-sm px-2 py-1 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-[rgb(255,70,46)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="text-sm font-medium text-[rgb(255,70,46)]">
                {space.capacity}
              </span>
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-4 flex-grow">
            {space.shortDescription}
          </p>

          {/* Amenities */}
          <div className="flex flex-wrap gap-2 mb-4">
            {space.amenities.slice(0, 3).map((amenity, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-[rgb(255,70,46)]/10 text-[rgb(255,70,46)] rounded-md border border-[rgb(255,70,46)]/20 hover:bg-[rgb(255,70,46)]/20 hover:border-[rgb(255,70,46)]/40 transition-all duration-200"
              >
                {amenity}
              </span>
            ))}
            {space.amenities.length > 3 && (
              <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-[rgb(255,70,46)]/10 text-[rgb(255,70,46)] rounded-md border border-[rgb(255,70,46)]/20 hover:bg-[rgb(255,70,46)]/20 hover:border-[rgb(255,70,46)]/40 transition-all duration-200">
                +{space.amenities.length - 3} more
              </span>
            )}
          </div>

          {/* Price and book button */}
          <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-200/50">
            <div className="flex flex-col">
              <div className="flex items-center justify-between gap-2">
                <span className="text-gray-600">Hourly Rate</span>
                <span className="text-lg font-bold text-gray-800">
                  ₹{space.hourlyRate}
                </span>
              </div>
            </div>
            <button className="px-4 py-2 bg-[rgb(255,70,46)] text-white text-sm font-medium rounded-md hover:bg-[rgb(255,70,46)]/90 transition-all duration-300 hover:shadow-md">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
