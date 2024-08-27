"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface GalleryImageProps {
  photos: string[];
  category: string;
  onChange: (newPhotos: string[]) => void;
}

const GalleryImage: React.FC<GalleryImageProps> = ({ photos, category, onChange }) => {
  const [currentImage, setCurrentImage] = useState<number | null>(null);

  const openLightbox = useCallback((index: number) => {
    setCurrentImage(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setCurrentImage(null);
  }, []);

  const removeImage = (index: number) => {
    const updatedPhotos = photos.filter((_, idx) => idx !== index);
    onChange(updatedPhotos); // Update photos array in the form
  };

  return (
    <div>
      <section id="photos">
        <div className="columns-2 gap-1 sm:columns-3">
          {photos.map((imageUrl, idx) => {
            const photoUrl = `/images/${category}/media/${imageUrl}`;
            console.log("Rendering image:", photoUrl); // Log the image URL for debugging

            return (
              <div key={idx} className="relative mb-4">
                <Image
                  className="size-full rounded-lg object-contain cursor-pointer"
                  src={photoUrl}
                  alt={`media photo-${idx}`}
                  width={500}
                  height={500}
                  onClick={() => openLightbox(idx)}
                  loading="lazy"
                />
                <button
                  className="absolute top-2 right-2 p-1 text-white bg-red-600 rounded-full"
                  onClick={() => removeImage(idx)} // Remove the image
                >
                  <X size={20} />
                </button>
              </div>
            );
          })}
        </div>
      </section>
      {currentImage !== null && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75">
          <div className="relative w-full h-full">
            <Image
              src={`/images/${category}/media/${photos[currentImage]}`}
              alt={`Photo ${currentImage}`}
              layout="fill"
              objectFit="contain"
              loading="lazy"
            />
            <button
              className="absolute top-0 right-0 p-4 text-white"
              onClick={closeLightbox}
            >
              <X />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryImage;
