
import React, { useState } from 'react';
import { Bell, BellOff, User2, Users, ArrowUpDown, Calendar, LayoutGrid, List } from 'lucide-react';
import AppLayout from '../layouts/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatNumber } from '../utils/formatNumber';

type Streamer = {
  id: string;
  name: string;
  avatar: string;
  isLive: boolean;
  category?: string;
  title?: string;
  viewers?: number;
  lastStream?: string;
  followDate: string;
  isNotificationsOn: boolean;
};

type ViewMode = 'grid' | 'list';

const Following = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortType, setSortType] = useState<'recommended' | 'recently-active'>('recommended');
  
  const streamers: Streamer[] = [
    {
      id: '1',
      name: 'ValorantPro',
      avatar: 'https://placehold.co/100x100/9146FF/FFFFFF.png?text=VP',
      isLive: true,
      category: 'Valorant',
      title: 'Late Night Valorant Ranked Games',
      viewers: 12495,
      followDate: '2 years ago',
      isNotificationsOn: true,
    },
    {
      id: '2',
      name: 'MinecraftMaster',
      avatar: 'https://placehold.co/100x100/FF5CAA/FFFFFF.png?text=MM',
      isLive: true,
      category: 'Minecraft',
      title: 'Minecraft Building Competition with Viewers',
      viewers: 8732,
      followDate: '8 months ago',
      isNotificationsOn: true,
    },
    {
      id: '3',
      name: 'LifeWithLily',
      avatar: 'https://placehold.co/100x100/FFA500/FFFFFF.png?text=LW',
      isLive: true,
      category: 'Just Chatting',
      title: 'Just Chatting - AMA and Life Updates',
      viewers: 23451,
      followDate: '1 year ago',
      isNotificationsOn: false,
    },
    {
      id: '4',
      name: 'LolChampion',
      avatar: 'https://placehold.co/100x100/1E90FF/FFFFFF.png?text=LC',
      isLive: false,
      lastStream: 'Yesterday',
      followDate: '3 months ago',
      isNotificationsOn: true,
    },
    {
      id: '5',
      name: 'ApexPredator',
      avatar: 'https://placehold.co/100x100/FF4500/FFFFFF.png?text=AP',
      isLive: false,
      lastStream: '3 days ago',
      followDate: '5 months ago',
      isNotificationsOn: true,
    },
    {
      id: '6',
      name: 'CodeWithSam',
      avatar: 'https://placehold.co/100x100/00FF00/FFFFFF.png?text=CW',
      isLive: false,
      lastStream: '1 week ago',
      followDate: '2 weeks ago',
      isNotificationsOn: false,
    },
    {
      id: '7',
      name: 'ScaryGaming',
      avatar: 'https://placehold.co/100x100/800080/FFFFFF.png?text=SG',
      isLive: false,
      lastStream: '2 weeks ago',
      followDate: '4 months ago',
      isNotificationsOn: false,
    },
    {
      id: '8',
      name: 'FortniteKing',
      avatar: 'https://placehold.co/100x100/00FFFF/FFFFFF.png?text=FK',
      isLive: false,
      lastStream: '1 month ago',
      followDate: '9 months ago',
      isNotificationsOn: true,
    },
  ];

  const liveStreamers = streamers.filter(streamer => streamer.isLive);
  const offlineStreamers = streamers.filter(streamer => !streamer.isLive);
  
  const sortStreamers = (streamers: Streamer[]) => {
    if (sortType === 'recently-active') {
      return [...streamers].sort((a, b) => {
        // Always prioritize live streamers first
        if (a.isLive && !b.isLive) return -1;
        if (!a.isLive && b.isLive) return 1;
        
        // If both are live, sort by viewers
        if (a.isLive && b.isLive) {
          return (b.viewers || 0) - (a.viewers || 0);
        }
        
        // If both are offline, sort by last stream time (this is simplified)
        return a.lastStream?.localeCompare(b.lastStream || '') || 0;
      });
    }
    
    // Default recommended sorting
    return [...streamers].sort((a, b) => {
      // Live streamers first
      if (a.isLive && !b.isLive) return -1;
      if (!a.isLive && b.isLive) return 1;
      
      // If both are live, sort by notifications on/off then by viewers
      if (a.isLive && b.isLive) {
        if (a.isNotificationsOn && !b.isNotificationsOn) return -1;
        if (!a.isNotificationsOn && b.isNotificationsOn) return 1;
        return (b.viewers || 0) - (a.viewers || 0);
      }
      
      // If both are offline, sort by notifications on/off then by last stream
      if (a.isNotificationsOn && !b.isNotificationsOn) return -1;
      if (!a.isNotificationsOn && b.isNotificationsOn) return 1;
      return a.lastStream?.localeCompare(b.lastStream || '') || 0;
    });
  };

  const sortedLiveStreamers = sortStreamers(liveStreamers);
  const sortedOfflineStreamers = sortStreamers(offlineStreamers);

  const toggleNotifications = (streamerId: string) => {
    console.log(`Toggled notifications for streamer ${streamerId}`);
    // In a real app, this would update the state of the streamers
  };

  return (
    <AppLayout>
      <div className="container px-4 py-6 max-w-7xl mx-auto">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Following</h1>
              <p className="text-muted-foreground mt-1">
                {streamers.length} channels you follow
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center border rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  className="cursor-pointer"
                  onClick={() => setViewMode('grid')}
                >
                  <LayoutGrid size={16} />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  className="cursor-pointer"
                  onClick={() => setViewMode('list')}
                >
                  <List size={16} />
                </Button>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => setSortType(prev => 
                  prev === 'recommended' ? 'recently-active' : 'recommended'
                )}
              >
                <ArrowUpDown size={14} />
                <span>{sortType === 'recommended' ? 'Recommended' : 'Recently Active'}</span>
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="all" className="cursor-pointer">
                All <Badge className="ml-2">{streamers.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="live" className="cursor-pointer">
                Live <Badge className="ml-2">{liveStreamers.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="offline" className="cursor-pointer">
                Offline <Badge className="ml-2">{offlineStreamers.length}</Badge>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {sortedLiveStreamers.map(streamer => (
                    <StreamerCard 
                      key={streamer.id} 
                      streamer={streamer} 
                      toggleNotifications={toggleNotifications} 
                    />
                  ))}
                  {sortedOfflineStreamers.map(streamer => (
                    <StreamerCard 
                      key={streamer.id} 
                      streamer={streamer} 
                      toggleNotifications={toggleNotifications} 
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {sortedLiveStreamers.map(streamer => (
                    <StreamerListItem 
                      key={streamer.id} 
                      streamer={streamer} 
                      toggleNotifications={toggleNotifications} 
                    />
                  ))}
                  {sortedOfflineStreamers.map(streamer => (
                    <StreamerListItem 
                      key={streamer.id} 
                      streamer={streamer} 
                      toggleNotifications={toggleNotifications} 
                    />
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="live" className="space-y-4">
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {sortedLiveStreamers.map(streamer => (
                    <StreamerCard 
                      key={streamer.id} 
                      streamer={streamer} 
                      toggleNotifications={toggleNotifications} 
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {sortedLiveStreamers.map(streamer => (
                    <StreamerListItem 
                      key={streamer.id} 
                      streamer={streamer} 
                      toggleNotifications={toggleNotifications} 
                    />
                  ))}
                </div>
              )}
              
              {liveStreamers.length === 0 && (
                <div className="text-center py-12">
                  <Users className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <p className="mt-4 text-lg font-medium">No live channels</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Channels you follow will appear here when they go live
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="offline" className="space-y-4">
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {sortedOfflineStreamers.map(streamer => (
                    <StreamerCard 
                      key={streamer.id} 
                      streamer={streamer} 
                      toggleNotifications={toggleNotifications} 
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {sortedOfflineStreamers.map(streamer => (
                    <StreamerListItem 
                      key={streamer.id} 
                      streamer={streamer} 
                      toggleNotifications={toggleNotifications} 
                    />
                  ))}
                </div>
              )}
              
              {offlineStreamers.length === 0 && (
                <div className="text-center py-12">
                  <User2 className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <p className="mt-4 text-lg font-medium">No offline channels</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    All channels you follow are currently live
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
};

interface StreamerCardProps {
  streamer: Streamer;
  toggleNotifications: (streamerId: string) => void;
}

const StreamerCard: React.FC<StreamerCardProps> = ({ streamer, toggleNotifications }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-300">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <a href="#" className="flex items-center gap-3 group">
            <Avatar className="h-12 w-12 border-2 border-background group-hover:border-primary transition-colors">
              <AvatarImage src={streamer.avatar} alt={streamer.name} />
              <AvatarFallback>{streamer.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold group-hover:text-primary transition-colors">{streamer.name}</h3>
              <p className="text-xs text-muted-foreground">Followed {streamer.followDate}</p>
            </div>
          </a>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 cursor-pointer"
            onClick={() => toggleNotifications(streamer.id)}
          >
            {streamer.isNotificationsOn ? (
              <Bell className="h-4 w-4 text-primary" />
            ) : (
              <BellOff className="h-4 w-4 text-muted-foreground" />
            )}
            <span className="sr-only">
              {streamer.isNotificationsOn ? 'Turn off notifications' : 'Turn on notifications'}
            </span>
          </Button>
        </div>
        
        {streamer.isLive ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge className="bg-red-500 animate-pulse">LIVE</Badge>
              <span className="text-xs">{streamer.category}</span>
            </div>
            <p className="text-sm font-medium line-clamp-1">{streamer.title}</p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Users size={12} />
              <span>{formatNumber(streamer.viewers || 0)} viewers</span>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <Badge variant="outline">OFFLINE</Badge>
            <p className="text-sm text-muted-foreground">Last live {streamer.lastStream}</p>
          </div>
        )}
      </div>
    </Card>
  );
};

const StreamerListItem: React.FC<StreamerCardProps> = ({ streamer, toggleNotifications }) => {
  return (
    <Card className="hover:shadow-md transition-all duration-300">
      <div className="p-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="h-10 w-10 border-2 border-background hover:border-primary transition-colors">
              <AvatarImage src={streamer.avatar} alt={streamer.name} />
              <AvatarFallback>{streamer.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            {streamer.isLive && (
              <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-red-500 animate-pulse" />
            )}
          </div>
          
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-sm hover:text-primary transition-colors">
                {streamer.name}
              </h3>
              {streamer.isLive && (
                <Badge className="bg-red-500 text-[10px] px-1.5 py-0">LIVE</Badge>
              )}
            </div>
            
            {streamer.isLive ? (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{streamer.category}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Users size={10} />
                  <span>{formatNumber(streamer.viewers || 0)}</span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">Last live {streamer.lastStream}</p>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {streamer.isLive && (
            <Button 
              size="sm" 
              className="h-7 text-xs cursor-pointer"
            >
              Watch
            </Button>
          )}
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 cursor-pointer"
            onClick={() => toggleNotifications(streamer.id)}
          >
            {streamer.isNotificationsOn ? (
              <Bell className="h-4 w-4 text-primary" />
            ) : (
              <BellOff className="h-4 w-4 text-muted-foreground" />
            )}
            <span className="sr-only">
              {streamer.isNotificationsOn ? 'Turn off notifications' : 'Turn on notifications'}
            </span>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Following;
