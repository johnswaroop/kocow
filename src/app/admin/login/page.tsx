"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Simple admin/admin check for demo
    if (username === "admin" && password === "admin") {
      router.push("/admin");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-200">
        <h1 className="text-2xl font-bold text-[rgb(255,70,46)] mb-6">
          Admin Login
        </h1>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-[rgb(255,70,46)] focus:ring-[rgb(255,70,46)] py-2.5 px-4 text-base text-gray-900 placeholder-gray-500 bg-white"
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-[rgb(255,70,46)] focus:ring-[rgb(255,70,46)] py-2.5 px-4 text-base text-gray-900 placeholder-gray-500 bg-white"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[rgb(255,70,46)] text-white py-2.5 px-4 rounded-md hover:opacity-90 transition-all font-medium text-base"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
