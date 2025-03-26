"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center text-sm lg:flex">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-8">Coworking Space</h1>
          <p className="text-xl mb-12 max-w-2xl mx-auto">
            Find and book your perfect workspace for productivity,
            collaboration, and creativity.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/auth/signin")}
              className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition"
            >
              Sign In
            </button>

            <button
              onClick={() => router.push("/spaces")}
              className="px-8 py-3 bg-white text-indigo-600 font-medium rounded-md border border-indigo-600 hover:bg-indigo-50 transition"
            >
              Browse Spaces
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
