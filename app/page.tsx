"use client";

import React, { useState } from "react";
import { INITIAL_MEMORIES, MemoryCategory } from "./data/memoriesData";
import MemoryCard from "./components/MemoryCard";
import GalleryModal from "./components/GalleryModal";
import MusicPlayer from "./components/MusicPlayer";
import { playSparkleSound, playPopSound } from "./utils/soundEffects";
import confetti from "canvas-confetti";

export default function Home() {
  const [categories] = useState<MemoryCategory[]>(INITIAL_MEMORIES);
  const [selectedCategory, setSelectedCategory] = useState<MemoryCategory | null>(null);
  const [kittyTalkIndex, setKittyTalkIndex] = useState(0);

  const kittyQuotes = [
    "Hallooo Nathaaa! Lihaattt Nieehh Momeenn Roblook 🎀",
    "Nathaaa, jangan lupa selalu bawa senyum manis kamu yaa! 💕",
    "Semoga hari ini dipenuhi hal-hal kecil yang bikin kamu bahagia! 🌷",
    "Kalau lagi capek, istirahat dulu yaa. Kamu juga harus disayang! 🥺🎀",
  ];

  const handleOpenCategory = (cat: MemoryCategory) => {
    const current = categories.find((c) => c.id === cat.id) || cat;
    setSelectedCategory(current);
  };

  const handleKittyClick = () => {
    playPopSound();
    setKittyTalkIndex((prev) => (prev + 1) % kittyQuotes.length);
    confetti({
      particleCount: 20,
      spread: 40,
      origin: { y: 0.35 },
      colors: ["#ff2d55", "#fb7185", "#ff85a2"],
    });
  };

  const triggerGlobalConfetti = () => {
    playSparkleSound();
    confetti({
      particleCount: 100,
      spread: 120,
      origin: { y: 0.6 },
      colors: ["#ff2d55", "#fb7185", "#ff85a2", "#ffd1dc", "#fff1f2", "#f43f5e"],
    });
  };

  return (
    <main className="relative min-h-screen pb-24 overflow-x-hidden">

      {/* Hero Header Section */}
      <div className="relative z-10 max-w-5xl mx-auto pt-6 sm:pt-12 px-4 sm:px-6 text-center">
        
        {/* Animated Hello Kitty Mascot with Speech Bubble */}
        <div className="flex flex-col items-center justify-center mb-2">
          {/* Speech Bubble */}
          <div
            onClick={handleKittyClick}
            className="relative cursor-pointer bg-white px-4 py-2 rounded-2xl border-2 border-rose-300 shadow-md mb-2 transition-transform hover:scale-105 active:scale-95 animate-pulse-subtle max-w-xs"
          >
            <p className="font-[family-name:var(--font-caveat)] text-xl sm:text-2xl font-bold text-rose-800 leading-tight">
              &ldquo;{kittyQuotes[kittyTalkIndex]}&rdquo;
            </p>
            {/* Bubble Tail */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b-2 border-r-2 border-rose-300 transform rotate-45" />
          </div>

          {/* Hello Kitty Waving GIF */}
          <div
            onClick={handleKittyClick}
            className="cursor-pointer group relative transform hover:scale-110 active:scale-95 transition-transform"
            title="Klik Hello Kitty! 🎀"
          >
            <img
              src="/assets/hai-kitty.gif"
              alt="Hello Kitty Waving"
              className="w-24 h-24 sm:w-28 sm:h-28 object-contain drop-shadow-lg"
            />
            <span className="absolute -top-1 -right-1 text-base animate-bounce">✨</span>
          </div>
        </div>
      </div>

      {/* Centerpiece Landscape Memory Card Section */}
      <div className="relative z-10 max-w-5xl mx-auto mt-8 px-4 sm:px-6 space-y-8">
        {categories.map((category) => (
          <MemoryCard
            key={category.id}
            category={category}
            onOpen={handleOpenCategory}
          />
        ))}
      </div>

      {/* Gallery Modal when a card is clicked */}
      <GalleryModal
        category={selectedCategory}
        onClose={() => setSelectedCategory(null)}
      />

      {/* Cute Background Music Player */}
      <MusicPlayer />
    </main>
  );
}
