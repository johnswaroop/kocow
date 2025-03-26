"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function AuthError() {
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
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-red-500"
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
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Authentication Error
          </h2>
          <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
        </div>

        <div className="mt-8">
          <div className="flex justify-center">
            <button
              onClick={() => router.push("/auth/signin")}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Try Again
            </button>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={() => router.push("/")}
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              Return to Homepage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
