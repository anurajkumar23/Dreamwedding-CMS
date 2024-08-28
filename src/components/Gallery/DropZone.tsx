"use client";

import React from "react";

interface DropzoneProps {
  onDrop: (files: FileList) => void;
  onChange: (files: FileList) => void;
}

const Dropzone: React.FC<DropzoneProps> = ({ onDrop, onChange }) => {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files.length) {
      onDrop(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      onChange(e.target.files);
    }
  };

  return (
    <div>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => document.getElementById("addImageInput")?.click()} // Open file dialog on click
        className="border-2 border-dashed border-gray-300 p-4 rounded-lg text-center cursor-pointer"
      >
        Drag & Drop your photos here or click to upload
      </div>
      <input
        id="addImageInput"
        type="file"
        multiple
        accept="image/*, application/pdf"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default Dropzone;
