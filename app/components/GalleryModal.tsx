"use client";

import React, { useState, useEffect } from "react";
import { MemoryCategory } from "../data/memoriesData";
import {
  playPopSound,
  playSparkleSound,
  playCameraShutterSound,
} from "../utils/soundEffects";
import confetti from "canvas-confetti";
import {
  X,
  Calendar,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  RotateCw,
  PartyPopper,
  Heart,
  Lock,
  Unlock,
  Images,
} from "lucide-react";

interface GalleryModalProps {
  category: MemoryCategory | null;
  onClose: () => void;
}

export default function GalleryModal({
  category,
  onClose,
}: GalleryModalProps) {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [reactions, setReactions] = useState<{ id: number; emoji: string; x: number; y: number }[]>([]);
  const [noteRevealed, setNoteRevealed] = useState(false);
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  const [showThumbs, setShowThumbs] = useState(false);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (activePhotoIndex !== null) {
          setActivePhotoIndex(null);
        } else {
          onClose();
        }
      } else if (e.key === "ArrowLeft" && activePhotoIndex !== null && category) {
        handlePrevPhoto();
      } else if (e.key === "ArrowRight" && activePhotoIndex !== null && category) {
        handleNextPhoto();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhotoIndex, category]);

  if (!category) return null;

  const toggleFlip = (photoId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playPopSound();
    setFlippedCards((prev) => ({
      ...prev,
      [photoId]: !prev[photoId],
    }));
  };

  const handleOpenSlideshow = (index: number) => {
    playCameraShutterSound();
    setActivePhotoIndex(index);
  };

  const handleNextPhoto = () => {
    if (activePhotoIndex === null) return;
    playPopSound();
    setActivePhotoIndex((prev) => ((prev! + 1) % category.photos.length));
  };

  const handlePrevPhoto = () => {
    if (activePhotoIndex === null) return;
    playPopSound();
    setActivePhotoIndex((prev) =>
      prev! === 0 ? category.photos.length - 1 : prev! - 1
    );
  };

  const triggerLoveShower = () => {
    playSparkleSound();
    confetti({
      particleCount: 90,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#ff2d55", "#fb7185", "#ff85a2", "#ffd1dc", "#ffffff"],
    });
  };

  const addReactionStamp = (emoji: string, e: React.MouseEvent) => {
    playSparkleSound();
    const rect = e.currentTarget.getBoundingClientRect();
    const newReaction = {
      id: Date.now() + Math.random(),
      emoji,
      x: rect.left + 20,
      y: rect.top - 20,
    };
    setReactions((prev) => [...prev, newReaction]);
    setTimeout(() => {
      setReactions((prev) => prev.filter((r) => r.id !== newReaction.id));
    }, 1000);
  };

  const activePhoto =
    activePhotoIndex !== null ? category.photos[activePhotoIndex] : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-md animate-fadeIn">
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl my-auto bg-white rounded-3xl sm:rounded-[40px] shadow-2xl border-4 border-rose-300 overflow-hidden flex flex-col max-h-[92vh] animate-pop-in">

        {/* Hello Kitty Cute Top Ribbon Header */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 washi-tape-kitty text-white shadow-md border-b-4 border-rose-600">
          <div className="flex items-center gap-3">
            <img
              src="/assets/hai-kitty.gif"
              alt="Hello Kitty"
              className="w-10 h-10 object-contain drop-shadow"
            />
            <div>
              <h2 className="font-[family-name:var(--font-fredoka)] text-xl sm:text-2xl font-bold tracking-wide flex items-center gap-2 drop-shadow-xs">
                {category.title}
              </h2>
              <p className="text-xs text-rose-100 font-medium">
                {category.photos.length} Potret Manis Tersimpan 🌸
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={triggerLoveShower}
              className="flex items-center gap-1.5 bg-white text-rose-600 text-xs font-extrabold px-3.5 py-2 rounded-full shadow-md hover:bg-rose-50 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-rose-200"
            >
              <PartyPopper className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Hujan Pita 🎀</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/20 hover:bg-white text-white hover:text-rose-600 transition-colors cursor-pointer"
              title="Tutup (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body / Hello Kitty Scrapbook Grid */}
        <div className="p-4 sm:p-8 overflow-y-auto flex-1 bg-kitty-gingham">
          {/* Sweet Hello Kitty Header Message with animated GIF */}
          <div className="mb-6 p-3.5 sm:p-5 rounded-2xl bg-white/95 border-2 border-rose-200 shadow-sm flex flex-col sm:flex-row items-center text-center sm:text-left gap-3 sm:gap-4">
            <img
              src="/assets/hello-kitty-usagif-animation-33.gif"
              alt="Hello Kitty Mascot"
              className="w-14 h-14 sm:w-20 sm:h-20 object-contain drop-shadow shrink-0"
            />
            <div className="flex-1">
              <p className="font-[family-name:var(--font-caveat)] text-xl sm:text-3xl font-bold text-rose-900 leading-snug">
                &ldquo;{category.description}&rdquo;
              </p>
              <p className="text-[11px] sm:text-[12px] text-rose-700 font-semibold mt-1 flex flex-wrap items-center justify-center sm:justify-start gap-1 leading-relaxed">
                <span>💡 Tip Gemoy:</span> Klik <span className="bg-rose-100 px-2 py-0.5 rounded-md text-rose-800 font-bold">Pesan Rahasia 💌</span> di bawah foto untuk membalik polaroid dan membaca cerita rahasianya!
              </p>
            </div>
          </div>

          {/* Polaroid Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 pb-6">
            {category.photos.map((photo, index) => {
              const isFlipped = !!flippedCards[photo.id];
              const rotation = photo.rotation ?? ((index % 3) - 1) * 2;

              return (
                <div
                  key={photo.id}
                  className="perspective-1000 group relative flex justify-center"
                  style={{
                    transform: `rotate(${rotation}deg)`,
                  }}
                >
                  {/* Hello Kitty Red Washi Tape */}
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-24 h-6 washi-tape-kitty rounded-xs transform -rotate-1 z-20 shadow-xs pointer-events-none flex items-center justify-center">
                    <span className="text-[9px] font-black text-white uppercase tracking-widest opacity-90">
                      ★ SANRIO ★
                    </span>
                  </div>

                  {/* 3D Flip Card Container */}
                  <div
                    className={`relative w-full max-w-[280px] min-h-[390px] bg-white rounded-2xl p-3.5 pb-5 shadow-xl hover:shadow-2xl transition-all duration-700 transform-style-3d border-2 border-rose-200/90 ${isFlipped ? "rotate-y-180" : ""
                      }`}
                  >
                    {/* FRONT OF POLAROID */}
                    <div className="backface-hidden flex flex-col h-full">
                      {/* Photo Area */}
                      <div
                        onClick={() => handleOpenSlideshow(index)}
                        className="relative aspect-square w-full rounded-xl overflow-hidden bg-rose-50 cursor-zoom-in shadow-inner group/img border border-rose-100"
                      >
                        <img
                          src={photo.url}
                          alt={photo.caption}
                          className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />

                        {/* Floating Hello Kitty Sticker */}
                        <span className="absolute bottom-2 right-2 text-2xl drop-shadow-md filter hover:scale-125 transition-transform">
                          {photo.sticker || "🎀"}
                        </span>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-rose-950/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <span className="bg-white text-rose-700 text-xs font-extrabold px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1 border border-rose-200">
                            <Maximize2 className="w-3.5 h-3.5" />
                            Zoom Foto
                          </span>
                        </div>
                      </div>

                      {/* Polaroid Bottom Caption (Handwritten style) */}
                      <div className="mt-3 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-[family-name:var(--font-caveat)] text-2xl font-bold text-rose-950 leading-snug line-clamp-1">
                            {photo.caption}
                          </h4>

                          <div className="flex items-center gap-2 text-[11px] text-zinc-500 mt-1 font-medium">
                            {photo.location && (
                              <span className="flex items-center gap-1 truncate">
                                <MapPin className="w-3 h-3 text-red-500" />
                                {photo.location}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Card Action Buttons */}
                        <div className="mt-3 pt-2.5 border-t border-dashed border-rose-200 flex items-center justify-between">
                          <button
                            onClick={(e) => toggleFlip(photo.id, e)}
                            className="flex items-center gap-1 text-xs font-extrabold text-rose-600 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 px-3 py-1 rounded-full transition-colors cursor-pointer border border-rose-200"
                          >
                            <RotateCw className="w-3 h-3" />
                            Pesan Rahasia 💌
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* BACK OF POLAROID (Secret Letter Note) */}
                    <div className="rotate-y-180 backface-hidden absolute inset-0 bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 rounded-2xl p-6 flex flex-col justify-between border-3 border-rose-300">
                      <div className="flex items-center justify-between border-b-2 border-dashed border-rose-200 pb-2">
                        <span className="font-[family-name:var(--font-caveat)] text-2xl font-bold text-rose-800 flex items-center gap-1.5">
                          Surat Cinta Hello Kitty
                        </span>
                        <span className="text-2xl">{photo.sticker || "🎀"}</span>
                      </div>

                      <div className="my-auto py-2">
                        <p className="font-[family-name:var(--font-caveat)] text-2xl sm:text-3xl font-bold text-zinc-800 leading-relaxed italic">
                          &ldquo;{photo.secretNote || "Setiap senyuman bersamamu adalah pelangi terindah di hidupku! 🌸"}&rdquo;
                        </p>
                      </div>

                      <button
                        onClick={(e) => toggleFlip(photo.id, e)}
                        className="w-full text-center py-2 text-xs font-extrabold text-white bg-rose-500 hover:bg-rose-600 rounded-xl shadow-xs transition-colors cursor-pointer"
                      >
                        Kembali ke Foto Polaroid 📷
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Floating Stamp Reactions Animation */}
        {reactions.map((r) => (
          <span
            key={r.id}
            className="fixed text-3xl animate-float pointer-events-none z-50 drop-shadow-md"
            style={{ left: `${r.x}px`, top: `${r.y}px` }}
          >
            {r.emoji}
          </span>
        ))}
      </div>

      {/* ✿ KAWAII SLIDESHOW MODAL ✿ */}
      {activePhotoIndex !== null && activePhoto && (
        <div
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center p-3 sm:p-5"
          style={{
            background: "radial-gradient(ellipse at top, #ffe4ec 0%, #ffd6e7 30%, rgba(255,182,205,0.97) 100%)",
            backdropFilter: "blur(20px) saturate(1.8)",
          }}
          onClick={() => { setActivePhotoIndex(null); setNoteRevealed(false); }}
        >

          {/* ── Decorative top strip (gingham ribbon) ── */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-kitty-gingham opacity-60 pointer-events-none" />

          {/* ── TOP BAR ── */}
          <div className="absolute top-3 left-0 right-0 flex items-center justify-between px-4 sm:px-6 z-30">
            {/* Left: Hello Kitty + title */}
            <div className="flex items-center gap-2">
              <img src="/assets/hai-kitty.gif" alt="kitty" className="w-8 h-8 object-contain drop-shadow" />
              <div>
                <p className="font-[family-name:var(--font-fredoka)] text-rose-800 font-bold text-sm leading-none">
                  {category.title}
                </p>
                <p className="text-[10px] text-rose-500 font-semibold">
                  {activePhotoIndex + 1} / {category.photos.length} foto
                </p>
              </div>
            </div>

            {/* Right: action buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); setShowThumbs(v => !v); }}
                className="flex items-center gap-1 text-[11px] font-extrabold px-3 py-1.5 rounded-full cursor-pointer transition-all hover:scale-105 active:scale-95 border-2"
                style={{
                  background: showThumbs ? "#f43f5e" : "#fff",
                  color: showThumbs ? "#fff" : "#f43f5e",
                  borderColor: "#f43f5e",
                }}
              >
                <Images className="w-3 h-3" />
                <span className="hidden sm:inline">Strip</span>
              </button>
              <button
                onClick={() => { setActivePhotoIndex(null); setNoteRevealed(false); }}
                className="p-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white cursor-pointer transition-all hover:scale-110 active:scale-95 shadow-md border-2 border-rose-300"
                title="Tutup (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ── MAIN AREA ── */}
          <div
            className="flex flex-col items-center w-full max-w-xl mt-10 mb-2"
            onClick={(e) => e.stopPropagation()}
          >

            {/* ── BIG POLAROID CARD ── */}
            <div className="relative w-full" style={{ maxWidth: "480px" }}>

              {/* Washi tape top */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-28 h-7 washi-tape-kitty rounded-sm z-20 shadow flex items-center justify-center" style={{ transform: "translateX(-50%) rotate(-1.5deg)" }}>
                <span className="text-[9px] font-black text-white uppercase tracking-widest opacity-90">✿ SANRIO ✿</span>
              </div>

              {/* Hello Kitty sticker corner */}
              <div className="absolute -top-5 -right-4 z-30 pointer-events-none animate-bow-bounce">
                <img src="/assets/hello-kitty-gif-6.gif" alt="kitty" className="w-16 h-16 object-contain drop-shadow-lg" />
              </div>

              {/* Polaroid body */}
              <div className="bg-white rounded-3xl pt-5 px-4 pb-4 shadow-2xl border-4 border-rose-300" style={{ boxShadow: "0 20px 60px rgba(244,63,94,0.25), 0 4px 16px rgba(0,0,0,0.12)" }}>

                {/* Photo */}
                <div className="relative rounded-2xl overflow-hidden bg-rose-50 shadow-inner border border-rose-100" style={{ aspectRatio: "4/3" }}>
                  <img
                    key={activePhotoIndex}
                    src={activePhoto.url}
                    alt={activePhoto.caption}
                    className="w-full h-full object-cover animate-pop-in"
                    style={{ maxHeight: "44vh" }}
                  />

                  {/* Sticker */}
                  <span className="absolute bottom-2.5 right-2.5 text-3xl drop-shadow-lg animate-bounce">
                    {activePhoto.sticker || "🎀"}
                  </span>

                  {/* Like button */}
                  <button
                    onClick={() => { playSparkleSound(); setLiked(prev => ({ ...prev, [activePhotoIndex]: !prev[activePhotoIndex] })); }}
                    className="absolute top-2.5 right-2.5 p-1.5 rounded-full cursor-pointer transition-all hover:scale-125 active:scale-90 shadow-md border-2 border-white"
                    style={{ background: liked[activePhotoIndex] ? "#f43f5e" : "rgba(255,255,255,0.85)" }}
                  >
                    <Heart
                      className="w-4 h-4"
                      style={{ color: liked[activePhotoIndex] ? "#fff" : "#f43f5e" }}
                      fill={liked[activePhotoIndex] ? "#fff" : "none"}
                    />
                  </button>
                </div>

                {/* Caption area */}
                <div className="mt-3 text-center">
                  <h3 className="font-[family-name:var(--font-caveat)] text-2xl sm:text-3xl font-bold text-rose-900 leading-snug">
                    {activePhoto.caption}
                  </h3>
                  <div className="flex items-center justify-center flex-wrap gap-x-3 gap-y-1 mt-1">
                    {activePhoto.date && (
                      <span className="flex items-center gap-1 text-[11px] text-zinc-500 font-medium">
                        <Calendar className="w-3 h-3 text-rose-400" />
                        {activePhoto.date}
                      </span>
                    )}
                    {activePhoto.location && (
                      <span className="flex items-center gap-1 text-[11px] text-zinc-500 font-medium">
                        <MapPin className="w-3 h-3 text-rose-400" />
                        {activePhoto.location}
                      </span>
                    )}
                  </div>
                </div>

                {/* Secret note toggle */}
                {activePhoto.secretNote && (
                  <div className="mt-3 border-t-2 border-dashed border-rose-200 pt-3">
                    <button
                      onClick={() => { playSparkleSound(); setNoteRevealed(v => !v); }}
                      className="w-full flex items-center justify-center gap-2 text-xs font-extrabold py-2 px-4 rounded-xl cursor-pointer transition-all hover:scale-[1.02] active:scale-95 border-2"
                      style={{
                        background: noteRevealed ? "linear-gradient(135deg,#f43f5e,#fb7185)" : "#fff0f5",
                        color: noteRevealed ? "#fff" : "#e11d48",
                        borderColor: "#fda4af",
                      }}
                    >
                      {noteRevealed ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                      {noteRevealed ? "Sembunyikan Pesan 💌" : "Buka Pesan Rahasia 💌"}
                    </button>

                    {noteRevealed && (
                      <div className="mt-2 p-3.5 bg-rose-50 rounded-xl border-2 border-rose-200 animate-pop-in">
                        <p className="font-[family-name:var(--font-caveat)] text-2xl text-rose-800 leading-snug italic text-center">
                          &ldquo;{activePhoto.secretNote}&rdquo;
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* ── Dot navigation + nav buttons row ── */}
            <div className="flex items-center gap-3 mt-5">
              {/* Prev */}
              <button
                onClick={handlePrevPhoto}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white border-2 border-rose-400 text-rose-600 hover:bg-rose-500 hover:text-white cursor-pointer transition-all hover:scale-110 active:scale-95 shadow-md"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Pill dots */}
              <div className="flex items-center gap-1.5">
                {category.photos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setNoteRevealed(false); setActivePhotoIndex(i); }}
                    className="rounded-full cursor-pointer transition-all"
                    style={{
                      width: i === activePhotoIndex ? "22px" : "8px",
                      height: "8px",
                      background: i === activePhotoIndex ? "#f43f5e" : "#fda4af",
                      boxShadow: i === activePhotoIndex ? "0 0 6px #f43f5e" : "none",
                    }}
                  />
                ))}
              </div>

              {/* Next */}
              <button
                onClick={handleNextPhoto}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white border-2 border-rose-400 text-rose-600 hover:bg-rose-500 hover:text-white cursor-pointer transition-all hover:scale-110 active:scale-95 shadow-md"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* ── THUMBNAIL STRIP (toggleable) ── */}
          {showThumbs && (
            <div
              className="absolute bottom-4 left-0 right-0 px-4 z-30"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-center gap-2 overflow-x-auto py-2" style={{ scrollbarWidth: "none" }}>
                {category.photos.map((photo, i) => (
                  <button
                    key={photo.id}
                    onClick={() => { setNoteRevealed(false); setActivePhotoIndex(i); }}
                    className="shrink-0 rounded-xl overflow-hidden cursor-pointer transition-all hover:scale-110"
                    style={{
                      width: i === activePhotoIndex ? "56px" : "44px",
                      height: i === activePhotoIndex ? "56px" : "44px",
                      border: i === activePhotoIndex ? "3px solid #f43f5e" : "3px solid #fda4af",
                      boxShadow: i === activePhotoIndex ? "0 0 12px rgba(244,63,94,0.6)" : "none",
                      opacity: i === activePhotoIndex ? 1 : 0.65,
                      transition: "all 0.2s ease",
                    }}
                  >
                    <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Decorative bottom strip */}
          <div className="absolute bottom-0 left-0 right-0 h-3 bg-kitty-gingham opacity-60 pointer-events-none" />

        </div>
      )}
    </div>
  );
}
