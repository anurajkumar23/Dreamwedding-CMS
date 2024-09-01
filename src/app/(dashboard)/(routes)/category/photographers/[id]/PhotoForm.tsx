"use client";

import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import GalleryImage from "@/components/Gallery/Gallary";
import Image from "next/image";

interface PhotoFormProps {
  initialPhotos: string[];
  photographerId: string;
}

const PhotoForm: React.FC<PhotoFormProps> = ({
  initialPhotos,
  photographerId,
}) => {
  const [photos, setPhotos] = useState(initialPhotos);

  const [newPhotos, setNewPhotos] = useState<File[]>([]);
  const [newPhotosPreviews, setNewPhotosPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleDeletedPhotos(deletephotos: string[]) {
    const token = localStorage.getItem("jwt_token");
    console.log(deletephotos,"frontend")

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      setLoading(true);

      await axios.patch(
        `http://localhost:3000/api/photographer/photos/${photographerId}/delete`,
        deletephotos,
        config
      );

      setPhotos(photos);
      toast.success("Photos updated successfully.");
    } catch (error: any) {
      toast.error("Failed to update photos.");
    } finally {
      setLoading(false);
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFileList = Array.from(files);
      setNewPhotos((prevPhotos) => [...prevPhotos, ...newFileList]);
      setNewPhotosPreviews((prevPreviews) => [
        ...prevPreviews,
        ...newFileList.map((file) => URL.createObjectURL(file)),
      ]);
    }
  };

  const removeFile = (fileToRemove: File, index: number) => {
    setNewPhotos((prevPhotos) => prevPhotos.filter((file, i) => i !== index));
    setNewPhotosPreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
  };

  const onPhotoSubmit = async () => {
    const token = localStorage.getItem("jwt_token");
    const formData = new FormData();

    // Append files to FormData
    newPhotos.forEach((file) => {
      formData.append("photos", file);
    });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      setLoading(true);
      await axios.patch(
        `http://localhost:3000/api/photographer/photos/${photographerId}`,
        formData,
        config
      );
      setPhotos([...photos, ...newPhotosPreviews]);
      setNewPhotos([]);
      setNewPhotosPreviews([]);
      (document.getElementById("photo-input") as HTMLInputElement).value = ""; // Clear file input after submission
      toast.success("Photos updated successfully.");
    } catch (error: any) {
      toast.error("Failed to update photos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:grid-cols-10 grid gap-4 container">
      <div className="text-gray-500 md:col-span-4 w-full h-auto relative rounded-lg overflow-hidden mb-5">
        <label className="text-gray-500">Existing Photos</label>
        <GalleryImage
          photos={photos}
          category="photographer"
          handleDeletedPhotos={handleDeletedPhotos}
        />

        <label className="text-gray-500">Add New Photos</label>
        <input
          type="file"
          id="photo-input"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="my-4"
        />

        {newPhotosPreviews.length > 0 && (
          <div className="my-4">
            <h3 className="text-gray-500">New Photos Preview</h3>
            <div className="flex flex-wrap gap-2">
              {newPhotosPreviews.map((preview, index) => (
                <div key={index} className="relative">
                  <Image
                    width={500}
                    height={500}
                    src={preview}
                    alt={`Preview ${index}`}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeFile(newPhotos[index], index)}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <Button
          type="button"
          onClick={onPhotoSubmit}
          disabled={loading || newPhotos.length === 0}
          className="bg-gray-500"
        >
          {loading ? "Uploading..." : "Submit Photos"}
        </Button>
      </div>
    </div>
  );
};

export default PhotoForm;
