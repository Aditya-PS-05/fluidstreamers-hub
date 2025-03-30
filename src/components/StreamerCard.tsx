
import React from 'react';
import { Stream } from '../data/mockData';
import { formatNumber } from '../utils/formatNumber';
import { User } from 'lucide-react';

interface StreamerCardProps {
  stream: Stream;
  priority?: boolean;
}

const StreamerCard: React.FC<StreamerCardProps> = ({ stream, priority = false }) => {
  return (
    <div className="group relative card-hover rounded-lg overflow-hidden animate-fade-up">
      <div className="aspect-video relative">
        <img 
          src={stream.thumbnailUrl} 
          alt={stream.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading={priority ? "eager" : "lazy"}
        />
        {stream.isLive && (
          <div className="absolute top-2 left-2 stream-badge">
            <span className="mr-1.5 w-2 h-2 rounded-full bg-white"></span>
            LIVE
          </div>
        )}
        <div className="absolute bottom-2 left-2 bg-black/70 text-white text-sm px-2 py-0.5 rounded">
          {formatNumber(stream.viewers)} viewers
        </div>
      </div>
      
      <div className="p-3 bg-card">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
            {stream.streamer.avatarUrl ? (
              <img 
                src={stream.streamer.avatarUrl} 
                alt={stream.streamer.displayName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-secondary flex items-center justify-center">
                <User size={18} />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm truncate leading-tight text-card-foreground">
              {stream.title}
            </h3>
            <p className="text-sm text-muted-foreground truncate">
              {stream.streamer.displayName}
            </p>
            <p className="text-xs text-muted-foreground truncate mt-0.5">
              {stream.category}
            </p>
          </div>
        </div>
        
        <div className="mt-2 flex flex-wrap gap-1">
          {stream.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index} 
              className="text-xs bg-secondary px-2 py-0.5 rounded-full text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none"></div>
    </div>
  );
};

export default StreamerCard;
