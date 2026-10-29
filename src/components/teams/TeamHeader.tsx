"use client";

import React, { useRef } from "react";

interface TeamHeaderProps {
  teamName: string;
  logoUrl?: string;
  uploading: boolean;
  onLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * @file TeamHeader.tsx
 * @description Captain's team header bar featuring team name and interactive logo upload triggers.
 */
export default function TeamHeader({ teamName, logoUrl, uploading, onLogoUpload }: TeamHeaderProps) {
  // DOM reference to trigger the hidden file input element programmatically
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="w-full px-6 py-5 flex items-center justify-between border-b border-brand-light/10 bg-white/[0.02]">
      <div className="flex items-center gap-4">
        {/* Interactive Logo Avatar / Click Target */}
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="w-12 h-12 bg-brand-dark border border-brand-light/20 flex items-center justify-center cursor-pointer relative group overflow-hidden shrink-0"
          title="Click to upload team logo"
        >
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoUrl} alt="Team Logo" className="w-full h-full object-cover" />
          ) : (
            <span className="font-bebas text-brand-light/50 text-xs text-center px-1">
              {uploading ? '...' : 'LOGO'}
            </span>
          )}

          {/* Hover Overlay with Edit Indicator */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] font-inter text-brand-light">
            Edit
          </div>
        </div>

        {/* Team Details & Action Links */}
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-brand-light tracking-wide text-lg sm:text-xl">
              {teamName}
            </span>
          </div>

          {/* Text Upload Trigger */}
          <button 
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="text-xs text-brand-light/50 hover:text-brand-red transition-colors font-inter mt-0.5 text-left block cursor-pointer"
          >
            {uploading ? 'Uploading logo...' : logoUrl ? 'Change team logo' : '+ Upload team logo'}
          </button>

          {/* Hidden HTML File Input */}
          <input 
            ref={fileInputRef}
            type="file" 
            accept="image/*"
            onChange={onLogoUpload}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
}