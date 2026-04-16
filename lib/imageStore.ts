export const imageFrames: HTMLImageElement[] = [];

export const preloadImages = (onProgress: (percent: number) => void, onComplete: () => void) => {
  if (imageFrames.length > 0) {
    onComplete();
    return;
  }

  const startFrame = 55;
  const endFrame = 192;
  const totalFrames = endFrame - startFrame + 1;
  let loaded = 0;

  for (let i = startFrame; i <= endFrame; i++) {
    const img = new Image();
    const frameNumber = i.toString().padStart(5, "0");
    img.src = `/frames/${frameNumber}.png`;
    
    img.onload = () => {
      loaded++;
      onProgress(Math.round((loaded / totalFrames) * 100));
      if (loaded === totalFrames) {
        onComplete();
      }
    };
    
    img.onerror = () => {
      loaded++;
      if (loaded === totalFrames) {
        onComplete();
      }
    };
    
    imageFrames.push(img);
  }
};
