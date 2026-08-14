"use client";

import React, { useState, useEffect, useRef } from "react";
import { Music, Volume2, VolumeX } from "lucide-react";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Sweet cute Hello Kitty lofi pentatonic chord progression (Fmaj7 -> Dm7 -> Bbmaj7 -> C7)
  const chordNotes = [
    [349.23, 440.00, 523.25, 659.25], // F, A, C, E (Fmaj7)
    [293.66, 349.23, 440.00, 523.25], // D, F, A, C (Dm7)
    [233.08, 293.66, 349.23, 440.00], // Bb, D, F, A (Bbmaj7)
    [261.63, 329.63, 392.00, 466.16], // C, E, G, Bb (C7)
  ];

  const playChordStep = (chordIdx: number) => {
    if (!audioCtxRef.current || audioCtxRef.current.state !== "running" || isMuted) return;
    const ctx = audioCtxRef.current;
    const chord = chordNotes[chordIdx % chordNotes.length];

    chord.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      const startTime = ctx.currentTime + idx * 0.14;
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.04, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 1.3);
    });
  };

  const togglePlay = () => {
    if (!isPlaying) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current && AudioCtxClass) {
        audioCtxRef.current = new AudioCtxClass();
      }
      if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
      setIsPlaying(true);

      let step = 0;
      playChordStep(step);
      intervalRef.current = setInterval(() => {
        step++;
        playChordStep(step);
      }, 1400);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-full shadow-2xl border-2 border-rose-300 hover:shadow-rose-300/60 transition-all">
      {/* Animated Mini GIF when music is playing */}
      {isPlaying && (
        <img
          src="/assets/hello-kitty-gif-6.gif"
          alt="Dancing Kitty"
          className="w-7 h-7 object-contain drop-shadow"
        />
      )}

      <button
        onClick={togglePlay}
        className={`flex items-center gap-2 text-xs font-extrabold px-3.5 py-1.5 rounded-full transition-all cursor-pointer shadow-xs ${
          isPlaying
            ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-rose-200"
            : "bg-rose-100 text-rose-700 hover:bg-rose-200 border border-rose-200"
        }`}
      >
        <Music className={`w-3.5 h-3.5 ${isPlaying ? "animate-bounce" : ""}`} />
        <span>{isPlaying ? "Kitty BGM: ON" : "Play BGM"}</span>
      </button>

      {isPlaying && (
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-1.5 rounded-full text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-zinc-400" /> : <Volume2 className="w-4 h-4 animate-pulse" />}
        </button>
      )}

      {isPlaying && !isMuted && (
        <div className="flex items-center gap-0.5 h-3 px-1">
          <span className="w-1 bg-rose-500 rounded-full animate-bounce [animation-delay:-0.3s] h-3"></span>
          <span className="w-1 bg-pink-500 rounded-full animate-bounce [animation-delay:-0.15s] h-2"></span>
          <span className="w-1 bg-red-500 rounded-full animate-bounce [animation-delay:-0.45s] h-3.5"></span>
          <span className="w-1 bg-rose-400 rounded-full animate-bounce h-2"></span>
        </div>
      )}
    </div>
  );
}
