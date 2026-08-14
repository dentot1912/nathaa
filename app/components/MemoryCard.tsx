"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { MemoryCategory } from "../data/memoriesData";
import { playCardOpenSound, playSparkleSound } from "../utils/soundEffects";
import { Heart, Image as ImageIcon, BookOpen } from "lucide-react";

interface MemoryCardProps {
  category: MemoryCategory;
  onOpen: (category: MemoryCategory) => void;
}

export default function MemoryCard({ category, onOpen }: MemoryCardProps) {
  const [likeCount, setLikeCount] = useState(0);

  const handleCardClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 60,
      spread: 80,
      origin: { x, y },
      colors: ["#ff2d55", "#fb7185", "#ff85a2", "#ffd1dc", "#fff1f2"],
      shapes: ["circle", "square"],
      scalar: 1.2,
    });

    playCardOpenSound();
    onOpen(category);
  };

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playSparkleSound();
    setLikeCount((prev) => prev + 1);

    const rect = e.currentTarget.getBoundingClientRect();
    confetti({
      particleCount: 25,
      spread: 50,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      },
      colors: ["#ff2d55", "#f43f5e", "#fda4af"],
    });
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative w-full max-w-4xl mx-auto cursor-pointer select-none transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.01]"
    >
      {/* Dreamy Ambient Aura Glow */}
      <div className="absolute -inset-3 rounded-[44px] bg-gradient-to-r from-rose-400/30 via-pink-400/25 to-red-400/30 blur-2xl transition duration-500 group-hover:opacity-100 opacity-60" />

      {/* Main Redesigned Scrapbook Card Container */}
      <div className="relative rounded-[36px] bg-white/95 p-2 sm:p-2.5 shadow-[0_20px_50px_rgba(244,63,94,0.18)] group-hover:shadow-[0_25px_60px_rgba(244,63,94,0.28)] border-4 border-rose-300 transition-all backdrop-blur-xl">
        
        {/* Cute Top-Left Corner Washi Tape */}
        <div className="absolute -top-3.5 left-8 w-24 h-6 washi-tape-kitty rounded-xs transform -rotate-2 z-30 shadow-xs pointer-events-none flex items-center justify-center">
          <span className="text-[9px] font-black text-white uppercase tracking-widest opacity-90">
            ★ SANRIO ★
          </span>
        </div>

        {/* Animated Hello Kitty GIF Peeking on the top-right corner */}
        <div className="absolute -top-5 -right-3 md:-top-4 md:right-6 z-30 pointer-events-none">
          <img
            src="/assets/hello-kitty-gif.gif"
            alt="Hello Kitty GIF"
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-md transform group-hover:scale-110 group-hover:rotate-6 transition-transform"
          />
        </div>

        {/* Inner Card Frame with Dashed Stitching Border */}
        <div className="relative rounded-[28px] border-2 border-dashed border-rose-200/90 bg-gradient-to-br from-white via-rose-50/20 to-pink-50/30 p-5 sm:p-7 flex flex-col md:flex-row items-stretch gap-6 sm:gap-8 overflow-hidden">
          
          {/* Subtle Glossy Reflection at Top */}
          <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-white/60 to-transparent pointer-events-none rounded-t-[28px]" />

          {/* LEFT SIDE: Widescreen Landscape Photo Showcase & Layered Polaroids */}
          <div className="w-full md:w-1/2 relative flex flex-col justify-center min-h-[200px] sm:min-h-[260px] md:min-h-[300px]">
            {/* Layered Polaroid effect underneath */}
            <div className="absolute inset-x-2 inset-y-1 sm:inset-y-2 bg-rose-100 rounded-3xl transform rotate-2 scale-95 opacity-70 border-2 border-rose-200 pointer-events-none" />
            <div className="absolute inset-x-3 inset-y-1 sm:inset-y-2 bg-pink-100 rounded-3xl transform -rotate-2 scale-95 opacity-85 border-2 border-pink-200 pointer-events-none" />

            {/* Main Landscape Cover Image */}
            <div className="relative w-full aspect-[16/10] sm:aspect-auto sm:h-full min-h-[190px] sm:min-h-[250px] md:min-h-[280px] rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-500 group-hover:scale-[1.02] border-2 border-rose-200 bg-rose-50">
              <img
                src={category.coverImage}
                alt={category.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />

              {/* Photo Count Pill */}
              <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-rose-950/85 backdrop-blur-md text-white text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full flex items-center gap-1.5 shadow-md border border-rose-300/40">
                <ImageIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-300" />
                <span>{category.photos.length} Foto Kenangan</span>
              </div>

              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-gradient-to-t from-rose-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-3 sm:pb-4 px-2">
                <span className="text-white text-[11px] sm:text-xs font-extrabold px-3 sm:px-4 py-1 sm:py-1.5 shadow-lg flex items-center gap-1.5 animate-pulse text-center">
                  Klik untuk Buka Koleksi Gambar
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Details, Story Note & Interactive Actions */}
          <div className="md:w-1/2 flex flex-col justify-between pt-2 md:pt-0">
            
            {/* Top Badges & Like Action */}
            <div className="flex items-center justify-between pr-14 md:pr-16">

              <button
                onClick={handleHeartClick}
                className="flex items-center gap-1.5 bg-white hover:bg-rose-50 text-rose-600 px-3.5 py-1 rounded-full text-xs font-extrabold shadow-sm transition-transform active:scale-125 cursor-pointer border border-rose-200"
                title="Suka momen ini!"
              >
                <Heart
                  className={`w-4 h-4 fill-rose-500 text-rose-500 ${
                    likeCount > 0 ? "animate-ping [animation-iteration-count:1]" : ""
                  }`}
                />
                <span>{likeCount > 0 ? `${likeCount} Like` : "Like"}</span>
              </button>
            </div>

            {/* Title & Subtitle */}
            <div className="mt-3">
              <div className="flex items-center gap-2">
                <h2 className="font-[family-name:var(--font-fredoka)] text-2xl sm:text-3xl font-bold text-rose-950 tracking-tight leading-tight">
                  {category.title}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-zinc-600 mt-1 font-medium leading-relaxed">
                {category.subtitle}
              </p>
            </div>

            {/* Hello Kitty Sweet Note Box */}
            <div className="my-3 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-rose-50 via-pink-50 to-red-50 border-2 border-rose-200/90 shadow-xs relative">
              <div className="flex items-start gap-2.5">
                <span className="text-xl">💌</span>
                <p className="font-[family-name:var(--font-caveat)] text-xl sm:text-2xl font-bold text-rose-900 leading-snug">
                  &ldquo;{category.description}&rdquo;
                </p>
              </div>
            </div>

            {/* Photo Thumbnails Preview Row */}
            <div>
              <div className="text-[11px] font-extrabold text-rose-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                <BookOpen className="w-3 h-3" />
                <span>Preview Foto di Dalam Kartu:</span>
              </div>
              <div className="flex items-center gap-2">
                {category.photos.slice(0, 4).map((p, idx) => (
                  <div
                    key={p.id}
                    className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-rose-200 shadow-xs transform hover:scale-110 transition-transform bg-rose-50 shrink-0"
                    style={{ transform: `rotate(${((idx % 3) - 1) * 3}deg)` }}
                  >
                    <img
                      src={p.url}
                      alt={p.caption}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                {category.photos.length > 5 && (
                  <div className="w-12 h-12 rounded-xl bg-rose-500 border-2 border-white text-xs font-black text-white flex flex-col items-center justify-center shadow-xs shrink-0">
                    <span>+{category.photos.length - 4}</span>
                    <span className="text-[9px]">FOTO</span>
                  </div>
                )}
              </div>
            </div>

            {/* Big Cute Action Button */}
            <div className="mt-4 pt-3 border-t-2 border-dashed border-rose-100 flex items-center justify-between">
              <span className="text-xs text-zinc-500 font-bold hidden sm:inline">
                Klik kartu untuk membuka album
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
