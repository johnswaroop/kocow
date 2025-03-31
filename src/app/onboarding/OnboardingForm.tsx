"use client";

import { useState } from "react";

interface OnboardingFormProps {
  initialName: string;
}

export default function OnboardingForm({ initialName }: OnboardingFormProps) {
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
                location.reload();
                // router.push("/spaces");
                location.href = "/spaces";
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

      console.log("[OnboardingForm] Update successful, redirecting to spaces");

      // Refresh the session to get updated user data
      location.reload();

      // Redirect to spaces
      location.href = "/spaces";
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
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900">
                Tell us who you are
              </h3>
              <p className="text-gray-600 mt-2 text-base">
                We&apos;ll personalize your experience
              </p>
            </div>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 mb-2"
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
                  className="pl-10 w-full bg-white border border-gray-200 rounded-lg shadow-sm py-3 px-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[rgb(255,70,46)]/50 focus:border-[rgb(255,70,46)] transition-all duration-200"
                />
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900">
                How can we reach you?
              </h3>
              <p className="text-gray-600 mt-2 text-base">
                For booking confirmations
              </p>
            </div>
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-gray-700 mb-2"
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
                  className="pl-10 w-full bg-white border border-gray-200 rounded-lg shadow-sm py-3 px-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[rgb(255,70,46)]/50 focus:border-[rgb(255,70,46)] transition-all duration-200"
                />
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900">
                What do you do?
              </h3>
              <p className="text-gray-600 mt-2 text-base">
                Help us understand your needs
              </p>
            </div>
            <div className="mb-4">
              <label
                htmlFor="profession"
                className="block text-sm font-semibold text-gray-700 mb-2"
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
                  placeholder="e.g. Software Engineer, Designer"
                  className="pl-10 w-full bg-white border border-gray-200 rounded-lg shadow-sm py-3 px-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[rgb(255,70,46)]/50 focus:border-[rgb(255,70,46)] transition-all duration-200"
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
    <div className="min-h-screen flex relative overflow-hidden bg-gray-100">
      {/* Background blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[rgb(255,70,46)]/15 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute top-1/3 -right-24 w-96 h-96 bg-[rgb(255,70,46)]/10 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-24 left-1/3 w-96 h-96 bg-[rgb(255,70,46)]/15 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {[...Array(totalSteps)].map((_, index) => (
                <div
                  key={index + 1}
                  className={`flex items-center ${
                    index < totalSteps - 1 ? "flex-1" : ""
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-semibold shadow-sm ${
                      step >= index + 1
                        ? "bg-[rgb(255,70,46)] text-white shadow-[rgb(255,70,46)]/20"
                        : "bg-white text-gray-600 shadow-gray-200"
                    }`}
                  >
                    {index + 1}
                  </div>
                  {index < totalSteps - 1 && (
                    <div
                      className={`flex-1 h-1.5 mx-2 rounded-full ${
                        step > index + 1
                          ? "bg-[rgb(255,70,46)] shadow-sm shadow-[rgb(255,70,46)]/20"
                          : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <p className="text-center text-sm font-medium text-gray-700">
              Step {step} of {totalSteps}
            </p>
          </div>

          {/* Form card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden">
            <div className="p-8">
              <form onSubmit={handleSubmit}>
                {renderStep()}

                {error && (
                  <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4">
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-red-500 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-red-700 text-sm font-medium">
                        {error}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex justify-between mt-8">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-3 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 border border-gray-200 shadow-sm hover:shadow-md"
                    >
                      Back
                    </button>
                  )}
                  {step < totalSteps ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className={`px-6 py-3 bg-[rgb(255,70,46)] hover:bg-[rgb(255,70,46)]/90 text-white rounded-lg shadow-md hover:shadow-lg text-base font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(255,70,46)] ${
                        step === 1 ? "ml-auto" : ""
                      }`}
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-6 py-3 bg-[rgb(255,70,46)] hover:bg-[rgb(255,70,46)]/90 text-white rounded-lg shadow-md hover:shadow-lg text-base font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(255,70,46)] ml-auto"
                    >
                      {isLoading ? "Saving..." : "Complete Setup"}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
