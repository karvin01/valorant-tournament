"use client";

// has to recieve string and onSearch it
//onChange must be a function that accepts one piece of text(query), and returns nothing
interface SearchBarProps {
  // Current search keyword managed by parent state
  value: string;
  // State dispatcher notifying parent of user keystrokes
  onChange: (query: string) => void;
}

/**
 * @file SearchBar.tsx
 * @description Real-time text search filter for matching team titles or player handles.
 */
export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full">
      {/* search Icon */}
      <div className="absolute inset-y-0 left-0 pl-3.5 sm:pl-4 flex items-center pointer-events-none text-brand-light/40">
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* search input field */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="SEARCH TEAM OR PLAYER..."
        className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-3.5 bg-brand-light/[0.03] border border-brand-light/10 focus:border-brand-red focus:outline-none text-brand-light placeholder:text-brand-light/30 text-xs sm:text-sm font-semibold tracking-wider transition-colors uppercase"
      />
      {/* onChange={(e) => onChange(e.target.value)} --the value is what you type in the field, it is event listener, e.target is the inputbox  */}
    </div>
  );
}