'use client';

import { useState, useRef } from 'react';
import { Upload, X, Video, Play } from 'lucide-react';

interface VideoUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  className?: string;
}

export default function VideoUpload({ value, onChange, label, className = '' }: VideoUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('video/')) {
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
    setIsPlaying(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          <span className="text-gray-400 font-normal ml-2">(Optional)</span>
        </label>
      )}

      {value ? (
        <div className="relative rounded-lg overflow-hidden border-2 border-gray-300 bg-black">
          <video
            ref={videoRef}
            src={value}
            className="w-full h-48 object-contain"
            onEnded={() => setIsPlaying(false)}
            playsInline
            muted
          />
          <div className="absolute inset-0 flex items-center justify-center">
            {!isPlaying && (
              <button
                type="button"
                onClick={togglePlay}
                className="p-4 bg-white/90 text-[#7A916C] rounded-full hover:bg-white transition-colors shadow-lg"
              >
                <Play className="w-6 h-6" />
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
          >
            <X className="w-4 h-4" />
          </button>
          {isPlaying && (
            <button
              type="button"
              onClick={togglePlay}
              className="absolute bottom-2 left-2 px-3 py-1 bg-black/70 text-white rounded text-xs hover:bg-black/90 transition-colors"
            >
              Pause
            </button>
          )}
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
            isDragging
              ? 'border-[#7A916C] bg-[#7A916C]/5'
              : 'border-gray-300 hover:border-[#7A916C]'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="video/mp4,video/webm,video/ogg"
            onChange={handleInputChange}
            className="hidden"
          />

          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              {isDragging ? (
                <Upload className="w-8 h-8 text-[#7A916C] animate-bounce" />
              ) : (
                <Video className="w-8 h-8 text-gray-400" />
              )}
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">
                {isDragging ? 'Drop video here' : 'Drag and drop video here'}
              </p>
              <p className="text-xs text-gray-500 mb-3">
                or
              </p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159] transition-colors text-sm font-medium"
              >
                Select Video
              </button>
            </div>

            <p className="text-xs text-gray-400 mt-2">
              MP4, WebM, OGG up to 50MB
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
