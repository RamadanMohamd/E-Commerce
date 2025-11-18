import { useState, useCallback, useRef, useEffect } from 'react';

interface ZoomState {
  isZooming: boolean;
  zoomPosition: { x: number; y: number };
  backgroundPosition: string;
}

export const useImageZoom = () => {
  const [zoomState, setZoomState] = useState<ZoomState>({
    isZooming: false,
    zoomPosition: { x: 0, y: 0 },
    backgroundPosition: '0% 0%',
  });

  const imageRef = useRef<HTMLDivElement>(null);
  const [imgDimensions, setImgDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (imageRef.current) {
      const img = imageRef.current.querySelector('img');
      if (img) {
        const updateDimensions = () => {
          setImgDimensions({
            width: img.naturalWidth,
            height: img.naturalHeight,
          });
        };
        
        if (img.complete) {
          updateDimensions();
        } else {
          img.addEventListener('load', updateDimensions);
          return () => img.removeEventListener('load', updateDimensions);
        }
      }
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    setZoomState((prev) => ({ ...prev, isZooming: true }));
  }, []);

  const handleMouseLeave = useCallback(() => {
    setZoomState({
      isZooming: false,
      zoomPosition: { x: 0, y: 0 },
      backgroundPosition: '0% 0%',
    });
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate percentage position for smooth zoom tracking
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    setZoomState((prev) => ({
      ...prev,
      zoomPosition: { x, y },
      backgroundPosition: `${xPercent}% ${yPercent}%`,
    }));
  }, []);

  return {
    zoomState,
    imageRef,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseMove,
    imgDimensions,
  };
};
