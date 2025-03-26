"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface BookingCalendarProps {
  spaceId: string;
  hourlyRate: number;
}

export default function BookingCalendar({
  spaceId,
  hourlyRate,
}: BookingCalendarProps) {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<string>("09:00");
  const [duration, setDuration] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);

  // Generate dates for the next 30 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }

    return dates;
  };

  // Generate available hours (9 AM to 6 PM)
  const availableHours = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];

  // Duration options
  const durationOptions = [
    { value: 1, label: "1 hour" },
    { value: 2, label: "2 hours" },
    { value: 4, label: "Half day (4 hours)" },
    { value: 8, label: "Full day (8 hours)" },
  ];

  // Calculate total price
  const totalPrice = hourlyRate * duration;

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  // Calculate end time based on start time and duration
  const calculateEndTime = () => {
    if (!startTime) return "";

    const [hours, minutes] = startTime.split(":").map(Number);
    const endHours = hours + duration;
    const formattedEndHours = endHours < 10 ? `0${endHours}` : `${endHours}`;

    return `${formattedEndHours}:${minutes === 0 ? "00" : minutes}`;
  };

  const handleContinue = () => {
    if (!selectedDate) {
      alert("Please select a date first");
      return;
    }

    setIsLoading(true);

    // Create formatted date string
    const formattedDate = selectedDate.toISOString().split("T")[0];

    // Redirect to the next step in the booking process with query params
    router.push(
      `/booking/terms?spaceId=${spaceId}&date=${formattedDate}&startTime=${startTime}&duration=${duration}&total=${totalPrice}`
    );
  };

  return (
    <div className="w-full">
      {/* Date selection */}
      <div className="mb-6">
        <h3 className="text-base font-semibold text-gray-800 mb-3">
          Select Date
        </h3>
        <div className="flex overflow-x-auto py-2 space-x-2 pb-4 -mx-2 px-2">
          {generateDates().map((date, index) => {
            const isSelected =
              selectedDate &&
              selectedDate.toDateString() === date.toDateString();
            const isToday = date.toDateString() === new Date().toDateString();

            return (
              <button
                key={index}
                onClick={() => setSelectedDate(date)}
                className={`flex-shrink-0 w-16 h-16 flex flex-col items-center justify-center rounded-xl transition-all duration-200 ${
                  isSelected
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
                    : "bg-white/40 backdrop-blur-sm hover:bg-white/60 border border-white/30 text-gray-700"
                }`}
              >
                <span className="text-xs font-medium">
                  {date.toLocaleDateString("en-US", { weekday: "short" })}
                </span>
                <span
                  className={`text-lg font-bold ${
                    isToday && !isSelected ? "text-indigo-600" : ""
                  }`}
                >
                  {date.getDate()}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time selection */}
      <div className="mb-6">
        <h3 className="text-base font-semibold text-gray-800 mb-3">
          Select Start Time
        </h3>
        <div className="relative">
          <select
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl shadow-sm py-3 px-4 text-gray-800 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all duration-200"
          >
            {availableHours.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Duration selection */}
      <div className="mb-6">
        <h3 className="text-base font-semibold text-gray-800 mb-3">
          Select Duration
        </h3>
        <div className="relative">
          <select
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl shadow-sm py-3 px-4 text-gray-800 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all duration-200"
          >
            {durationOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Booking summary */}
      {selectedDate && (
        <div className="rounded-xl bg-indigo-50/70 backdrop-blur-sm p-4 mb-6 border border-indigo-100">
          <h3 className="font-semibold text-indigo-800 mb-2">
            Booking Summary
          </h3>
          <div className="flex flex-col space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="text-gray-800 font-medium">
                {formatDate(selectedDate)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Time:</span>
              <span className="text-gray-800 font-medium">{`${startTime} - ${calculateEndTime()}`}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Duration:</span>
              <span className="text-gray-800 font-medium">
                {duration} hour{duration > 1 ? "s" : ""}
              </span>
            </div>
            <div className="w-full h-px bg-indigo-200/50 my-1"></div>
            <div className="flex justify-between font-semibold">
              <span className="text-gray-700">Total Price:</span>
              <span className="text-indigo-800">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Continue button */}
      <button
        onClick={handleContinue}
        disabled={!selectedDate || isLoading}
        className={`w-full py-3 px-4 rounded-xl font-medium shadow-md transition-all duration-300 ${
          !selectedDate || isLoading
            ? "bg-gray-400 text-white cursor-not-allowed"
            : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white hover:shadow-lg"
        }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
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
          "Continue to Terms & Conditions"
        )}
      </button>
    </div>
  );
}
