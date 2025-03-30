
import React from 'react';
import { ArrowUpRight, BarChart3, Clock, Users, Zap } from 'lucide-react';
import AppLayout from '../layouts/AppLayout';
import { formatNumber } from '../utils/formatNumber';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const Dashboard = () => {
  const stats = [
    { 
      id: 1, 
      title: 'Total Views', 
      value: 1248932, 
      change: '+12.3%', 
      icon: <BarChart3 className="h-4 w-4" />,
      color: 'bg-blue-500' 
    },
    { 
      id: 2, 
      title: 'Followers', 
      value: 56723, 
      change: '+5.4%', 
      icon: <Users className="h-4 w-4" />,
      color: 'bg-purple-500' 
    },
    { 
      id: 3, 
      title: 'Watch Time', 
      value: 4320, 
      change: '+18.7%', 
      icon: <Clock className="h-4 w-4" />,
      color: 'bg-green-500' 
    },
    { 
      id: 4, 
      title: 'Stream Health', 
      value: 98, 
      change: 'Excellent', 
      icon: <Zap className="h-4 w-4" />,
      color: 'bg-amber-500' 
    }
  ];

  const recentStreams = [
    { id: 1, title: 'Minecraft Adventure', viewers: 4523, duration: '4h 32m', date: '2 days ago' },
    { id: 2, title: 'Just Chatting with Fans', viewers: 3211, duration: '2h 15m', date: '4 days ago' },
    { id: 3, title: 'Fortnite Tournament', viewers: 8765, duration: '6h 05m', date: '1 week ago' },
    { id: 4, title: 'Valorant Ranked Games', viewers: 6432, duration: '3h 45m', date: '1 week ago' },
  ];

  const topContent = [
    { id: 1, title: 'Epic Boss Battle', views: 245789, engagement: 92 },
    { id: 2, title: 'Community Game Night', views: 187654, engagement: 88 },
    { id: 3, title: 'First Look: New Game Release', views: 134567, engagement: 75 },
  ];
  
  return (
    <AppLayout>
      <div className="container px-4 py-6 max-w-7xl mx-auto">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's an overview of your streaming performance.
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.id} className="p-6 shadow-md hover:shadow-lg transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div className={`${stat.color} p-2 rounded-md text-white`}>
                    {stat.icon}
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium">
                    <span className="text-green-500">{stat.change}</span>
                    <ArrowUpRight className="h-3 w-3 text-green-500" />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <h2 className="text-3xl font-bold">
                    {stat.id === 4 
                      ? `${stat.value}%`
                      : stat.id === 3 
                        ? `${Math.floor(stat.value / 60)}h ${stat.value % 60}m` 
                        : formatNumber(stat.value)
                    }
                  </h2>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Recent Streams</h2>
                <button className="text-primary text-sm hover:underline cursor-pointer">View All</button>
              </div>
              <div className="space-y-4">
                {recentStreams.map((stream) => (
                  <div key={stream.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div>
                      <h3 className="font-medium text-sm">{stream.title}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-muted-foreground">{stream.date}</span>
                        <span className="text-xs text-muted-foreground">{stream.duration}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{formatNumber(stream.viewers)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            
            <Card className="p-6 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Top Performing Content</h2>
                <button className="text-primary text-sm hover:underline cursor-pointer">View Analytics</button>
              </div>
              <div className="space-y-6">
                {topContent.map((content) => (
                  <div key={content.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-sm">{content.title}</h3>
                      <span className="text-sm">{formatNumber(content.views)} views</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Engagement</span>
                        <span className="text-xs">{content.engagement}%</span>
                      </div>
                      <Progress value={content.engagement} className="h-1.5" />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
          
          <Card className="p-6 shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Stream Schedule</h2>
              <button className="text-white bg-primary px-4 py-1.5 rounded-md text-sm hover:bg-primary/90 transition-colors cursor-pointer">
                Add Stream
              </button>
            </div>
            <div className="text-center py-12">
              <p className="text-muted-foreground">No upcoming streams scheduled</p>
              <p className="text-sm text-muted-foreground mt-2">Create a new stream to let your followers know when you'll be live</p>
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
