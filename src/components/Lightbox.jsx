import React, { useEffect, useCallback } from "react";
import "../style/lightbox.scss";

export default function Lightbox({ images, index, onClose, onPrev, onNext }) {
  const handleKey = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [handleKey]);

  return (
    <div className="lightbox" onClick={onClose}>
      <div className="lightbox__content" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox__close" onClick={onClose} aria-label="Fermer">
          ✕
        </button>

        <button className="lightbox__nav lightbox__nav--prev" onClick={onPrev} aria-label="Précédent">
          ‹
        </button>

        <img
          className="lightbox__img"
          src={images[index]}
          alt={`Noumène ${index + 1}`}
        />

        <button className="lightbox__nav lightbox__nav--next" onClick={onNext} aria-label="Suivant">
          ›
        </button>

        <span className="lightbox__counter">
          {index + 1} / {images.length}
        </span>
      </div>
    </div>
  );
}
