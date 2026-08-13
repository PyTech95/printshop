import React, { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from "lucide-react";

export const ImageLightbox = ({ images, index, alt, onClose, onIndexChange }) => {
  const [zoomed, setZoomed] = useState(false);
  const total = images.length;

  const step = useCallback(
    (d) => {
      setZoomed(false);
      onIndexChange((index + d + total) % total);
    },
    [index, total, onIndexChange]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, step]);

  return createPortal(
    <div
      data-testid="image-lightbox"
      className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center animate-in fade-in duration-200"
      onClick={onClose}
    >
      <button
        data-testid="lightbox-close"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors"
      >
        <X size={26} />
      </button>

      <button
        data-testid="lightbox-zoom"
        onClick={(e) => {
          e.stopPropagation();
          setZoomed((z) => !z);
        }}
        aria-label={zoomed ? "Zoom out" : "Zoom in"}
        className="absolute top-4 left-4 flex items-center gap-2 px-4 h-11 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-colors"
      >
        {zoomed ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
        {zoomed ? "Fit" : "Zoom"}
      </button>

      {total > 1 && (
        <>
          <button
            data-testid="lightbox-prev"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Previous image"
            className="absolute left-2 sm:left-6 w-12 h-12 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ChevronLeft size={30} />
          </button>
          <button
            data-testid="lightbox-next"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next image"
            className="absolute right-2 sm:right-6 w-12 h-12 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ChevronRight size={30} />
          </button>
          <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs font-medium text-white/70 tracking-widest">
            {index + 1} / {total}
          </span>
        </>
      )}

      <div className={`w-full h-full flex items-center justify-center p-6 sm:p-14 ${zoomed ? "overflow-auto" : ""}`}>
        <img
          data-testid="lightbox-image"
          src={images[index]}
          alt={alt}
          onClick={(e) => {
            e.stopPropagation();
            setZoomed((z) => !z);
          }}
          className={
            zoomed
              ? "max-w-none w-[190%] sm:w-[150%] cursor-zoom-out"
              : "max-w-full max-h-full object-contain cursor-zoom-in"
          }
        />
      </div>
    </div>,
    document.body
  );
};
