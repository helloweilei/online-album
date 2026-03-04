"use client";

import { useEffect } from "react";
import Image from "next/image";
import type { Photo } from "@/types/album";

export function PhotoLightbox({
  photos,
  currentIndex,
  onClose,
  onNavigate,
}: {
  photos: Photo[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const photo = photos[currentIndex];
  const prev = currentIndex > 0 ? currentIndex - 1 : null;
  const next =
    currentIndex < photos.length - 1 ? currentIndex + 1 : null;

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && prev !== null) onNavigate(prev);
      if (e.key === "ArrowRight" && next !== null) onNavigate(next);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onNavigate, prev, next]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="图片预览"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 cursor-pointer rounded-full bg-white/10 p-2 text-white transition-colors duration-200 hover:bg-white/20"
        aria-label="关闭"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      {prev !== null && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(prev);
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-white/10 p-2 text-white transition-colors duration-200 hover:bg-white/20"
          aria-label="上一张"
        >
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      {next !== null && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(next);
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-white/10 p-2 text-white transition-colors duration-200 hover:bg-white/20"
          aria-label="下一张"
        >
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
      <div
        className="relative max-h-[90vh] max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        {photo && (
          <Image
            src={photo.url}
            alt={photo.originalName}
            width={1200}
            height={900}
            className="max-h-[90vh] w-auto object-contain"
            unoptimized
          />
        )}
      </div>
      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/80">
        {currentIndex + 1} / {photos.length}
      </p>
    </div>
  );
}
