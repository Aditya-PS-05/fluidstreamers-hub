
import React, { useState, useRef, useEffect } from 'react';
import { Stream } from '../data/mockData';
import { 
  Play, Pause, Volume2, VolumeX, 
  Maximize, Settings, Heart,
  Share, MessageSquare, Gift, Flag,
  SkipForward, Clock, Award, Crown,
  Zap, MoreHorizontal
} from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface VideoPlayerProps {
  stream: Stream;
  hasAutoplay?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  stream, 
  hasAutoplay = false 
}) => {
  const [isPlaying, setIsPlaying] = useState(hasAutoplay);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);
  const [quality, setQuality] = useState('1080p');
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [showGiftMenu, setShowGiftMenu] = useState(false);
  const [speedRate, setSpeedRate] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [clipSaved, setClipSaved] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const controlsTimeout = useRef<NodeJS.Timeout | null>(null);
  
  // Simulated durations (since we don't have real videos)
  useEffect(() => {
    setDuration(Math.floor(Math.random() * 7200) + 1800); // Random duration between 30min and 2hrs
    
    // Auto-hide controls after 3 seconds of inactivity
    const handleMouseMove = () => {
      setShowControls(true);
      if (controlsTimeout.current) {
        clearTimeout(controlsTimeout.current);
      }
      
      controlsTimeout.current = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 3000);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (controlsTimeout.current) {
        clearTimeout(controlsTimeout.current);
      }
    };
  }, [isPlaying]);
  
  // Simulated time update
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          // Occasionally simulate buffering
          if (Math.random() > 0.97) {
            setIsBuffering(true);
            setTimeout(() => setIsBuffering(false), Math.random() * 2000 + 500);
          }
          
          return prev + 1 >= duration ? prev : prev + 1;
        });
      }, 1000 / speedRate); // Adjust for playback speed
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, duration, speedRate]);
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };
  
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
    }
  };
  
  const toggleFullscreen = () => {
    if (!playerRef.current) return;
    
    if (!isFullscreen) {
      if (playerRef.current.requestFullscreen) {
        playerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    
    setIsFullscreen(!isFullscreen);
  };
  
  const toggleLike = () => {
    setIsLiked(!isLiked);
    
    // Show toast notification
    if (!isLiked) {
      toast({
        title: "Stream liked!",
        description: "Thanks for showing your appreciation",
        variant: "default",
      });
    }
    
    // Simulate like animation
    if (!isLiked) {
      // Create multiple hearts with randomized animations
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          const heart = document.createElement('div');
          heart.className = 'absolute text-red-500 opacity-0 transition-all duration-1000 animate-reaction-popup';
          heart.style.left = `${Math.random() * 80 + 10}%`;
          heart.style.top = `${Math.random() * 80 + 10}%`;
          heart.innerHTML = '❤️';
          heart.style.fontSize = `${Math.random() * 1 + 1.5}rem`;
          heart.style.zIndex = '100';
          playerRef.current?.appendChild(heart);
          
          setTimeout(() => {
            heart.style.opacity = '0';
            heart.style.transform = `translateY(-${Math.random() * 100 + 50}px) scale(0.5)`;
            setTimeout(() => {
              heart.remove();
            }, 1000);
          }, 1000);
        }, i * 200); // Stagger the animations
      }
    }
  };

  const saveClip = () => {
    setClipSaved(true);
    // Simulate clip saving
    setIsBuffering(true);
    setTimeout(() => {
      setIsBuffering(false);
      toast({
        title: "Clip saved!",
        description: "Last 30 seconds saved to your clips",
        variant: "default",
      });
    }, 1500);
    
    // Reset after 3 seconds
    setTimeout(() => setClipSaved(false), 3000);
  };

  const handleShareStream = () => {
    toast({
      title: "Share link copied!",
      description: "Stream link has been copied to clipboard",
    });
  };

  const sendGift = (giftName: string, amount: number) => {
    setShowGiftMenu(false);
    
    // Create gift animation
    const gift = document.createElement('div');
    gift.className = 'fixed top-1/3 left-1/2 transform -translate-x-1/2 z-50 animate-scale-in';
    gift.innerHTML = `
      <div class="flex flex-col items-center">
        <div class="text-4xl mb-2">🎁</div>
        <div class="bg-primary/80 backdrop-blur-md text-white px-4 py-2 rounded-lg text-sm font-bold">
          ${giftName} × ${amount}
        </div>
      </div>
    `;
    document.body.appendChild(gift);
    
    setTimeout(() => {
      gift.classList.replace('animate-scale-in', 'animate-fade-out');
      setTimeout(() => gift.remove(), 500);
    }, 3000);
    
    toast({
      title: `${giftName} sent!`,
      description: `You sent ${amount} ${giftName} to ${stream.streamer.displayName}`,
    });
  };
  
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    
    return [
      h > 0 ? h : null,
      m > 0 || h > 0 ? (m < 10 && h > 0 ? `0${m}` : m) : null,
      s < 10 ? `0${s}` : s
    ].filter(Boolean).join(':');
  };

  // Quality options
  const qualityOptions = ['1080p', '720p', '480p', '360p', '160p', 'Auto'];
  
  // Playback speed options
  const speedOptions = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2];

  return (
    <div 
      ref={playerRef}
      className="relative w-full h-full bg-black rounded-lg overflow-hidden group"
      onMouseEnter={() => setShowControls(true)}
    >
      {/* Video element (using image as placeholder) */}
      <img 
        src={stream.thumbnailUrl} 
        alt={stream.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-200 scale-100 group-hover:scale-[1.02]"
      />
      <video
        ref={videoRef}
        className="w-full h-full object-contain hidden" // Hidden since we're using image placeholder
        poster={stream.thumbnailUrl}
        playsInline
        autoPlay={hasAutoplay}
        muted={isMuted}
      />
      
      {/* Live indicator */}
      <div className="absolute top-4 left-4 z-30">
        <div className="flex items-center gap-2 bg-red-500/80 backdrop-blur-sm px-3 py-1 rounded-full text-white font-medium animate-pulse-subtle">
          <span className="h-2 w-2 rounded-full bg-white"></span>
          LIVE
        </div>
      </div>
      
      {/* Viewer count */}
      <div className="absolute top-4 right-4 z-30">
        <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-white">
          <span className="text-sm">{formatNumber(stream.viewers)} viewers</span>
        </div>
      </div>

      {/* Loading overlay */}
      {isBuffering && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-40">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center text-primary font-bold">
              {clipSaved ? 'Saving' : 'Buffering'}
            </div>
          </div>
        </div>
      )}
      
      {/* Stream info overlay */}
      <div className={`absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent transition-opacity duration-300 z-20 ${
        showControls ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white hover:scale-110 transition-transform cursor-pointer">
            <img 
              src={stream.streamer.avatarUrl} 
              alt={stream.streamer.displayName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-white font-bold text-lg line-clamp-1">{stream.title}</h3>
            <p className="text-white/80 text-sm flex items-center gap-2">
              {stream.streamer.displayName}
              {stream.streamer.isPartner && (
                <span className="bg-purple-600 text-white text-xs px-1 py-0.5 rounded">
                  Partner
                </span>
              )}
              <span className="text-red-500 flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                {formatNumber(stream.viewers)} viewers
              </span>
            </p>
          </div>
        </div>
      </div>
      
      {/* Video controls */}
      <div 
        className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 z-20 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Progress bar */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-white text-sm">{formatTime(currentTime)}</span>
          <div className="flex-1 relative group/progress">
            <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary" 
                style={{ width: `${(currentTime / duration) * 100}%` }}
              ></div>
            </div>
            <input
              type="range"
              min={0}
              max={duration}
              value={currentTime}
              onChange={handleSeek}
              className="absolute inset-0 w-full h-1 appearance-none opacity-0 cursor-pointer group-hover/progress:h-3 transition-all"
            />
            {/* Hover preview markers (simulated) */}
            <div className="absolute top-0 left-0 w-full h-1 opacity-0 group-hover/progress:opacity-100 transition-opacity">
              {[0.1, 0.3, 0.5, 0.8].map((pos, i) => (
                <div 
                  key={i}
                  className="absolute h-3 w-0.5 bg-white/80" 
                  style={{ left: `${pos * 100}%`, top: '-4px' }}
                ></div>
              ))}
            </div>
          </div>
          <span className="text-white text-sm">{formatTime(duration)}</span>
        </div>
        
        {/* Control buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={togglePlay}
              className="text-white hover:text-primary transition-colors transform hover:scale-110 cursor-pointer"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            
            <div className="flex items-center gap-2 group/volume">
              <button 
                onClick={toggleMute}
                className="text-white hover:text-primary transition-colors cursor-pointer"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <div className="w-0 overflow-hidden group-hover/volume:w-20 transition-all duration-300">
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 appearance-none bg-white/30 rounded-full cursor-pointer"
                  style={{
                    backgroundImage: `linear-gradient(to right, #9146FF ${volume * 100}%, rgba(255, 255, 255, 0.3) ${volume * 100}%)`,
                  }}
                />
              </div>
            </div>

            <div className="relative">
              <button 
                onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                className="text-white hover:text-primary transition-colors rounded px-2 py-1 text-xs bg-white/10 hover:bg-white/20 cursor-pointer"
              >
                {speedRate}x
              </button>
              
              {showSpeedMenu && (
                <div className="absolute bottom-full left-0 mb-2 bg-black/90 backdrop-blur-md rounded p-2 animate-fade-in z-30">
                  <div className="flex flex-col space-y-1 w-24">
                    {speedOptions.map(speed => (
                      <button
                        key={speed}
                        onClick={() => {
                          setSpeedRate(speed);
                          setShowSpeedMenu(false);
                        }}
                        className={`px-3 py-1 text-sm text-left rounded hover:bg-white/20 cursor-pointer ${
                          speed === speedRate ? 'text-primary' : 'text-white'
                        }`}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={toggleLike}
              className={`transition-all ${isLiked ? 'text-red-500 scale-110' : 'text-white hover:text-red-500 hover:scale-110'} cursor-pointer`}
              aria-label={isLiked ? 'Unlike' : 'Like'}
            >
              <Heart size={22} className={`${isLiked ? 'fill-red-500 animate-pulse' : ''}`} />
            </button>
            
            <button
              onClick={saveClip}
              className={`text-white hover:text-primary transition-colors cursor-pointer ${clipSaved ? 'text-green-500' : ''}`}
              aria-label="Save clip"
              disabled={clipSaved}
            >
              <Clock size={20} className={clipSaved ? 'animate-spin' : 'hover:scale-110'} />
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setShowGiftMenu(!showGiftMenu)}
                className="text-white hover:text-primary transition-colors hover:scale-110 cursor-pointer"
                aria-label="Send gift"
              >
                <Gift size={20} />
              </button>
              
              {showGiftMenu && (
                <div className="absolute bottom-full right-0 mb-2 bg-black/90 backdrop-blur-md rounded-lg border border-primary/20 p-3 w-64 animate-fade-in z-30">
                  <h4 className="text-white font-medium mb-2 text-center">Send a Gift</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { name: "Coffee", icon: "☕", price: 100 },
                      { name: "Trophy", icon: "🏆", price: 300 },
                      { name: "Diamond", icon: "💎", price: 500 },
                      { name: "Fire", icon: "🔥", price: 200 },
                      { name: "Star", icon: "⭐", price: 150 },
                      { name: "Crown", icon: "👑", price: 1000 }
                    ].map((gift) => (
                      <button
                        key={gift.name}
                        onClick={() => sendGift(gift.name, 1)}
                        className="flex flex-col items-center bg-white/10 hover:bg-primary/20 p-2 rounded transition-colors cursor-pointer"
                      >
                        <span className="text-2xl mb-1">{gift.icon}</span>
                        <span className="text-xs text-white">{gift.name}</span>
                        <span className="text-xs text-primary/80">{gift.price}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <button 
              onClick={handleShareStream}
              className="text-white hover:text-primary transition-colors hover:scale-110 cursor-pointer"
              aria-label="Share"
            >
              <Share size={20} />
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setShowQualityMenu(!showQualityMenu)}
                className="text-white hover:text-primary transition-colors cursor-pointer"
                aria-label="Quality settings"
              >
                <Settings size={20} className="hover:rotate-45 transition-transform" />
              </button>
              
              {showQualityMenu && (
                <div className="absolute bottom-full right-0 mb-2 bg-black/90 backdrop-blur-md rounded p-2 animate-fade-in z-30">
                  <h4 className="text-white text-xs mb-1 px-2">Quality</h4>
                  <div className="flex flex-col space-y-1 min-w-[100px]">
                    {qualityOptions.map(q => (
                      <button
                        key={q}
                        onClick={() => {
                          setQuality(q);
                          setShowQualityMenu(false);
                          toast({
                            description: `Quality changed to ${q}`,
                          });
                        }}
                        className={`px-3 py-1 text-sm text-left rounded hover:bg-white/20 cursor-pointer ${
                          q === quality ? 'text-primary' : 'text-white'
                        }`}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <button 
              onClick={toggleFullscreen}
              className="text-white hover:text-primary transition-colors hover:scale-110 cursor-pointer"
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            >
              <Maximize size={20} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Big play button (center) */}
      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-primary/80 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 active:scale-95 z-30 cursor-pointer backdrop-blur-sm"
          aria-label="Play"
        >
          <Play size={32} className="ml-2" />
        </button>
      )}

      {/* Stream badges */}
      <div className="absolute top-16 left-4 flex flex-col gap-2 z-10">
        {stream.streamer.isPartner && (
          <div className="bg-purple-600/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md flex items-center gap-1 hover:bg-purple-600 transition-colors transform hover:scale-105">
            <Crown size={12} /> 
            <span>Official Partner</span>
          </div>
        )}
        
        {stream.category === 'Just Chatting' && (
          <div className="bg-blue-500/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md flex items-center gap-1 hover:bg-blue-500 transition-colors transform hover:scale-105">
            <MessageSquare size={12} /> 
            <span>Just Chatting</span>
          </div>
        )}
        
        {Math.random() > 0.5 && (
          <div className="bg-green-500/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md flex items-center gap-1 hover:bg-green-500 transition-colors transform hover:scale-105">
            <Award size={12} /> 
            <span>Trending</span>
          </div>
        )}
      </div>

      {/* Report button */}
      <button
        className="absolute top-4 right-20 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Report"
      >
        <Flag size={16} className="text-white/60 hover:text-white transition-colors" />
      </button>
    </div>
  );
};

// Helper function to format view numbers
const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

export default VideoPlayer;
