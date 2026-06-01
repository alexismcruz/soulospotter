"use client";

import { useState } from "react";
import Image from "next/image";

interface ExperienceGalleryProps {
  photos: string[];
  title: string;
}

export default function ExperienceGallery({ photos, title }: ExperienceGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (photos.length === 0) {
    return null;
  }

  const mainPhoto = photos[selectedIndex];

  return (
    <div className="space-y-4">
      {/* Main Photo */}
      <div className="relative w-full h-96 rounded-2xl overflow-hidden bg-soulo-linen">
        <img
          src={mainPhoto}
          alt={`${title} - photo ${selectedIndex + 1}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnail Gallery */}
      {photos.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {photos.map((photo, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                selectedIndex === idx ? "border-soulo-gold" : "border-soulo-border hover:border-soulo-gold"
              }`}
            >
              <img
                src={photo}
                alt={`${title} thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
