'use client';

import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Plus } from 'lucide-react';

interface MultiImageUploadProps {
  values: string[];
  onChange: (urls: string[]) => void;
  label?: string;
  className?: string;
  maxImages?: number;
}

export default function MultiImageUpload({
  values,
  onChange,
  label,
  className = '',
  maxImages = 10
}: MultiImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newImages: string[] = [];
    const remainingSlots = maxImages - values.length;
    const filesToProcess = Math.min(files.length, remainingSlots);

    let processed = 0;

    for (let i = 0; i < filesToProcess; i++) {
      const file = files[i];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImages.push(reader.result as string);
          processed++;

          if (processed === filesToProcess) {
            onChange([...values, ...newImages]);
          }
        };
        reader.readAsDataURL(file);
      } else {
        processed++;
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemove = (index: number) => {
    const newValues = values.filter((_, i) => i !== index);
    onChange(newValues);
  };

  const canAddMore = values.length < maxImages;

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          <span className="text-gray-400 font-normal ml-2">(Optional - Add multiple)</span>
        </label>
      )}

      {/* Image Grid */}
      {values.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-3">
          {values.map((image, index) => (
            <div key={index} className="relative rounded-lg overflow-hidden border-2 border-gray-200 aspect-square">
              <img
                src={image}
                alt={`Product image ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute top-1 right-1 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
              >
                <X className="w-3 h-3" />
              </button>
              {index === 0 && (
                <span className="absolute bottom-1 left-1 px-2 py-0.5 bg-[#7A916C] text-white text-xs rounded">
                  Main
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upload Area */}
      {canAddMore && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-all ${
            isDragging
              ? 'border-[#7A916C] bg-[#7A916C]/5'
              : 'border-gray-300 hover:border-[#7A916C]'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleInputChange}
            className="hidden"
          />

          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              {isDragging ? (
                <Upload className="w-6 h-6 text-[#7A916C] animate-bounce" />
              ) : values.length > 0 ? (
                <Plus className="w-6 h-6 text-gray-400" />
              ) : (
                <ImageIcon className="w-6 h-6 text-gray-400" />
              )}
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">
                {isDragging
                  ? 'Drop images here'
                  : values.length > 0
                    ? 'Add more images'
                    : 'Drag and drop images here'}
              </p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-1.5 bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159] transition-colors text-sm font-medium"
              >
                {values.length > 0 ? 'Add More' : 'Select Images'}
              </button>
            </div>

            <p className="text-xs text-gray-400">
              PNG, JPG, GIF up to 10MB ({values.length}/{maxImages} images)
            </p>
          </div>
        </div>
      )}

      {values.length >= maxImages && (
        <p className="text-sm text-amber-600 mt-2">
          Maximum {maxImages} images reached. Remove an image to add more.
        </p>
      )}
    </div>
  );
}
