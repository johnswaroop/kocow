"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface BookingCalendarProps {
  spaceId: string;
  hourlyRate: number;
  userId: string;
}

export default function BookingCalendar({
  spaceId,
  hourlyRate,
  userId,
}: BookingCalendarProps) {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<string>("");
  const [duration, setDuration] = useState<number>(8);
  const [isLoading, setIsLoading] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [customDates, setCustomDates] = useState<Date[]>([]);
  const [tempDate, setTempDate] = useState<string>("");

  // Set today's date and current time as default
  useEffect(() => {
    const today = new Date();
    setSelectedDate(today);

    // Format current time to HH:mm
    const hours = today.getHours().toString().padStart(2, "0");
    const minutes = today.getMinutes().toString().padStart(2, "0");
    setStartTime(`${hours}:${minutes}`);
  }, []);

  // Generate dates for the next 30 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }

    // Add custom dates and sort
    const allDates = [...dates, ...customDates];
    return allDates.sort((a, b) => a.getTime() - b.getTime());
  };

  // Handle custom date selection
  const handleCustomDateSelect = (event: React.FormEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    setTempDate(input.value);
  };

  const handleSaveDate = () => {
    if (!tempDate) return;

    const selectedDate = new Date(tempDate);
    const today = new Date();
    const sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(today.getMonth() + 6);

    if (selectedDate >= today && selectedDate <= sixMonthsFromNow) {
      setSelectedDate(selectedDate);
      setCustomDates((prev) => [...prev, selectedDate]);
      setShowCalendar(false);
      setTempDate("");
    }
  };

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
    const endTime = calculateEndTime();

    // Redirect to the next step in the booking process with query params
    router.push(
      `/booking/terms?spaceId=${spaceId}&date=${formattedDate}&startTime=${startTime}&endTime=${endTime}&duration=${duration}&total=${totalPrice}&userId=${userId}`
    );
  };

  return (
    <div className="w-full">
      {/* Date selection */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold text-gray-800">Select Date</h3>
          <button
            onClick={() => setShowCalendar(true)}
            className="flex items-center justify-center w-8 h-8 rounded-md bg-[rgb(255,70,46)]/10 hover:bg-[rgb(255,70,46)]/20 text-[rgb(255,70,46)] transition-colors duration-200"
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
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
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
                className={`flex-shrink-0 w-16 h-16 flex flex-col items-center justify-center rounded-md transition-all duration-200 ${
                  isSelected
                    ? "bg-[rgb(255,70,46)] text-white shadow-md"
                    : "bg-white/40 backdrop-blur-sm hover:bg-white/60 border border-white/30 text-gray-700"
                }`}
              >
                <span className="text-xs font-medium">
                  {date.toLocaleDateString("en-US", { weekday: "short" })}
                </span>
                <span
                  className={`text-lg font-bold ${
                    isToday && !isSelected ? "text-[rgb(255,70,46)]" : ""
                  }`}
                >
                  {date.getDate()}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Date Display */}
      {selectedDate && (
        <div className="mb-6 rounded-md bg-[rgb(255,70,46)]/5 backdrop-blur-sm p-4 border border-[rgb(255,70,46)]/10">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-[rgb(255,70,46)] mb-1">
                Selected Date
              </h4>
              <p className="text-lg font-semibold text-gray-800">
                {selectedDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <button
              onClick={() => setSelectedDate(null)}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Calendar Modal */}
      {showCalendar && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Select Date
              </h3>
              <button
                onClick={() => setShowCalendar(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              max={
                new Date(new Date().setMonth(new Date().getMonth() + 6))
                  .toISOString()
                  .split("T")[0]
              }
              value={tempDate}
              onInput={handleCustomDateSelect}
              className="w-full bg-white/50 backdrop-blur-sm border border-white/30 rounded-md shadow-sm py-3 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[rgb(255,70,46)]/50 focus:border-transparent transition-all duration-200"
            />
            <p className="mt-2 text-sm text-gray-500">
              Select a date within the next 6 months
            </p>
            <button
              onClick={handleSaveDate}
              disabled={!tempDate}
              className={`w-full mt-4 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
                !tempDate
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-[rgb(255,70,46)] text-white hover:bg-[rgb(255,70,46)]/90"
              }`}
            >
              Save Date
            </button>
          </div>
        </div>
      )}

      {/* Time selection */}
      <div className="mb-6">
        <h3 className="text-base font-semibold text-gray-800 mb-3">
          Select Start Time
        </h3>
        <div className="relative">
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            min="09:00"
            max="18:00"
            className="w-full bg-white/50 backdrop-blur-sm border border-white/30 rounded-md shadow-sm py-3 px-4 text-gray-800 appearance-none focus:outline-none focus:ring-2 focus:ring-[rgb(255,70,46)]/50 focus:border-transparent transition-all duration-200"
          />
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Available hours: 9:00 AM - 6:00 PM
        </p>
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
            className="w-full bg-white/50 backdrop-blur-sm border border-white/30 rounded-md shadow-sm py-3 px-4 text-gray-800 appearance-none focus:outline-none focus:ring-2 focus:ring-[rgb(255,70,46)]/50 focus:border-transparent transition-all duration-200"
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
        <div className="rounded-md bg-[rgb(255,70,46)]/5 backdrop-blur-sm p-4 mb-6 border border-[rgb(255,70,46)]/10">
          <h3 className="font-semibold text-[rgb(255,70,46)] mb-2">
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
            <div className="w-full h-px bg-[rgb(255,70,46)]/10 my-1"></div>
            <div className="flex justify-between font-semibold">
              <span className="text-gray-700">Total Price:</span>
              <span className="text-[rgb(255,70,46)]">
                ₹{totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Continue button */}
      <button
        onClick={handleContinue}
        disabled={!selectedDate || isLoading}
        className={`w-full py-3 px-4 rounded-md font-medium shadow-md transition-all duration-300 ${
          !selectedDate || isLoading
            ? "bg-gray-400 text-white cursor-not-allowed"
            : "bg-[rgb(255,70,46)] hover:bg-[rgb(255,70,46)]/90 text-white hover:shadow-lg"
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
