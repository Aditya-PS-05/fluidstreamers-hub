
import React, { useState, useEffect } from 'react';
import AppLayout from '../layouts/AppLayout';
import VideoPlayer from '../components/VideoPlayer';
import LiveChat from '../components/LiveChat';
import StreamerCard from '../components/StreamerCard';
import { 
  featuredStreams, 
  recommendedChannels, 
  categories,
} from '../data/mockData';
import { 
  ChevronRight, 
  ChevronLeft, 
  Heart, 
  MessageSquare,
  TrendingUp,
  Search,
  Zap,
  Sparkles,
  User
} from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [isChatCollapsed, setIsChatCollapsed] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [showAnimation, setShowAnimation] = useState(false);
  const featuredStream = featuredStreams[0]; // First stream as the featured one
  
  // Trigger animation when someone follows
  useEffect(() => {
    const randomInterval = Math.floor(Math.random() * 20000) + 10000;
    const timer = setTimeout(() => {
      setShowAnimation(true);
      setTimeout(() => setShowAnimation(false), 5000);
      
      toast({
        title: "New Follower!",
        description: `User${Math.floor(Math.random() * 10000)} just followed ${featuredStream.streamer.displayName}`,
        variant: "default",
      });
    }, randomInterval);
    
    return () => clearTimeout(timer);
  }, [featuredStream.streamer.displayName]);
  
  return (
    <AppLayout>
      <div className="container px-4 py-6 mx-auto relative">
        {/* New follower animation */}
        {showAnimation && (
          <div className="fixed bottom-20 right-20 z-50 animate-scale-in">
            <div className="bg-gradient-to-r from-primary to-purple-500 text-white p-4 rounded-lg shadow-lg backdrop-blur-md flex items-center gap-4">
              <div className="p-2 bg-white/20 rounded-full">
                <User size={24} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold">New Follower!</h3>
                <p className="text-sm">User{Math.floor(Math.random() * 10000)} just followed</p>
              </div>
              <div className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 animate-pulse">
                <Heart size={16} className="fill-white text-white" />
              </div>
            </div>
          </div>
        )}

        {/* Hero Section with Featured Stream */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-8">
          <div className="lg:col-span-3 rounded-xl overflow-hidden bg-card shadow-xl animate-fade-up border border-border/50">
            <div className="aspect-video bg-black relative">
              <VideoPlayer stream={featuredStream} hasAutoplay={true} />

              {/* Stream tags */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 flex gap-2">
                <div className="bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                  <Sparkles size={12} className="text-yellow-400" /> 
                  <span>Featured Stream</span>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <h1 className="text-xl font-bold mb-2 hover:text-primary transition-colors cursor-pointer">{featuredStream.title}</h1>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative group">
                    <img 
                      src={featuredStream.streamer.avatarUrl} 
                      alt={featuredStream.streamer.displayName}
                      className="w-10 h-10 rounded-full ring-2 ring-primary/30 hover:ring-primary transition-all cursor-pointer"
                    />
                    <div className="absolute left-0 bottom-full mb-2 w-64 bg-card/95 backdrop-blur-sm p-3 rounded-lg border border-border shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-20">
                      <div className="flex items-start gap-2">
                        <img 
                          src={featuredStream.streamer.avatarUrl} 
                          alt={featuredStream.streamer.displayName}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <h3 className="font-semibold">{featuredStream.streamer.displayName}</h3>
                          <p className="text-xs text-muted-foreground">{featuredStream.streamer.followers.toLocaleString()} followers</p>
                          <div className="mt-2 flex gap-1">
                            {featuredStream.streamer.isPartner && (
                              <span className="bg-purple-600 text-white text-xs px-1 rounded">Partner</span>
                            )}
                            <span className="bg-blue-500 text-white text-xs px-1 rounded">Pro</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h2 className="font-medium hover:text-primary transition-colors cursor-pointer">{featuredStream.streamer.displayName}</h2>
                    <p className="text-sm text-muted-foreground">
                      {featuredStream.category} • {featuredStream.viewers.toLocaleString()} viewers
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1 py-1 px-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-all hover:scale-105 cursor-pointer group">
                    <Heart size={16} className="group-hover:fill-white transition-colors" />
                    <span>Follow</span>
                  </button>
                  
                  <button 
                    className="flex items-center gap-1 py-1 px-3 bg-secondary hover:bg-secondary/80 rounded-full transition-all hover:scale-105 cursor-pointer"
                    onClick={() => setIsChatCollapsed(!isChatCollapsed)}
                  >
                    <MessageSquare size={16} />
                    <span>Chat</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className={`lg:col-span-2 ${isChatCollapsed ? 'hidden lg:block' : ''}`}>
            <LiveChat 
              className="h-[500px] lg:h-[calc(100%-0.5rem)] animate-slide-in-right" 
              isCollapsed={isChatCollapsed} 
              toggleCollapse={() => setIsChatCollapsed(!isChatCollapsed)} 
            />
          </div>
        </div>
        
        {/* Category filters */}
        <div className="mb-6 animate-fade-up overflow-x-auto scrollbar-none" style={{ animationDelay: '50ms' }}>
          <div className="flex gap-2 pb-2">
            {['All', 'Games', 'Just Chatting', 'Music', 'Creative', 'Sports', 'IRL'].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-1.5 rounded-full transition-all whitespace-nowrap ${
                  activeCategory === category 
                    ? 'bg-primary text-white font-medium shadow-md shadow-primary/20' 
                    : 'bg-secondary hover:bg-secondary/80'
                } cursor-pointer hover:scale-105`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Recommended Streams */}
        <section className="mb-8 animate-fade-up" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Zap size={20} className="text-primary" />
              Recommended Streams
            </h2>
            <div className="flex items-center gap-2">
              <button className="p-1 rounded-full bg-secondary hover:bg-secondary/80 transition-colors cursor-pointer hover:scale-110">
                <ChevronLeft size={20} />
              </button>
              <button className="p-1 rounded-full bg-secondary hover:bg-secondary/80 transition-colors cursor-pointer hover:scale-110">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {featuredStreams.slice(1).map((stream, index) => (
              <StreamerCard key={stream.id} stream={stream} priority={index < 2} />
            ))}
          </div>
        </section>
        
        {/* Categories */}
        <section className="mb-8 animate-fade-up" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <TrendingUp size={20} className="text-primary" />
              Popular Categories
            </h2>
            <a href="/categories" className="text-sm text-primary hover:underline flex items-center gap-1 hover:gap-2 transition-all cursor-pointer">
              View All <ChevronRight size={16} />
            </a>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <a 
                key={index} 
                href={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group relative card-hover rounded-lg overflow-hidden border border-border/50 transition-all cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-twitch-purple/10 to-twitch-darkPurple/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="aspect-[4/5] bg-gradient-to-br from-twitch-purple/80 to-twitch-darkPurple flex items-center justify-center relative overflow-hidden">
                  <span className="text-4xl font-bold text-white transform group-hover:scale-110 transition-transform">{category.name.charAt(0)}</span>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                
                <div className="p-3 bg-card relative">
                  <h3 className="font-medium truncate group-hover:text-primary transition-colors">{category.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <TrendingUp size={14} className="text-green-500" />
                    {(category.viewerCount / 1000).toFixed(1)}K viewers
                  </p>
                  
                  <div className="mt-2 flex flex-wrap gap-1">
                    {category.tags.map((tag, i) => (
                      <span 
                        key={i} 
                        className="text-xs bg-secondary px-2 py-0.5 rounded-full text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
        
        {/* Recommended Channels */}
        <section className="animate-fade-up" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <User size={20} className="text-primary" />
              Channels to Follow
            </h2>
            <a href="/channels" className="text-sm text-primary hover:underline flex items-center gap-1 hover:gap-2 transition-all cursor-pointer">
              View All <ChevronRight size={16} />
            </a>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {recommendedChannels.map((streamer) => (
              <div key={streamer.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-all hover:scale-[1.02] cursor-pointer border border-transparent hover:border-border/50">
                <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-transparent hover:ring-primary transition-all">
                  <img 
                    src={streamer.avatarUrl} 
                    alt={streamer.displayName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium hover:text-primary transition-colors">{streamer.displayName}</h3>
                  <p className="text-sm text-muted-foreground">
                    {(streamer.followers / 1000000).toFixed(1)}M followers
                  </p>
                </div>
                <button className="py-1 px-3 rounded-full bg-primary text-white text-sm hover:bg-primary/90 transition-all hover:scale-110 cursor-pointer">
                  Follow
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default Index;
