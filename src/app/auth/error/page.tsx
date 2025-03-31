"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

function AuthError() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error") || "Unknown authentication error";

  // Mapping of error codes to user-friendly messages
  const errorMessages: Record<string, string> = {
    NoCodeProvided: "No authentication code was provided by Google.",
    AuthenticationFailed: "Authentication failed. Please try again.",
    AccessDenied: "You denied access to your Google account.",
    Default: "There was a problem signing you in.",
  };

  // Get a user-friendly error message
  const errorMessage = errorMessages[error] || errorMessages.Default;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {/* Background blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[rgb(255,70,46)]/10 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-1/3 -right-24 w-96 h-96 bg-[rgb(255,70,46)]/5 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-24 left-1/3 w-96 h-96 bg-[rgb(255,70,46)]/10 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="max-w-md w-full space-y-8 p-8 bg-white/30 backdrop-blur-md rounded-lg border border-white/20 shadow-lg relative z-10">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 rounded-lg bg-red-500/10 flex items-center justify-center">
            <svg
              className="h-8 w-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-800">
            Authentication Error
          </h2>
          <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
        </div>

        <div className="mt-8">
          <div className="flex justify-center">
            <button
              onClick={() => router.push("/auth/signin")}
              className="px-6 py-3 bg-[rgb(255,70,46)] hover:bg-[rgb(255,70,46)]/90 text-white rounded-md shadow-md text-base font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(255,70,46)]"
            >
              Try Again
            </button>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={() => router.push("/")}
              className="text-sm text-[rgb(255,70,46)] hover:text-[rgb(255,70,46)]/90"
            >
              Return to Homepage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ParentContainer() {
  return (
    <Suspense>
      <AuthError />
    </Suspense>
  );
}
