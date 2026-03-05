/* eslint-disable @next/next/no-img-element */
"use client";
import { getRandomImage } from "@/utils";
import { useEffect, useState } from "react";

export default function GalleryPage() {
    const [imageUrl, setImageUrl] = useState<string>();
    
    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;
        const updateImage = () => {
            getRandomImage().then((url) => {
                if (url.isSome()) {
                    setImageUrl(url.unwrap());
                }
                timer = setTimeout(updateImage, 5000);
            });
        };
        updateImage();
        return () => clearTimeout(timer as NodeJS.Timeout);
    }, []);
    return imageUrl ? <div className="with-full flex items-center justify-center h-screen">
        <img width={1000} height={800} className="object-contain" src={imageUrl} alt="Random Image" />
    </div> : <div>Loading...</div>;
}