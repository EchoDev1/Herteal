'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import VideoPlayer from '@/components/ui/VideoPlayer';

interface ProductGalleryProps {
  images: string[];
  productName: string;
  video?: string;
}

export default function ProductGallery({
  images,
  productName,
  video,
}: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  // Calculate total items (images + video if present)
  const hasVideo = video && video.trim() !== '';
  const totalItems = images.length + (hasVideo ? 1 : 0);

  return (
    <div className="space-y-4">
      {/* Main Image or Video */}
      <div className="relative aspect-[2/3] bg-whisper-gray overflow-hidden">
        {showVideo && hasVideo ? (
          <VideoPlayer
            src={video}
            poster={images[0]}
            aspectRatio="portrait"
            className="w-full h-full"
          />
        ) : (
          <Image
            src={images[selectedImage]}
            alt={`${productName} - Image ${selectedImage + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={selectedImage === 0}
          />
        )}
      </div>

      {/* Thumbnails */}
      {totalItems > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {/* Video thumbnail first if video exists */}
          {hasVideo && (
            <button
              onClick={() => {
                setShowVideo(true);
                setSelectedImage(-1);
              }}
              className={`
                relative aspect-[2/3] bg-black overflow-hidden
                transition-all duration-300
                ${
                  showVideo
                    ? 'ring-2 ring-navy'
                    : 'opacity-60 hover:opacity-100'
                }
              `}
            >
              <Image
                src={images[0]}
                alt={`${productName} - Video`}
                fill
                className="object-cover"
                sizes="25vw"
              />
              {/* Video play icon overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <div className="w-8 h-8 flex items-center justify-center bg-white/90 rounded-full">
                  <Play className="w-4 h-4 text-[#2C5530] ml-0.5" />
                </div>
              </div>
            </button>
          )}

          {/* Image thumbnails */}
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedImage(index);
                setShowVideo(false);
              }}
              className={`
                relative aspect-[2/3] bg-whisper-gray overflow-hidden
                transition-all duration-300
                ${
                  selectedImage === index && !showVideo
                    ? 'ring-2 ring-navy'
                    : 'opacity-60 hover:opacity-100'
                }
              `}
            >
              <Image
                src={image}
                alt={`${productName} - Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="25vw"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
