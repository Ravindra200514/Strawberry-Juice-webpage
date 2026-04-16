"use client";

import { useEffect, useRef } from "react";
import { imageFrames } from "../lib/imageStore";

export default function ScrollAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      // Calculate scroll progress (0 to 1)
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      
      // Hero (200vh) + Story (200vh) = 400vh.
      // We want the bottle to be completely finished splashing by the time the features section is centered.
      // A max scroll of 3.5 * innerHeight (350vh) means the animation hits 100% as the features section scrolls into view.
      const maxAnimationScroll = window.innerHeight * 3.5;
      
      let scrollProgress = maxAnimationScroll > 0 ? scrollTop / maxAnimationScroll : 0;
      scrollProgress = Math.max(0, Math.min(1, scrollProgress));

      // Calculate which frame to show
      const totalFrames = imageFrames.length;
      if (totalFrames > 0) {
        const frameIndex = Math.min(totalFrames - 1, Math.floor(scrollProgress * totalFrames));
        const img = imageFrames[frameIndex];

        if (img && img.complete) {
          // Resize canvas to match the window inner height / width maintaining aspect ratio
          // Actually, setting canvas width/height to window width/height is best
          // and then drawing the image to cover or contain. Let's use 'contain' for the bottle
          const canvasWidth = canvas.width;
          const canvasHeight = canvas.height;
          
          ctx.clearRect(0, 0, canvasWidth, canvasHeight);

          // Image dimensions
          const imgAspect = img.width / img.height;
          const canvasAspect = canvasWidth / canvasHeight;
          
          let drawWidth, drawHeight;
          
          if (canvasAspect > imgAspect) {
            // Canvas is wider than image
            drawHeight = canvasHeight;
            drawWidth = imgAspect * drawHeight;
          } else {
            // Canvas is taller than image
            drawWidth = canvasWidth;
            drawHeight = drawWidth / imgAspect;
          }
          
          // Center the image
          const x = (canvasWidth - drawWidth) / 2;
          // Slightly offset Y to fit the UI sections better, or keep centered
          const y = (canvasHeight - drawHeight) / 2;
          
          ctx.drawImage(img, x, y, drawWidth, drawHeight);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // immediate render on resize doesn't hurt
      render();
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas(); // Initialize size and start render loop

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-10"
    />
  );
}
