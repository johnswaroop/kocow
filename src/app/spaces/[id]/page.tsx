"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { mockSpaces, Space } from "@/data/mockSpaces";
import BookingCalendar from "@/components/booking/BookingCalendar";

interface SpacePageProps {
  params: {
    id: string;
  };
}

export default function SpacePage({ params }: SpacePageProps) {
  const router = useRouter();
  const [space, setSpace] = useState<Space | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [showBookingForm, setShowBookingForm] = useState(false);

  // Fetch space data (using mock data for now)
  useEffect(() => {
    const fetchSpace = () => {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        const foundSpace = mockSpaces.find((s) => s.id === params.id);
        if (foundSpace) {
          setSpace(foundSpace);
          setIsLoading(false);
        } else {
          // Space not found
          router.push("/spaces");
        }
      }, 500);
    };

    fetchSpace();
  }, [params.id, router]);

  const handleBookNowClick = () => {
    setShowBookingForm(!showBookingForm);
  };

  // Skeleton loader for when space is loading
  if (isLoading || !space) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 py-12">
        <div className="container mx-auto px-4">
          <div className="w-full h-96 rounded-2xl bg-white/30 backdrop-blur-md animate-pulse mb-8"></div>
          <div className="w-1/2 h-10 bg-white/30 backdrop-blur-md animate-pulse mb-4"></div>
          <div className="w-full h-24 bg-white/30 backdrop-blur-md animate-pulse mb-6"></div>
          <div className="w-full h-64 bg-white/30 backdrop-blur-md animate-pulse"></div>
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
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="flex items-center mb-6 px-4 py-2 bg-white/40 backdrop-blur-sm text-gray-700 rounded-xl hover:bg-white/60 transition-all duration-200 border border-white/30"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Spaces
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Images and info */}
          <div className="lg:col-span-2">
            {/* Main image */}
            <div className="w-full rounded-2xl backdrop-blur-md bg-white/30 border border-white/20 shadow-lg overflow-hidden mb-4">
              <div className="relative w-full h-96">
                <Image
                  src={`${space.images[currentImage]}?auto=format&fit=crop&w=1200&q=80`}
                  alt={space.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/60 to-transparent">
                  <span className="inline-block px-3 py-1 text-sm font-semibold text-white bg-indigo-600/90 backdrop-blur-sm rounded-full">
                    {space.category}
                  </span>
                </div>
              </div>
            </div>

            {/* Thumbnail images */}
            <div className="flex space-x-2 mb-8">
              {space.images.map((image, index) => (
                <div
                  key={index}
                  className={`relative w-24 h-24 rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-200 ${
                    index === currentImage
                      ? "border-indigo-600 shadow-md"
                      : "border-transparent"
                  }`}
                  onClick={() => setCurrentImage(index)}
                >
                  <Image
                    src={`${image}?auto=format&fit=crop&w=200&q=80`}
                    alt={`${space.name} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Space details */}
            <div className="rounded-2xl backdrop-blur-md bg-white/30 border border-white/20 shadow-lg p-6 mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {space.name}
              </h1>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center space-x-2 bg-indigo-100/70 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-indigo-700"
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
                  <span className="text-sm font-medium text-indigo-700">
                    Capacity: {space.capacity} people
                  </span>
                </div>

                <div className="flex items-center space-x-2 bg-indigo-100/70 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-indigo-700"
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
                  <span className="text-sm font-medium text-indigo-700">
                    ${space.hourlyRate}/hour
                  </span>
                </div>
              </div>

              <p className="text-gray-700 mb-6">{space.description}</p>

              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  Amenities
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {space.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 py-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-indigo-600"
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
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Booking section */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="rounded-2xl backdrop-blur-md bg-white/30 border border-white/20 shadow-lg overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Book This Space
                  </h2>

                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Hourly Rate</span>
                      <span className="text-xl font-bold text-gray-800">
                        ${space.hourlyRate}
                      </span>
                    </div>
                    <div className="w-full h-px bg-gray-200 my-3"></div>
                    <div className="text-gray-600 text-sm">
                      Select a date and time to book this space. Bookings are
                      available in 1-hour increments.
                    </div>
                  </div>

                  <button
                    onClick={handleBookNowClick}
                    className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    {showBookingForm ? "Hide Booking Form" : "Book Now"}
                  </button>
                </div>

                {/* Booking form */}
                {showBookingForm && (
                  <div className="p-6 border-t border-gray-200/50">
                    <BookingCalendar
                      spaceId={space.id}
                      hourlyRate={space.hourlyRate}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
