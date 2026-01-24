'use client';

import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  className?: string;
}

export default function ImageUpload({ value, onChange, label, className = '' }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemove = () => {
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      {value ? (
        <div className="relative rounded-lg overflow-hidden border-2 border-gray-300">
          <img
            src={value}
            alt="Preview"
            className="w-full h-48 object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`border-2 border-dashed rounded-lg p-4 sm:p-8 text-center transition-all ${
            isDragging
              ? 'border-[#7A916C] bg-[#7A916C]/5'
              : 'border-gray-300 hover:border-[#7A916C]'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            className="hidden"
          />

          <div className="flex flex-col items-center gap-2 sm:gap-3">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center">
              {isDragging ? (
                <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-[#7A916C] animate-bounce" />
              ) : (
                <ImageIcon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
              )}
            </div>

            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-700 mb-1">
                {isDragging ? 'Drop image here' : 'Drag & drop or'}
              </p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159] transition-colors text-xs sm:text-sm font-medium"
              >
                Select Image
              </button>
            </div>

            <p className="text-xs text-gray-400">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
