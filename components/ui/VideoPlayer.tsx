'use client';

import { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  aspectRatio?: 'video' | 'portrait' | 'square';
}

export default function VideoPlayer({
  src,
  poster,
  className = '',
  aspectRatio = 'video'
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const aspectClasses = {
    video: 'aspect-video',
    portrait: 'aspect-[2/3]',
    square: 'aspect-square'
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

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div
      className={`relative ${aspectClasses[aspectRatio]} bg-black overflow-hidden group ${className}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(isPlaying ? false : true)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-cover"
        muted={isMuted}
        playsInline
        loop
        onEnded={() => setIsPlaying(false)}
        onClick={togglePlay}
      />

      {/* Gradient overlay for controls visibility */}
      <div className={`
        absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent
        transition-opacity duration-300
        ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}
      `} />

      {/* Play/Pause button - center */}
      <button
        onClick={togglePlay}
        className={`
          absolute inset-0 flex items-center justify-center
          transition-opacity duration-300
          ${isPlaying && !showControls ? 'opacity-0' : 'opacity-100'}
        `}
      >
        <div className="w-16 h-16 flex items-center justify-center bg-white/90 rounded-full shadow-lg hover:bg-white hover:scale-105 transition-all duration-200">
          {isPlaying ? (
            <Pause className="w-6 h-6 text-[#2C5530]" />
          ) : (
            <Play className="w-6 h-6 text-[#2C5530] ml-1" />
          )}
        </div>
      </button>

      {/* Bottom controls */}
      <div className={`
        absolute bottom-0 left-0 right-0 p-4
        flex items-center justify-end gap-2
        transition-opacity duration-300
        ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}
      `}>
        <button
          onClick={toggleMute}
          className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors shadow-md"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-[#2C5530]" />
          ) : (
            <Volume2 className="w-4 h-4 text-[#2C5530]" />
          )}
        </button>
      </div>
    </div>
  );
}
