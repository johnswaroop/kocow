"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";

export default function SignIn() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize Google Sign-In when component mounts
  useEffect(() => {
    const initializeGoogleSignIn = () => {
      if (typeof window !== "undefined" && window.google) {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
          callback: handleCredentialResponse,
          auto_select: false,
          cancel_on_tap_outside: true,
        });
      }
    };

    // Run initialization after Google script is loaded
    const interval = setInterval(() => {
      if (typeof window !== "undefined" && window.google) {
        initializeGoogleSignIn();
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setError(null);

    // Get the authentication URL from our API
    fetch("/api/auth/google?redirect=/onboarding")
      .then((response) => response.json())
      .then((data) => {
        if (data.url) {
          // Redirect to Google authentication
          window.location.href = data.url;
        } else {
          setError("Failed to get authentication URL");
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error initiating Google sign-in:", error);
        setError("An error occurred. Please try again.");
        setIsLoading(false);
      });
  };

  const handleCredentialResponse = async (response: { credential: string }) => {
    setIsLoading(true);
    try {
      // Send the ID token to our API
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          credential: response.credential,
        }),
      });

      const data = await res.json();

      if (data.success) {
        // Check if user has completed onboarding
        if (data.onboardingCompleted) {
          router.push("/spaces");
        } else {
          router.push("/onboarding");
        }
      } else {
        setError(data.error || "Authentication failed");
      }
    } catch (error) {
      console.error("Error authenticating with Google:", error);
      setError("Authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="lazyOnload"
        onLoad={() => {
          if (window.google) {
            window.google.accounts.id.initialize({
              client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
              callback: handleCredentialResponse,
              auto_select: false,
              cancel_on_tap_outside: true,
            });
            window.google.accounts.id.renderButton(
              document.getElementById("google-signin-button")!,
              {
                theme: "filled_blue",
                size: "large",
                width: 320,
                text: "continue_with",
                shape: "pill",
              }
            );
          }
        }}
      />

      <div className="min-h-screen flex relative overflow-hidden bg-gray-50">
        {/* Background blobs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[rgb(255,70,46)]/10 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 -right-24 w-96 h-96 bg-[rgb(255,70,46)]/5 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-24 left-1/3 w-96 h-96 bg-[rgb(255,70,46)]/10 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

        {/* Content container */}
        <div className="container mx-auto p-4 flex justify-center items-center">
          <div className="w-full max-w-md z-10">
            {/* Glass card */}
            <div className="backdrop-filter backdrop-blur-md bg-white/30 rounded-lg border border-white/20 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:bg-white/40">
              <div className="p-10">
                <div className="flex justify-center mb-6">
                  <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-[rgb(255,70,46)]/10">
                    <svg
                      className="h-8 w-8 text-[rgb(255,70,46)]"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-center text-gray-800 mb-1">
                  Welcome to Kohinoor
                </h2>
                <p className="text-center text-gray-600 mb-8">
                  Access premium coworking spaces
                </p>

                {error && (
                  <div className="mb-6 rounded-lg backdrop-blur-md bg-red-500/10 border border-red-500/20 p-4">
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
                      <p className="text-red-600 text-sm">{error}</p>
                    </div>
                  </div>
                )}

                <div className="space-y-6 mt-8">
                  <button
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                    className="group w-full flex justify-center items-center px-6 py-4 bg-[rgb(255,70,46)] hover:bg-[rgb(255,70,46)]/90 text-white rounded-md shadow-md text-base font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(255,70,46)]"
                  >
                    <svg
                      className="h-5 w-5 mr-3 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                        fill="#ffffff"
                      />
                      <path
                        d="M3.117,7.29l3.258,2.414c0.749-2.212,2.811-3.813,5.239-3.813c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814 C16.572,2.912,14.639,2,12.545,2C8.297,2,4.677,4.169,3.117,7.29z"
                        fill="#ffffff"
                        opacity="0.2"
                      />
                      <path
                        d="M12.545,22c2.069,0,3.96-0.683,5.466-1.837l-2.673-2.273c-0.751,0.467-1.88,0.765-2.793,0.765 c-2.791,0-5.154-1.645-5.868-3.947l-2.9,2.29C5.288,19.805,8.713,22,12.545,22z"
                        fill="#ffffff"
                        opacity="0.2"
                      />
                      <path
                        d="M22,12c0-0.75-0.062-1.498-0.186-2.224l-0.074-0.438H12.545v3.821h5.445c-0.31,1.004-0.945,1.888-1.793,2.526 l2.673,2.273C21.371,16.323,22,14.098,22,12z"
                        fill="#ffffff"
                        opacity="0.2"
                      />
                    </svg>
                    {isLoading ? "Signing in..." : "Sign in with Google"}
                  </button>
                </div>

                <p className="mt-8 text-xs text-center text-gray-600">
                  By continuing, you agree to our{" "}
                  <a
                    href="#"
                    className="font-medium text-[rgb(255,70,46)] hover:text-[rgb(255,70,46)]/90"
                  >
                    Terms
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="font-medium text-[rgb(255,70,46)] hover:text-[rgb(255,70,46)]/90"
                  >
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Add global type for Google
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: Record<string, unknown>) => void;
          renderButton: (
            element: HTMLElement,
            options: Record<string, unknown>
          ) => void;
          prompt: () => void;
        };
      };
    };
  }
}
