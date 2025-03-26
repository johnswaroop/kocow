"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface OnboardingFormProps {
  initialName: string;
}

export default function OnboardingForm({ initialName }: OnboardingFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: initialName || "",
    phone: "",
    profession: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const nextStep = () => {
    setStep((prevStep) => Math.min(prevStep + 1, totalSteps));
  };

  const prevStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    console.log("[OnboardingForm] Submitting form data");

    try {
      // Validate the form data first
      if (!formData.name.trim()) {
        throw new Error("Name is required");
      }
      if (!formData.phone.trim()) {
        throw new Error("Phone number is required");
      }
      if (!formData.profession.trim()) {
        throw new Error("Profession is required");
      }

      console.log("[OnboardingForm] Form data validated, sending to API");

      // Send data to API endpoint
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          profession: formData.profession,
          onboardingCompleted: true,
        }),
      });

      // Log the response status for debugging
      console.log("[OnboardingForm] Response status:", response.status);

      const responseData = await response.json();
      console.log("[OnboardingForm] Response data:", responseData);

      if (!response.ok) {
        // If there's an authentication error, try to create the user first
        if (response.status === 401 || response.status === 404) {
          console.log(
            "[OnboardingForm] User not found, trying to create user first"
          );

          // First try to create the session again by logging in
          try {
            const createResponse = await fetch("/api/auth/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: formData.name,
                email: "temp@example.com", // This should be replaced by actual data
                createUser: true,
              }),
            });

            if (createResponse.ok) {
              console.log("[OnboardingForm] User created, trying update again");

              // Try the update again
              const retryResponse = await fetch("/api/user", {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: formData.name,
                  phone: formData.phone,
                  profession: formData.profession,
                  onboardingCompleted: true,
                }),
              });

              if (retryResponse.ok) {
                console.log("[OnboardingForm] Update succeeded on retry");
                router.refresh();
                router.push("/dashboard");
                return;
              } else {
                console.error("[OnboardingForm] Retry update failed");
                throw new Error("Failed to update profile after creating user");
              }
            } else {
              console.error("[OnboardingForm] Failed to create user");
            }
          } catch (createError) {
            console.error("[OnboardingForm] Error creating user:", createError);
          }
        }

        throw new Error(responseData.error || "Failed to update profile");
      }

      console.log(
        "[OnboardingForm] Update successful, redirecting to dashboard"
      );

      // Refresh the session to get updated user data
      router.refresh();

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("[OnboardingForm] Error submitting form:", error);
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="text-center mb-5">
              <h3 className="text-xl font-semibold text-gray-800">
                Tell us who you are
              </h3>
              <p className="text-gray-600 mt-1 text-sm">
                We&apos;ll personalize your experience
              </p>
            </div>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="pl-10 w-full bg-white/50 backdrop-blur-md border border-white/30 rounded-xl shadow-sm py-3 px-4 text-gray-800 placeholder-gray-500/60 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="text-center mb-5">
              <h3 className="text-xl font-semibold text-gray-800">
                How can we reach you?
              </h3>
              <p className="text-gray-600 mt-1 text-sm">
                For booking confirmations
              </p>
            </div>
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 555-5555"
                  className="pl-10 w-full bg-white/50 backdrop-blur-md border border-white/30 rounded-xl shadow-sm py-3 px-4 text-gray-800 placeholder-gray-500/60 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className="text-center mb-5">
              <h3 className="text-xl font-semibold text-gray-800">
                What do you do?
              </h3>
              <p className="text-gray-600 mt-1 text-sm">
                We&apos;ll recommend matching spaces
              </p>
            </div>
            <div className="mb-4">
              <label
                htmlFor="profession"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Profession
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                  </svg>
                </div>
                <input
                  id="profession"
                  name="profession"
                  type="text"
                  required
                  value={formData.profession}
                  onChange={handleChange}
                  placeholder="e.g. Designer, Developer, Writer"
                  className="pl-10 w-full bg-white/50 backdrop-blur-md border border-white/30 rounded-xl shadow-sm py-3 px-4 text-gray-800 placeholder-gray-500/60 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 flex justify-center items-center p-4">
      <div className="w-full max-w-2xl">
        {/* Main container */}
        <div className="glass-card overflow-hidden">
          {/* Header */}
          <div className="glass-gradient text-white p-6">
            <h2 className="text-2xl font-bold">Profile Setup</h2>
            <p className="text-sm opacity-80 mt-1">
              Step {step} of {totalSteps}
            </p>

            {/* Progress bar */}
            <div className="mt-4 h-1 w-full bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Form content */}
          <div className="p-6">
            {error && (
              <div className="mb-6 rounded-xl bg-red-50 border border-red-200 p-4">
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 text-red-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              </div>
            )}

            <form
              onSubmit={
                step === totalSteps
                  ? handleSubmit
                  : (e) => {
                      e.preventDefault();
                      nextStep();
                    }
              }
            >
              {renderStep()}

              {/* Navigation buttons */}
              <div className="mt-8 flex justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="glass-button px-4 py-2 text-gray-700 text-sm font-medium"
                  >
                    Back
                  </button>
                ) : (
                  <div></div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`px-6 py-2 rounded-xl text-white text-sm font-medium shadow-sm transition-all duration-200 ${
                    isLoading
                      ? "bg-indigo-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500"
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                    </span>
                  ) : step < totalSteps ? (
                    "Continue"
                  ) : (
                    "Complete Setup"
                  )}
                </button>
              </div>
            </form>

            {/* Step indicators */}
            <div className="flex justify-center mt-8">
              {Array.from({ length: totalSteps }).map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 mx-1 rounded-full transition-all duration-300 ${
                    step > idx
                      ? "bg-indigo-600"
                      : step === idx + 1
                      ? "bg-indigo-400"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
