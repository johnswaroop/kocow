interface SpaceCategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onChange: (category: string | null) => void;
}

export default function SpaceCategoryFilter({
  categories,
  selectedCategory,
  onChange,
}: SpaceCategoryFilterProps) {
  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={() => onChange(null)}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
            selectedCategory === null
              ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
              : "bg-white/40 backdrop-blur-sm text-gray-700 hover:bg-white/60 border border-white/30"
          }`}
        >
          All Spaces
        </button>

        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onChange(category)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              selectedCategory === category
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
                : "bg-white/40 backdrop-blur-sm text-gray-700 hover:bg-white/60 border border-white/30"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
