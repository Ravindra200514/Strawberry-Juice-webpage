"use client";

import { useEffect, useState } from "react";
import { preloadImages } from "../lib/imageStore";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    preloadImages(
      (percent) => {
        setProgress(percent);
      },
      () => {
        // slight delay to ensure UI updates to 100%
        setTimeout(() => setIsFading(true), 300);
        setTimeout(() => {
          onComplete();
        }, 1000); // Wait for fade transition
      }
    );
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-700 ease-in-out ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="w-64 relative text-center">
        <h2 className="text-white text-xl uppercase tracking-[0.3em] mb-6 font-light">
          Loading
        </h2>
        
        {/* Progress Bar Container */}
        <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Percentage text */}
        <p className="text-primary mt-4 font-bold text-lg">{progress}%</p>
      </div>
    </div>
  );
}
