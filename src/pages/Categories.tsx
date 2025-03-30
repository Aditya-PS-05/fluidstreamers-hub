
import React, { useState } from 'react';
import { Search, Grid, LayoutGrid, ArrowUpDown, ChevronDown } from 'lucide-react';
import AppLayout from '../layouts/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatNumber } from '../utils/formatNumber';

type Category = {
  id: string;
  name: string;
  image: string;
  tags: string[];
  viewers: number;
  channels: number;
  isFollowing?: boolean;
  isPopular?: boolean;
  isNew?: boolean;
};

type SortOption = 'viewers' | 'channels' | 'name';

const Categories = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('viewers');
  
  const categories: Category[] = [
    {
      id: '1',
      name: 'Just Chatting',
      image: 'https://placehold.co/400x532/FF0000/FFFFFF.png?text=Just+Chatting',
      tags: ['IRL', 'Talk Shows', 'Chatting'],
      viewers: 342654,
      channels: 4312,
      isPopular: true,
      isFollowing: true,
    },
    {
      id: '2',
      name: 'Valorant',
      image: 'https://placehold.co/400x532/6441A5/FFFFFF.png?text=Valorant',
      tags: ['FPS', 'Competitive', 'Shooter'],
      viewers: 198532,
      channels: 2845,
      isPopular: true,
      isFollowing: false,
    },
    {
      id: '3',
      name: 'League of Legends',
      image: 'https://placehold.co/400x532/8A2BE2/FFFFFF.png?text=League+of+Legends',
      tags: ['MOBA', 'Strategy', 'Team-Based'],
      viewers: 187432,
      channels: 3214,
      isPopular: true,
      isFollowing: true,
    },
    {
      id: '4',
      name: 'Minecraft',
      image: 'https://placehold.co/400x532/32CD32/FFFFFF.png?text=Minecraft',
      tags: ['Sandbox', 'Building', 'Adventure'],
      viewers: 124876,
      channels: 2654,
      isPopular: true,
      isFollowing: false,
    },
    {
      id: '5',
      name: 'Fortnite',
      image: 'https://placehold.co/400x532/5F9EA0/FFFFFF.png?text=Fortnite',
      tags: ['Battle Royale', 'Shooter', 'Building'],
      viewers: 112983,
      channels: 1987,
      isPopular: true,
      isFollowing: false,
    },
    {
      id: '6',
      name: 'Grand Theft Auto V',
      image: 'https://placehold.co/400x532/000000/FFFFFF.png?text=GTA+V',
      tags: ['Action', 'Adventure', 'Roleplay'],
      viewers: 98765,
      channels: 1234,
      isPopular: true,
      isFollowing: true,
    },
    {
      id: '7',
      name: 'Apex Legends',
      image: 'https://placehold.co/400x532/FF5733/FFFFFF.png?text=Apex+Legends',
      tags: ['FPS', 'Battle Royale', 'Shooter'],
      viewers: 87654,
      channels: 1432,
      isPopular: true,
      isFollowing: false,
    },
    {
      id: '8',
      name: 'Counter-Strike 2',
      image: 'https://placehold.co/400x532/808080/FFFFFF.png?text=CS2',
      tags: ['FPS', 'Shooter', 'Competitive'],
      viewers: 76543,
      channels: 1098,
      isPopular: true,
      isFollowing: false,
    },
    {
      id: '9',
      name: 'DOTA 2',
      image: 'https://placehold.co/400x532/8B0000/FFFFFF.png?text=DOTA+2',
      tags: ['MOBA', 'Strategy', 'Team-Based'],
      viewers: 65432,
      channels: 876,
      isPopular: true,
      isFollowing: false,
    },
    {
      id: '10',
      name: 'World of Warcraft',
      image: 'https://placehold.co/400x532/4682B4/FFFFFF.png?text=WoW',
      tags: ['MMORPG', 'RPG', 'Adventure'],
      viewers: 54321,
      channels: 765,
      isPopular: false,
      isFollowing: true,
    },
    {
      id: '11',
      name: 'Art',
      image: 'https://placehold.co/400x532/FF00FF/FFFFFF.png?text=Art',
      tags: ['Creative', 'Drawing', 'Painting'],
      viewers: 43210,
      channels: 654,
      isPopular: false,
      isFollowing: false,
    },
    {
      id: '12',
      name: 'Music',
      image: 'https://placehold.co/400x532/8B4513/FFFFFF.png?text=Music',
      tags: ['Performance', 'Singing', 'Instruments'],
      viewers: 32109,
      channels: 543,
      isPopular: false,
      isFollowing: true,
    },
    {
      id: '13',
      name: 'Among Us',
      image: 'https://placehold.co/400x532/FF6347/FFFFFF.png?text=Among+Us',
      tags: ['Social Deduction', 'Multiplayer', 'Strategy'],
      viewers: 21098,
      channels: 432,
      isPopular: false,
      isFollowing: false,
    },
    {
      id: '14',
      name: 'The Legend of Zelda: Tears of the Kingdom',
      image: 'https://placehold.co/400x532/228B22/FFFFFF.png?text=Zelda+TOTK',
      tags: ['Adventure', 'Action', 'Open World'],
      viewers: 19876,
      channels: 321,
      isNew: true,
      isFollowing: false,
    },
    {
      id: '15',
      name: 'Baldur\'s Gate 3',
      image: 'https://placehold.co/400x532/800000/FFFFFF.png?text=BG3',
      tags: ['RPG', 'Fantasy', 'Turn-Based'],
      viewers: 18765,
      channels: 298,
      isNew: true,
      isFollowing: false,
    },
    {
      id: '16',
      name: 'Sports',
      image: 'https://placehold.co/400x532/1E90FF/FFFFFF.png?text=Sports',
      tags: ['Football', 'Basketball', 'Athletics'],
      viewers: 17654,
      channels: 210,
      isPopular: false,
      isFollowing: false,
    },
  ];

  const filteredCategories = categories.filter(category => {
    if (searchQuery === '') return true;
    
    const query = searchQuery.toLowerCase();
    return (
      category.name.toLowerCase().includes(query) ||
      category.tags.some(tag => tag.toLowerCase().includes(query))
    );
  });

  const sortedCategories = [...filteredCategories].sort((a, b) => {
    switch (sortBy) {
      case 'viewers':
        return b.viewers - a.viewers;
      case 'channels':
        return b.channels - a.channels;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const toggleFollow = (categoryId: string) => {
    console.log(`Toggled follow for category ${categoryId}`);
    // In a real app, this would update the state of the categories
  };

  return (
    <AppLayout>
      <div className="container px-4 py-6 max-w-7xl mx-auto">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
            <p className="text-muted-foreground">
              Browse all categories to find new content you might enjoy
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            <div className="relative flex-1 w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <Input
                type="search"
                placeholder="Search categories..."
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="flex gap-2 cursor-pointer"
                  >
                    <ArrowUpDown size={16} />
                    <span>
                      Sort by: {
                        sortBy === 'viewers' ? 'Viewers' :
                        sortBy === 'channels' ? 'Channels' : 'Name'
                      }
                    </span>
                    <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem 
                    className="cursor-pointer" 
                    onClick={() => setSortBy('viewers')}
                  >
                    Most Viewed
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="cursor-pointer" 
                    onClick={() => setSortBy('channels')}
                  >
                    Most Channels
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="cursor-pointer" 
                    onClick={() => setSortBy('name')}
                  >
                    Name (A-Z)
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-2">
            {sortedCategories.map((category) => (
              <Card 
                key={category.id} 
                className="overflow-hidden group transition-all duration-300 hover:shadow-lg"
              >
                <div className="relative">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full aspect-[3/4] object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  <div className="absolute top-0 left-0 right-0 p-2 flex justify-between">
                    {(category.isPopular || category.isNew) && (
                      <Badge className={`${category.isNew ? 'bg-green-500' : 'bg-amber-500'}`}>
                        {category.isNew ? 'NEW' : 'POPULAR'}
                      </Badge>
                    )}
                    
                    <Button 
                      variant={category.isFollowing ? "default" : "outline"}
                      size="icon"
                      className={`h-8 w-8 rounded-full ${category.isFollowing ? 'bg-primary' : 'bg-black bg-opacity-60 backdrop-blur-sm hover:bg-black hover:bg-opacity-80'} cursor-pointer`}
                      onClick={() => toggleFollow(category.id)}
                    >
                      <svg 
                        viewBox="0 0 24 24" 
                        width="16" 
                        height="16" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        fill="none" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        {category.isFollowing ? (
                          <polyline points="20 6 9 17 4 12"></polyline>
                        ) : (
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                        )}
                        {!category.isFollowing && <line x1="5" y1="12" x2="19" y2="12"></line>}
                      </svg>
                      <span className="sr-only">
                        {category.isFollowing ? 'Unfollow' : 'Follow'}
                      </span>
                    </Button>
                  </div>
                </div>
                
                <div className="p-3">
                  <h3 className="font-medium text-sm line-clamp-1 mb-1 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1">
                      <Grid size={12} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {formatNumber(category.viewers)} viewers
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <LayoutGrid size={12} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {formatNumber(category.channels)} channels
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {category.tags.slice(0, 2).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs px-1.5 py-0">
                        {tag}
                      </Badge>
                    ))}
                    {category.tags.length > 2 && (
                      <Badge variant="secondary" className="text-xs px-1.5 py-0">
                        +{category.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          {filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <Search className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
              <p className="mt-4 text-lg font-medium">No categories found</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try adjusting your search
              </p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Categories;
