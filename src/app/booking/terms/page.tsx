"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { mockSpaces } from "@/data/mockSpaces";
import { User } from "@/lib/auth";

function BookingTermsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const termsContainerRef = useRef<HTMLDivElement>(null);

  const [hasScrolled, setHasScrolled] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Get query params
  const spaceId = searchParams.get("spaceId");
  const date = searchParams.get("date");
  const startTime = searchParams.get("startTime");
  const endTime = searchParams.get("endTime");
  const duration = searchParams.get("duration");
  const total = searchParams.get("total");
  const userId = searchParams.get("userId");

  // Find space from mock data
  const space = mockSpaces.find((s) => s.id === spaceId);

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/user");
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        router.push("/auth/signin");
      }
    };

    fetchUser();
  }, [router]);

  // Handle scroll events to enable the checkbox
  useEffect(() => {
    const handleScroll = () => {
      if (!termsContainerRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } =
        termsContainerRef.current;
      // Consider scrolled if user has scrolled at least 70% of the content
      if (scrollTop + clientHeight >= scrollHeight * 0.7) {
        setHasScrolled(true);
      }
    };

    const termsContainer = termsContainerRef.current;
    if (termsContainer) {
      termsContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (termsContainer) {
        termsContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  // Handle checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isChecked) {
      alert("Please agree to the terms and conditions to continue.");
      return;
    }

    if (!user || user.id !== userId) {
      alert("Authentication error. Please try again.");
      router.push("/auth/signin");
      return;
    }

    setIsLoading(true);

    try {
      // Create booking
      console.log("spaceId:", spaceId);
      console.log("userId:", userId);
      console.log("date:", date);
      console.log("startTime:", startTime);
      console.log("endTime:", endTime);
      console.log("duration:", duration);
      console.log("total:", total);

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          spaceId,
          userId,
          date,
          startTime,
          endTime,
          duration: parseInt(duration || "0"),
          total: parseFloat(total || "0"),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create booking");
      }

      // Redirect to booking confirmation page
      router.push(
        `/booking/confirmation?spaceId=${spaceId}&date=${date}&startTime=${startTime}&endTime=${endTime}&duration=${duration}&total=${total}`
      );
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Failed to create booking. Please try again.");
      setIsLoading(false);
    }
  };

  // If required params are missing, redirect back to spaces
  useEffect(() => {
    if (
      !spaceId ||
      !date ||
      !startTime ||
      !endTime ||
      !duration ||
      !total ||
      !space ||
      !userId
    ) {
      router.push("/spaces");
    }
  }, [
    spaceId,
    date,
    startTime,
    endTime,
    duration,
    total,
    space,
    userId,
    router,
  ]);

  // If required params are missing, show loading
  if (
    !spaceId ||
    !date ||
    !startTime ||
    !endTime ||
    !duration ||
    !total ||
    !space ||
    !userId
  ) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="w-full h-96 rounded-lg bg-white/30 backdrop-blur-md animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[rgb(255,70,46)]/10 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 -right-24 w-96 h-96 bg-[rgb(255,70,46)]/5 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-24 left-1/3 w-96 h-96 bg-[rgb(255,70,46)]/10 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-12 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Progress indicator */}
          <div className="mb-8 md:mb-14">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative">
              {/* Mobile connecting lines */}
              <div className="absolute left-4 top-10 bottom-10 w-0.5 bg-[rgb(255,70,46)]/10 md:hidden"></div>

              {/* Step 1 */}
              <div className="flex items-center w-full md:w-auto mb-12 md:mb-0 relative">
                <div className="w-10 h-10 md:w-8 md:h-8 rounded-full bg-[rgb(255,70,46)] text-white flex items-center justify-center font-medium text-base md:text-sm relative z-10 border border-white/50">
                  1
                </div>
                <div className="ml-4 md:ml-3 text-base md:text-sm font-medium text-gray-700">
                  Select Space
                </div>
              </div>

              {/* Desktop connecting line 1 */}
              <div className="hidden md:block flex-1 h-0.5 mx-4 bg-[rgb(255,70,46)]/10"></div>

              {/* Step 2 */}
              <div className="flex items-center w-full md:w-auto mb-12 md:mb-0 relative">
                <div className="w-10 h-10 md:w-8 md:h-8 rounded-full bg-[rgb(255,70,46)] text-white flex items-center justify-center font-medium text-base md:text-sm relative z-10 border border-white/50">
                  2
                </div>
                <div className="ml-4 md:ml-3 text-base md:text-sm font-medium text-gray-700">
                  Select Date & Time
                </div>
              </div>

              {/* Desktop connecting line 2 */}
              <div className="hidden md:block flex-1 h-0.5 mx-4 bg-[rgb(255,70,46)]/10"></div>

              {/* Step 3 */}
              <div className="flex items-center w-full md:w-auto relative">
                <div className="w-10 h-10 md:w-8 md:h-8 rounded-full bg-[rgb(255,70,46)] text-white flex items-center justify-center font-medium text-base md:text-sm relative z-10 border border-white/50">
                  3
                </div>
                <div className="ml-4 md:ml-3 text-base md:text-sm font-medium text-gray-700">
                  Terms & Conditions
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="rounded-lg bg-white/90 border border-[rgb(255,70,46)]/10 overflow-hidden">
            <div className="p-4 md:p-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">
                Terms & Conditions
              </h1>

              {/* Booking summary */}
              <div className="rounded-lg bg-white/80 border border-[rgb(255,70,46)]/10 p-4 md:p-8 mb-6 md:mb-10">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
                  Booking Summary
                </h2>
                <div className="space-y-6 md:space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                    <div className="flex items-center space-x-4 md:space-x-3">
                      <div className="p-2.5 md:p-2 bg-[rgb(255,70,46)]/10 rounded-md border border-[rgb(255,70,46)]/20">
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
                      <span className="text-base text-gray-600">Date</span>
                    </div>
                    <span className="text-base text-gray-800 font-medium">
                      {date}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                    <div className="flex items-center space-x-4 md:space-x-3">
                      <div className="p-2.5 md:p-2 bg-[rgb(255,70,46)]/10 rounded-md border border-[rgb(255,70,46)]/20">
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
                      <span className="text-base text-gray-600">Time</span>
                    </div>
                    <span className="text-base text-gray-800 font-medium">
                      {startTime} - {endTime}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                    <div className="flex items-center space-x-4 md:space-x-3">
                      <div className="p-2.5 md:p-2 bg-[rgb(255,70,46)]/10 rounded-md border border-[rgb(255,70,46)]/20">
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
                      <span className="text-base text-gray-600">Duration</span>
                    </div>
                    <span className="text-base text-gray-800 font-medium">
                      {duration} hour{parseInt(duration) > 1 ? "s" : ""}
                    </span>
                  </div>

                  <div className="w-full h-px bg-gray-200 my-6 md:my-5"></div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                    <div className="flex items-center space-x-4 md:space-x-3">
                      <div className="p-2.5 md:p-2 bg-[rgb(255,70,46)]/10 rounded-md border border-[rgb(255,70,46)]/20">
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
                      <span className="text-base text-gray-600">
                        Total Price
                      </span>
                    </div>
                    <span className="text-xl md:text-2xl font-bold text-[rgb(255,70,46)]">
                      ₹{parseFloat(total).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Terms and conditions */}
              <div
                ref={termsContainerRef}
                className="h-[300px] md:h-[400px] overflow-y-auto rounded-lg bg-white/80 border border-[rgb(255,70,46)]/10 p-4 md:p-8 mb-6 md:mb-10"
              >
                <div className="prose prose-base max-w-none">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                    Booking Terms
                  </h2>
                  <p className="text-base text-gray-600 mb-6">
                    By proceeding with this booking, you agree to the following
                    terms and conditions:
                  </p>
                  <ul className="list-disc pl-5 space-y-4 md:space-y-3 text-base text-gray-600">
                    <li>
                      All bookings are subject to availability and confirmation.
                    </li>
                    <li>
                      Payment must be made in full at the time of booking.
                    </li>
                    <li>
                      Cancellations must be made at least 24 hours before the
                      scheduled time.
                    </li>
                    <li>Late arrivals may result in reduced booking time.</li>
                    <li>
                      Please maintain the space in a clean and organized manner.
                    </li>
                    <li>No smoking or consumption of alcohol is permitted.</li>
                    <li>
                      Please respect other users and maintain appropriate noise
                      levels.
                    </li>
                    <li>We reserve the right to refuse service to anyone.</li>
                    <li>
                      Personal belongings must be removed at the end of the
                      booking.
                    </li>
                    <li>
                      We are not responsible for any lost or stolen items.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Checkbox and button */}
              <div className="flex flex-col gap-6">
                <div className="flex items-start space-x-4 md:space-x-3">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    disabled={!hasScrolled}
                    className="mt-1 h-5 w-5 rounded border border-[rgb(255,70,46)]/30 text-[rgb(255,70,46)] focus:ring-[rgb(255,70,46)] disabled:opacity-50"
                  />
                  <label htmlFor="terms" className="text-base text-gray-600">
                    I have read and agree to the terms and conditions
                  </label>
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={!isChecked || isLoading}
                  className="w-full md:w-auto px-8 py-4 md:py-3.5 bg-[rgb(255,70,46)] text-white rounded-md hover:bg-[rgb(255,70,46)]/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base border border-white/20"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Confirm Booking"
                  )}
                </button>
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
      <BookingTermsPage />
    </Suspense>
  );
}
