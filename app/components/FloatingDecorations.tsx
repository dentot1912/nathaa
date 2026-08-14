"use client";

import React, { useState, useEffect } from "react";
import { playPopSound } from "../utils/soundEffects";

interface FloatingItem {
  id: number;
  emoji: string;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
}

export default function FloatingDecorations() {
  const [items, setItems] = useState<FloatingItem[]>([]);
  const [sparklePops, setSparklePops] = useState<{ id: number; x: number; y: number; emoji: string }[]>([]);

  useEffect(() => {
    // Hello Kitty dreamy icons
    const emojis = ["🎀", "☁️", "🍓", "🍎", "💖", "✨", "🌸", "⭐", "🍼", "🎀", "☁️", "🍰"];
    const generated: FloatingItem[] = Array.from({ length: 22 }, (_, i) => ({
      id: i,
      emoji: emojis[i % emojis.length],
      left: Math.random() * 94,
      top: Math.random() * 94,
      size: Math.floor(Math.random() * 14) + 20, // 20px - 34px
      duration: Math.floor(Math.random() * 5) + 5, // 5s - 10s
      delay: Math.random() * 3,
    }));
    setItems(generated);
  }, []);

  const handlePop = (e: React.MouseEvent<HTMLSpanElement>, emoji: string) => {
    playPopSound();
    const rect = e.currentTarget.getBoundingClientRect();
    const newPop = {
      id: Date.now() + Math.random(),
      x: rect.left + rect.width / 2,
      y: rect.top,
      emoji: "🎀✨",
    };
    setSparklePops((prev) => [...prev, newPop]);
    setTimeout(() => {
      setSparklePops((prev) => prev.filter((p) => p.id !== newPop.id));
    }, 600);
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Dreamy Ambient Pastel Glow Orbs */}
      <div className="absolute top-[-10%] left-[-5%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-br from-pink-300/40 via-rose-200/30 to-transparent blur-3xl animate-glow-1 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tl from-rose-300/40 via-pink-200/30 to-purple-200/20 blur-3xl animate-glow-2 pointer-events-none" />
      <div className="absolute top-[35%] right-[15%] w-[35vw] h-[35vw] rounded-full bg-gradient-to-bl from-amber-200/30 via-pink-100/30 to-transparent blur-3xl pointer-events-none" />

      {/* Floating Hello Kitty & Dreamy Elements */}
      {items.map((item) => (
        <span
          key={item.id}
          onClick={(e) => handlePop(e, item.emoji)}
          className="absolute pointer-events-auto cursor-pointer transition-transform hover:scale-150 active:scale-90 hover:rotate-12 select-none opacity-40 hover:opacity-100 drop-shadow-xs"
          style={{
            left: `${item.left}%`,
            top: `${item.top}%`,
            fontSize: `${item.size}px`,
            animation: `float ${item.duration}s ease-in-out infinite`,
            animationDelay: `${item.delay}s`,
          }}
          title="Klik aku! 🎀"
        >
          {item.emoji}
        </span>
      ))}

      {/* Sparkle pop feedback */}
      {sparklePops.map((pop) => (
        <span
          key={pop.id}
          className="fixed text-2xl animate-ping pointer-events-none z-50 text-rose-500 font-bold"
          style={{ left: `${pop.x}px`, top: `${pop.y}px` }}
        >
          {pop.emoji}
        </span>
      ))}
    </div>
  );
}
