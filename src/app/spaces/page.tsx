"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { mockSpaces, Space } from "@/data/mockSpaces";
import SpaceCard from "@/components/spaces/SpaceCard";
import SpaceCategoryFilter from "@/components/spaces/SpaceCategoryFilter";

export default function SpacesPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter spaces based on selected category
  const filteredSpaces = selectedCategory
    ? mockSpaces.filter((space) => space.category === selectedCategory)
    : mockSpaces;

  // Get unique categories for the filter
  const categories = Array.from(
    new Set(mockSpaces.map((space) => space.category))
  );

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };

  const handleSpaceClick = (spaceId: string) => {
    router.push(`/spaces/${spaceId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 -right-24 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-24 left-1/3 w-96 h-96 bg-violet-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Available Spaces
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our selection of premium coworking spaces and find the
            perfect environment for your work style.
          </p>
        </div>

        {/* Category filter */}
        <div className="mb-10">
          <SpaceCategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onChange={handleCategoryChange}
          />
        </div>

        {/* Spaces grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSpaces.map((space) => (
            <SpaceCard
              key={space.id}
              space={space}
              onClick={() => handleSpaceClick(space.id)}
            />
          ))}
        </div>

        {/* Show message if no spaces match the filter */}
        {filteredSpaces.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">
              No spaces found in this category. Please try another filter.
            </p>
            <button
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              onClick={() => setSelectedCategory(null)}
            >
              Show All Spaces
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
