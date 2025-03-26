"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { mockSpaces } from "@/data/mockSpaces";

export default function BookingTermsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const termsContainerRef = useRef<HTMLDivElement>(null);

  const [hasScrolled, setHasScrolled] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Get query params
  const spaceId = searchParams.get("spaceId");
  const date = searchParams.get("date");
  const startTime = searchParams.get("startTime");
  const duration = searchParams.get("duration");
  const total = searchParams.get("total");

  // Find space from mock data
  const space = mockSpaces.find((s) => s.id === spaceId);

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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isChecked) {
      alert("Please agree to the terms and conditions to continue.");
      return;
    }

    setIsLoading(true);

    // Simulate API call to create booking
    setTimeout(() => {
      // Redirect to booking confirmation page
      router.push(
        `/booking/confirmation?spaceId=${spaceId}&date=${date}&startTime=${startTime}&duration=${duration}&total=${total}`
      );
    }, 1500);
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
        <div className="max-w-3xl mx-auto">
          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-medium">
                  1
                </div>
                <div className="ml-2 text-sm font-medium text-gray-700">
                  Select Space
                </div>
              </div>
              <div className="flex-1 h-1 mx-4 bg-indigo-200"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-medium">
                  2
                </div>
                <div className="ml-2 text-sm font-medium text-gray-700">
                  Select Date & Time
                </div>
              </div>
              <div className="flex-1 h-1 mx-4 bg-indigo-200"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-medium">
                  3
                </div>
                <div className="ml-2 text-sm font-medium text-gray-700">
                  Terms & Conditions
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="rounded-2xl backdrop-blur-md bg-white/30 border border-white/20 shadow-lg overflow-hidden">
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-6">
                Terms & Conditions
              </h1>

              {/* Booking summary */}
              <div className="rounded-xl bg-indigo-50/70 backdrop-blur-sm p-4 mb-6 border border-indigo-100">
                <h2 className="font-semibold text-indigo-800 mb-3">
                  Booking Summary
                </h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 mb-1">Space:</p>
                    <p className="font-medium text-gray-800">{space.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Date:</p>
                    <p className="font-medium text-gray-800">
                      {new Date(date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Time:</p>
                    <p className="font-medium text-gray-800">
                      {startTime} - {/* Calculate end time */}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Duration:</p>
                    <p className="font-medium text-gray-800">
                      {duration} hour{parseInt(duration) > 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-600 mb-1">Total Price:</p>
                    <p className="font-bold text-indigo-800">
                      ${parseFloat(total).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Terms and conditions text */}
              <div
                ref={termsContainerRef}
                className="h-64 overflow-y-auto p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/30 mb-6 text-sm text-gray-700 custom-scrollbar"
              >
                <h3 className="font-bold text-gray-800 mb-2">
                  1. BOOKING AGREEMENT
                </h3>
                <p className="mb-4">
                  This booking agreement ("Agreement") is entered into between
                  Kohinoor Spaces ("Provider") and the individual or entity
                  making the booking ("Client"). By proceeding with this
                  booking, Client agrees to be bound by the terms and conditions
                  set forth herein.
                </p>

                <h3 className="font-bold text-gray-800 mb-2">
                  2. BOOKING AND PAYMENT
                </h3>
                <p className="mb-2">
                  2.1 Client agrees to pay the total amount specified in the
                  booking summary for the use of the designated space during the
                  specified time period.
                </p>
                <p className="mb-2">
                  2.2 Full payment is required at the time of booking to confirm
                  the reservation.
                </p>
                <p className="mb-2">
                  2.3 All prices are exclusive of applicable taxes unless
                  otherwise stated.
                </p>
                <p className="mb-4">
                  2.4 Payment methods accepted include credit card, debit card,
                  and other electronic payment methods as specified on the
                  booking platform.
                </p>

                <h3 className="font-bold text-gray-800 mb-2">
                  3. CANCELLATION POLICY
                </h3>
                <p className="mb-2">
                  3.1 Cancellations made more than 48 hours prior to the booking
                  start time will receive a full refund.
                </p>
                <p className="mb-2">
                  3.2 Cancellations made between 24 and 48 hours prior to the
                  booking start time will receive a 50% refund.
                </p>
                <p className="mb-2">
                  3.3 Cancellations made less than 24 hours prior to the booking
                  start time will not be eligible for a refund.
                </p>
                <p className="mb-4">
                  3.4 Provider reserves the right to cancel bookings due to
                  unforeseen circumstances, in which case Client will receive a
                  full refund.
                </p>

                <h3 className="font-bold text-gray-800 mb-2">
                  4. USE OF SPACE
                </h3>
                <p className="mb-2">
                  4.1 Client agrees to use the space only for the purpose stated
                  at the time of booking.
                </p>
                <p className="mb-2">
                  4.2 Client shall not exceed the maximum capacity of the space
                  as specified in the space details.
                </p>
                <p className="mb-2">
                  4.3 Client is responsible for leaving the space in the same
                  condition as it was found.
                </p>
                <p className="mb-4">
                  4.4 Smoking, illegal activities, and disruptive behavior are
                  strictly prohibited within the space.
                </p>

                <h3 className="font-bold text-gray-800 mb-2">5. LIABILITY</h3>
                <p className="mb-2">
                  5.1 Provider is not responsible for any loss, damage, or theft
                  of Client's personal belongings or equipment.
                </p>
                <p className="mb-2">
                  5.2 Client assumes all responsibility for any damage caused to
                  the space or its contents during the booking period.
                </p>
                <p className="mb-4">
                  5.3 Client agrees to indemnify and hold Provider harmless from
                  any claims, damages, or liabilities arising from Client's use
                  of the space.
                </p>

                <h3 className="font-bold text-gray-800 mb-2">
                  6. PRIVACY POLICY
                </h3>
                <p className="mb-4">
                  6.1 Client's personal information will be handled in
                  accordance with Provider's Privacy Policy, which is available
                  upon request.
                </p>

                <h3 className="font-bold text-gray-800 mb-2">
                  7. MISCELLANEOUS
                </h3>
                <p className="mb-2">
                  7.1 This Agreement constitutes the entire understanding
                  between the parties and supersedes any prior agreements or
                  understandings.
                </p>
                <p className="mb-2">
                  7.2 This Agreement shall be governed by and construed in
                  accordance with the laws of the jurisdiction in which the
                  Provider operates.
                </p>
                <p className="mb-2">
                  7.3 Any disputes arising under this Agreement shall be
                  resolved through arbitration in accordance with the rules of
                  the American Arbitration Association.
                </p>
                <p className="mb-2">
                  7.4 Provider reserves the right to modify these terms and
                  conditions at any time without prior notice.
                </p>
                <p className="mb-2">
                  7.5 If any provision of this Agreement is found to be invalid
                  or unenforceable, the remaining provisions shall remain in
                  full force and effect.
                </p>
              </div>

              {/* Agreement checkbox */}
              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    disabled={!hasScrolled}
                    className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    I have read and agree to the terms and conditions
                    {!hasScrolled && (
                      <span className="text-red-500 ml-1">
                        (please scroll through the terms first)
                      </span>
                    )}
                  </span>
                </label>
              </div>

              {/* Form buttons */}
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-6 py-3 bg-white/40 backdrop-blur-sm text-gray-700 rounded-xl hover:bg-white/60 transition-all duration-200 border border-white/30"
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!isChecked || isLoading}
                  className={`px-8 py-3 rounded-xl text-white font-medium shadow-md transition-all duration-300 ${
                    !isChecked || isLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 hover:shadow-lg"
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                    </span>
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
