"use client";

import React, { useState, useCallback ,useRef} from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface GalleryImageProps {
  photos: string[];
  category: string;
  deletePhotos: (newPhotos: number[]) => void;
}

const GalleryImage: React.FC<GalleryImageProps> = ({ photos, category, onChange }) => {
  const [currentImage, setCurrentImage] = useState<number | null>(null);
  const [localPhotos, setLocalPhotos] = useState<string[]>(photos);
  const deletePhotoIndex=useRef<number[]>();

  const openLightbox = useCallback((index: number) => {
    setCurrentImage(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setCurrentImage(null);
  }, []);

  const removeImage = (index: number) => {
    const updatedPhotos = localPhotos.filter((_, idx) => idx !== index);
    setLocalPhotos(updatedPhotos); 
    deletePhotoIndex.current.push(index);
  };

  const handleUpdate = () => {
   
    deletePhotos( deletePhotoIndex.current); 
  };

  return (
    <div>
      <section id="photos">
        <div className="columns-2 gap-1 sm:columns-3">
          {localPhotos.map((imageUrl, idx) => {
            // Detect if the image URL is a blob (local file) or a server-hosted image
            const isBlobUrl = imageUrl.startsWith("blob:");
            const photoUrl = isBlobUrl
              ? imageUrl
              : `/images/${category}/media/${imageUrl}`;
            console.log("Rendering image:", photoUrl);

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
                  onClick={() => removeImage(idx)}
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
              src={
                localPhotos[currentImage]?.startsWith("blob:")
                  ? localPhotos[currentImage]
                  : `/images/${category}/media/${localPhotos[currentImage]}`
              }
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
      <div className="mt-4">
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={handleUpdate}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default GalleryImage;
