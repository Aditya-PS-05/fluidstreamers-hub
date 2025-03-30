
import React, { useState } from 'react';
import { Search, TrendingUp, Filter, SlidersHorizontal } from 'lucide-react';
import AppLayout from '../layouts/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatNumber } from '../utils/formatNumber';

type Stream = {
  id: string;
  title: string;
  streamer: {
    name: string;
    avatar: string;
  };
  category: string;
  tags: string[];
  viewers: number;
  thumbnail: string;
  isLive: boolean;
};

const Browse = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('recommended');
  const [showFilters, setShowFilters] = useState(false);

  const streams: Stream[] = [
    {
      id: '1',
      title: 'Late Night Valorant Ranked Games',
      streamer: {
        name: 'ValorantPro',
        avatar: 'https://placehold.co/100x100/9146FF/FFFFFF.png?text=VP',
      },
      category: 'Valorant',
      tags: ['FPS', 'Competitive', 'Ranked'],
      viewers: 12495,
      thumbnail: 'https://placehold.co/640x360/6441A5/FFFFFF.png?text=Valorant',
      isLive: true,
    },
    {
      id: '2',
      title: 'Minecraft Building Competition with Viewers',
      streamer: {
        name: 'MinecraftMaster',
        avatar: 'https://placehold.co/100x100/FF5CAA/FFFFFF.png?text=MM',
      },
      category: 'Minecraft',
      tags: ['Building', 'Creative', 'Community'],
      viewers: 8732,
      thumbnail: 'https://placehold.co/640x360/32CD32/FFFFFF.png?text=Minecraft',
      isLive: true,
    },
    {
      id: '3',
      title: 'Just Chatting - AMA and Life Updates',
      streamer: {
        name: 'LifeWithLily',
        avatar: 'https://placehold.co/100x100/FFA500/FFFFFF.png?text=LW',
      },
      category: 'Just Chatting',
      tags: ['AMA', 'IRL', 'Lifestyle'],
      viewers: 23451,
      thumbnail: 'https://placehold.co/640x360/FF0000/FFFFFF.png?text=Just+Chatting',
      isLive: true,
    },
    {
      id: '4',
      title: 'League of Legends - Climbing to Diamond',
      streamer: {
        name: 'LolChampion',
        avatar: 'https://placehold.co/100x100/1E90FF/FFFFFF.png?text=LC',
      },
      category: 'League of Legends',
      tags: ['MOBA', 'Ranked', 'Diamond'],
      viewers: 15682,
      thumbnail: 'https://placehold.co/640x360/8A2BE2/FFFFFF.png?text=League+of+Legends',
      isLive: true,
    },
    {
      id: '5',
      title: 'Apex Legends - Season 20 Grinding',
      streamer: {
        name: 'ApexPredator',
        avatar: 'https://placehold.co/100x100/FF4500/FFFFFF.png?text=AP',
      },
      category: 'Apex Legends',
      tags: ['Battle Royale', 'FPS', 'Season 20'],
      viewers: 9843,
      thumbnail: 'https://placehold.co/640x360/FF5733/FFFFFF.png?text=Apex+Legends',
      isLive: true,
    },
    {
      id: '6',
      title: 'Coding a Full-Stack Web App Live',
      streamer: {
        name: 'CodeWithSam',
        avatar: 'https://placehold.co/100x100/00FF00/FFFFFF.png?text=CW',
      },
      category: 'Software & Game Development',
      tags: ['Coding', 'Web Dev', 'React'],
      viewers: 3271,
      thumbnail: 'https://placehold.co/640x360/007BFF/FFFFFF.png?text=Coding',
      isLive: true,
    },
    {
      id: '7',
      title: 'Horror Game Night - Resident Evil 4 Remake',
      streamer: {
        name: 'ScaryGaming',
        avatar: 'https://placehold.co/100x100/800080/FFFFFF.png?text=SG',
      },
      category: 'Resident Evil 4',
      tags: ['Horror', 'Survival', 'Story'],
      viewers: 7845,
      thumbnail: 'https://placehold.co/640x360/000000/FFFFFF.png?text=Resident+Evil',
      isLive: true,
    },
    {
      id: '8',
      title: 'Fortnite - New Season Gameplay',
      streamer: {
        name: 'FortniteKing',
        avatar: 'https://placehold.co/100x100/00FFFF/FFFFFF.png?text=FK',
      },
      category: 'Fortnite',
      tags: ['Battle Royale', 'New Season', 'Victory Royale'],
      viewers: 18943,
      thumbnail: 'https://placehold.co/640x360/5F9EA0/FFFFFF.png?text=Fortnite',
      isLive: true,
    },
    {
      id: '9',
      title: 'Casual Mario Kart Races with Viewers',
      streamer: {
        name: 'MarioFan',
        avatar: 'https://placehold.co/100x100/FF0000/FFFFFF.png?text=MF',
      },
      category: 'Mario Kart 8',
      tags: ['Racing', 'Nintendo', 'Viewer Games'],
      viewers: 4567,
      thumbnail: 'https://placehold.co/640x360/FF0000/FFFFFF.png?text=Mario+Kart',
      isLive: false,
    },
    {
      id: '10',
      title: 'Chill Stardew Valley Farm Building',
      streamer: {
        name: 'FarmingSimulator',
        avatar: 'https://placehold.co/100x100/8B4513/FFFFFF.png?text=FS',
      },
      category: 'Stardew Valley',
      tags: ['Relaxing', 'Farming', 'Indie'],
      viewers: 6234,
      thumbnail: 'https://placehold.co/640x360/8B4513/FFFFFF.png?text=Stardew+Valley',
      isLive: false,
    },
    {
      id: '11',
      title: 'First Playthrough - Elden Ring',
      streamer: {
        name: 'SoulsFan',
        avatar: 'https://placehold.co/100x100/696969/FFFFFF.png?text=SF',
      },
      category: 'Elden Ring',
      tags: ['Souls-like', 'First Playthrough', 'RPG'],
      viewers: 8912,
      thumbnail: 'https://placehold.co/640x360/696969/FFFFFF.png?text=Elden+Ring',
      isLive: false,
    },
    {
      id: '12',
      title: 'Speedrunning Super Mario 64',
      streamer: {
        name: 'SpeedyGamer',
        avatar: 'https://placehold.co/100x100/FFD700/FFFFFF.png?text=SG',
      },
      category: 'Super Mario 64',
      tags: ['Speedrun', 'World Record Attempts', 'Retro'],
      viewers: 5421,
      thumbnail: 'https://placehold.co/640x360/FFD700/FFFFFF.png?text=Super+Mario+64',
      isLive: false,
    },
  ];

  const filteredStreams = streams.filter(stream => {
    if (searchQuery === '') return true;
    
    const query = searchQuery.toLowerCase();
    return (
      stream.title.toLowerCase().includes(query) ||
      stream.streamer.name.toLowerCase().includes(query) ||
      stream.category.toLowerCase().includes(query) ||
      stream.tags.some(tag => tag.toLowerCase().includes(query))
    );
  });

  const recommendedStreams = filteredStreams.filter(stream => stream.isLive);
  const justAddedStreams = [...filteredStreams].sort(() => Math.random() - 0.5);
  const popularStreams = [...filteredStreams].sort((a, b) => b.viewers - a.viewers);

  const displayStreams = 
    activeTab === 'recommended' 
      ? recommendedStreams 
      : activeTab === 'just-added' 
        ? justAddedStreams 
        : popularStreams;

  return (
    <AppLayout>
      <div className="container px-4 py-6 max-w-7xl mx-auto">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-bold tracking-tight">Browse Streams</h1>
            <p className="text-muted-foreground">
              Discover new and exciting content from creators around the world
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <Input
                type="search"
                placeholder="Search streams, categories, or streamers..."
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              className="flex gap-2 cursor-pointer"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal size={16} />
              <span>Filters</span>
            </Button>
          </div>
          
          {showFilters && (
            <Card className="p-4 animate-in slide-in-from-top duration-300">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Category</label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="gaming">Gaming</SelectItem>
                      <SelectItem value="irl">IRL</SelectItem>
                      <SelectItem value="esports">Esports</SelectItem>
                      <SelectItem value="creative">Creative</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Tags</label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Tags" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fps">FPS</SelectItem>
                      <SelectItem value="moba">MOBA</SelectItem>
                      <SelectItem value="rpg">RPG</SelectItem>
                      <SelectItem value="competitive">Competitive</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Stream Status</label>
                  <Select defaultValue="live">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Stream Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Streams</SelectItem>
                      <SelectItem value="live">Live Only</SelectItem>
                      <SelectItem value="vod">VODs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Sort By</label>
                  <Select defaultValue="viewers">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="viewers">Most Viewers</SelectItem>
                      <SelectItem value="recent">Recently Started</SelectItem>
                      <SelectItem value="trending">Trending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end mt-4 gap-2">
                <Button variant="outline" size="sm" className="cursor-pointer">Reset</Button>
                <Button size="sm" className="cursor-pointer">Apply Filters</Button>
              </div>
            </Card>
          )}
          
          <Tabs 
            defaultValue="recommended" 
            onValueChange={(value) => setActiveTab(value)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger 
                value="recommended" 
                className="flex items-center gap-1 cursor-pointer"
              >
                <TrendingUp size={14} />
                <span>Recommended</span>
              </TabsTrigger>
              <TabsTrigger 
                value="just-added" 
                className="cursor-pointer"
              >
                Just Added
              </TabsTrigger>
              <TabsTrigger 
                value="popular" 
                className="cursor-pointer"
              >
                Popular
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="recommended" className="pt-2">
              <StreamGrid streams={displayStreams} />
            </TabsContent>
            
            <TabsContent value="just-added" className="pt-2">
              <StreamGrid streams={displayStreams} />
            </TabsContent>
            
            <TabsContent value="popular" className="pt-2">
              <StreamGrid streams={displayStreams} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
};

interface StreamGridProps {
  streams: Stream[];
}

const StreamGrid: React.FC<StreamGridProps> = ({ streams }) => {
  if (streams.length === 0) {
    return (
      <div className="text-center py-12">
        <Filter className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
        <p className="mt-4 text-lg font-medium">No streams found</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {streams.map((stream) => (
        <Card key={stream.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg group">
          <div className="relative">
            <img 
              src={stream.thumbnail} 
              alt={stream.title} 
              className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-2 left-2 flex gap-2">
              {stream.isLive && (
                <Badge className="bg-red-500 animate-pulse">LIVE</Badge>
              )}
              <Badge className="bg-black bg-opacity-60 backdrop-blur-sm">
                {formatNumber(stream.viewers)} viewers
              </Badge>
            </div>
          </div>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="rounded-full overflow-hidden w-10 h-10 flex-shrink-0 mt-1">
                <img 
                  src={stream.streamer.avatar} 
                  alt={stream.streamer.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-base line-clamp-1 group-hover:text-primary transition-colors">
                  {stream.title}
                </h3>
                <p className="text-sm text-muted-foreground">{stream.streamer.name}</p>
                <p className="text-sm text-muted-foreground mt-1">{stream.category}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {stream.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Browse;
