"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Play, 
  Pause, 
  Maximize, 
  Minimize,
  Settings
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

interface VideoPlayerProps {
  thumbnail: string;
  title: string;
}

const playbackSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

export default function VideoPlayer({ thumbnail, title }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(1);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleFullscreen = () => {
    const videoElement = document.getElementById('video-player-container');
    
    if (!isFullscreen && videoElement) {
      if (videoElement.requestFullscreen) {
        videoElement.requestFullscreen();
      } else if ((videoElement as any).webkitRequestFullscreen) {
        (videoElement as any).webkitRequestFullscreen();
      } else if ((videoElement as any).mozRequestFullScreen) {
        (videoElement as any).mozRequestFullScreen();
      } else if ((videoElement as any).msRequestFullscreen) {
        (videoElement as any).msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        (document as any).mozCancelFullScreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  const handleSpeedChange = (speed: number) => {
    setCurrentSpeed(speed);
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      const fullscreenElement = document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement;
      
      setIsFullscreen(!!fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div 
      id="video-player-container"
      className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : 'aspect-video overflow-hidden rounded-lg bg-muted shadow-xl'}`}>
      <Image
        src={thumbnail}
        alt={title}
        fill
        className="object-cover"
        priority
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
      
      {/* Video Controls Overlay */}
      <div className="absolute inset-0 flex flex-col justify-between">
        {/* Top gradient for better visibility */}
        <div className="bg-gradient-to-b from-black/60 via-transparent to-transparent p-4">
          {isFullscreen && (
            <h2 className="text-white text-xl font-semibold">{title}</h2>
          )}
        </div>

        {/* Center play button when not playing */}
        {!isPlaying && (
          <div className="flex-1 flex items-center justify-center">
            <Button 
              size="lg" 
              className="gap-2 shadow-lg transition-transform hover:scale-105"
              onClick={handlePlayPause}
            >
              <Play className="h-5 w-5" fill="currentColor" />
              <span className="hidden sm:inline">Play Video</span>
              <span className="sm:hidden">Play</span>
            </Button>
          </div>
        )}

        {/* Bottom controls */}
        <div className="bg-gradient-to-t from-black/80 via-black/60 to-transparent p-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white/20"
                onClick={handlePlayPause}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" fill="currentColor" />
                ) : (
                  <Play className="h-4 w-4" fill="currentColor" />
                )}
              </Button>
            </div>

            <div className="flex items-center gap-2">
              {/* Playback Speed Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-white/20 gap-1"
                  >
                    <Settings className="h-4 w-4" />
                    <span className="hidden sm:inline text-sm">{currentSpeed}x</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Playback Speed</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {playbackSpeeds.map((speed) => (
                    <DropdownMenuItem
                      key={speed}
                      onClick={() => handleSpeedChange(speed)}
                      className={currentSpeed === speed ? 'bg-accent' : ''}
                    >
                      {speed}x {speed === 1 && '(Normal)'}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Fullscreen Toggle */}
              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white/20"
                onClick={handleFullscreen}
              >
                {isFullscreen ? (
                  <Minimize className="h-4 w-4" />
                ) : (
                  <Maximize className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}