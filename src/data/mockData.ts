
export interface Stream {
  id: string;
  title: string;
  streamer: Streamer;
  thumbnailUrl: string;
  category: string;
  viewers: number;
  tags: string[];
  isLive: boolean;
}

export interface Streamer {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  followers: number;
  isPartner: boolean;
}

export interface ChatMessage {
  id: string;
  user: {
    username: string;
    displayName: string;
    avatarUrl: string;
    color: string;
    isMod?: boolean;
    isSubscriber?: boolean;
  };
  message: string;
  timestamp: Date;
  isHighlighted?: boolean;
  emotes?: string[];
  hasReactions?: boolean;
}

// Sample streamers
export const streamers: Streamer[] = [
  {
    id: '1',
    username: 'ninja',
    displayName: 'Ninja',
    avatarUrl: 'https://placehold.co/400x400/9146FF/FFFFFF.png?text=N',
    followers: 18000000,
    isPartner: true,
  },
  {
    id: '2',
    username: 'pokimane',
    displayName: 'Pokimane',
    avatarUrl: 'https://placehold.co/400x400/9146FF/FFFFFF.png?text=P',
    followers: 9000000,
    isPartner: true,
  },
  {
    id: '3',
    username: 'shroud',
    displayName: 'Shroud',
    avatarUrl: 'https://placehold.co/400x400/9146FF/FFFFFF.png?text=S',
    followers: 10000000,
    isPartner: true,
  },
  {
    id: '4',
    username: 'drlupo',
    displayName: 'DrLupo',
    avatarUrl: 'https://placehold.co/400x400/9146FF/FFFFFF.png?text=DL',
    followers: 4500000,
    isPartner: true,
  },
  {
    id: '5',
    username: 'timthetatman',
    displayName: 'TimTheTatman',
    avatarUrl: 'https://placehold.co/400x400/9146FF/FFFFFF.png?text=TTT',
    followers: 7000000,
    isPartner: true,
  },
  {
    id: '6',
    username: 'valkyrae',
    displayName: 'Valkyrae',
    avatarUrl: 'https://placehold.co/400x400/9146FF/FFFFFF.png?text=V',
    followers: 3800000,
    isPartner: true,
  }
];

// Sample streams
export const featuredStreams: Stream[] = [
  {
    id: '1',
    title: 'Friday Fortnite Tournament | !merch !schedule',
    streamer: streamers[0],
    thumbnailUrl: 'https://placehold.co/640x360/6441A5/FFFFFF.png?text=Fortnite+Stream',
    category: 'Fortnite',
    viewers: 58420,
    tags: ['English', 'Tournament', 'Competitive'],
    isLive: true,
  },
  {
    id: '2',
    title: 'Chill Valorant Games with Viewers | !sub !prime',
    streamer: streamers[1],
    thumbnailUrl: 'https://placehold.co/640x360/FF5CAA/FFFFFF.png?text=Valorant+Stream',
    category: 'Valorant',
    viewers: 32156,
    tags: ['English', 'FPS', 'Competitive'],
    isLive: true,
  },
  {
    id: '3',
    title: 'PUBG Pro Scrims | Road to 10M followers',
    streamer: streamers[2],
    thumbnailUrl: 'https://placehold.co/640x360/392E5C/FFFFFF.png?text=PUBG+Stream',
    category: 'PUBG',
    viewers: 24789,
    tags: ['English', 'FPS', 'Pro Player'],
    isLive: true,
  },
  {
    id: '4',
    title: 'Charity Stream for St. Jude! | !donate !charity',
    streamer: streamers[3],
    thumbnailUrl: 'https://placehold.co/640x360/9146FF/FFFFFF.png?text=Charity+Stream',
    category: 'Just Chatting',
    viewers: 18935,
    tags: ['English', 'Charity', 'Family Friendly'],
    isLive: true,
  },
  {
    id: '5',
    title: 'Late Night COD with the Squad | !newvid !socials',
    streamer: streamers[4],
    thumbnailUrl: 'https://placehold.co/640x360/6441A5/FFFFFF.png?text=Call+of+Duty+Stream',
    category: 'Call of Duty: Warzone',
    viewers: 43210,
    tags: ['English', 'FPS', 'Squad'],
    isLive: true,
  },
  {
    id: '6',
    title: 'Among Us with Friends | !discord !youtube',
    streamer: streamers[5],
    thumbnailUrl: 'https://placehold.co/640x360/FF5CAA/FFFFFF.png?text=Among+Us+Stream',
    category: 'Among Us',
    viewers: 28765,
    tags: ['English', 'Multiplayer', 'Friends'],
    isLive: true,
  }
];

// Sample chat messages
export const chatMessages: ChatMessage[] = [
  {
    id: '1',
    user: {
      username: 'viewerOne',
      displayName: 'ViewerOne',
      avatarUrl: 'https://placehold.co/100x100/9146FF/FFFFFF.png?text=V1',
      color: '#FF5CAA',
      isSubscriber: true,
    },
    message: 'That was an amazing play!',
    timestamp: new Date(),
  },
  {
    id: '2',
    user: {
      username: 'moderator123',
      displayName: 'Moderator123',
      avatarUrl: 'https://placehold.co/100x100/6441A5/FFFFFF.png?text=M123',
      color: '#00FF00',
      isMod: true,
    },
    message: 'Remember to follow the chat rules everyone!',
    timestamp: new Date(),
    isHighlighted: true,
  },
  {
    id: '3',
    user: {
      username: 'fanboy42',
      displayName: 'Fanboy42',
      avatarUrl: 'https://placehold.co/100x100/392E5C/FFFFFF.png?text=F42',
      color: '#FF0000',
      isSubscriber: true,
    },
    message: 'I\'ve been a sub for 10 months now!',
    timestamp: new Date(),
  },
  {
    id: '4',
    user: {
      username: 'newViewer',
      displayName: 'NewViewer',
      avatarUrl: 'https://placehold.co/100x100/FF5CAA/FFFFFF.png?text=NV',
      color: '#1E90FF',
    },
    message: 'First time watching, this is great!',
    timestamp: new Date(),
  },
  {
    id: '5',
    user: {
      username: 'chatEnthusiast',
      displayName: 'ChatEnthusiast',
      avatarUrl: 'https://placehold.co/100x100/9146FF/FFFFFF.png?text=CE',
      color: '#FFA500',
      isSubscriber: true,
    },
    message: 'Can we see your setup? PogChamp',
    timestamp: new Date(),
    hasReactions: true,
  },
];

// Categories
export const categories = [
  { name: 'Just Chatting', viewerCount: 435900, tags: ['IRL'] },
  { name: 'Fortnite', viewerCount: 215400, tags: ['Shooter', 'Battle Royale'] },
  { name: 'League of Legends', viewerCount: 178500, tags: ['MOBA'] },
  { name: 'Call of Duty: Warzone', viewerCount: 143200, tags: ['FPS', 'Battle Royale'] },
  { name: 'Grand Theft Auto V', viewerCount: 125700, tags: ['Adventure'] },
  { name: 'Valorant', viewerCount: 118300, tags: ['FPS', 'Tactical Shooter'] },
  { name: 'Minecraft', viewerCount: 98600, tags: ['Adventure'] },
  { name: 'Apex Legends', viewerCount: 87900, tags: ['FPS', 'Battle Royale'] },
];

// Recommended channels
export const recommendedChannels = streamers.slice(0, 4);
