"use client";

import Image from "next/image";
import { useState } from "react";
import type { Photo } from "@/types/album";
import { PhotoLightbox } from "./PhotoLightbox";
import { PhotoItemActions } from "./PhotoItemActions";

export function PhotoGrid({
  photos,
  albumId,
}: {
  photos: Photo[];
  albumId: string;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!photos.length) {
    return (
      <p className="py-12 text-center text-zinc-500 dark:text-zinc-400">
        暂无照片，点击「上传图片」添加
      </p>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className="group relative aspect-square overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800"
          >
            <button
              type="button"
              className="absolute inset-0 block h-full w-full"
              onClick={() => setLightboxIndex(index)}
            >
              <Image
                src={photo.url}
                alt={photo.originalName}
                fill
                className="object-cover transition group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, 20vw"
                unoptimized
              />
            </button>
            <PhotoItemActions
              albumId={albumId}
              photo={photo}
              onSetCover={() => setLightboxIndex(null)}
            />
          </div>
        ))}
      </div>
      {lightboxIndex !== null && (
        <PhotoLightbox
          photos={photos}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(i) => setLightboxIndex(i)}
        />
      )}
    </>
  );
}
