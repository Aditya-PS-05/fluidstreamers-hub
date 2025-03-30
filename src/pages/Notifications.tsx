
import React, { useState } from 'react';
import { Bell, Gift, Heart, MessageSquare, Users, Check, Trash2 } from 'lucide-react';
import AppLayout from '../layouts/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type NotificationType = 'all' | 'mentions' | 'followers' | 'subscriptions';

type Notification = {
  id: string;
  type: 'mention' | 'follow' | 'subscription' | 'gift' | 'reaction';
  content: string;
  user: {
    name: string;
    avatar: string;
  };
  isRead: boolean;
  timestamp: string;
};

const Notifications = () => {
  const [activeTab, setActiveTab] = useState<NotificationType>('all');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'mention',
      content: 'mentioned you in the chat',
      user: {
        name: 'JaneDoe',
        avatar: 'https://placehold.co/100x100/9146FF/FFFFFF.png?text=JD',
      },
      isRead: false,
      timestamp: '2 minutes ago',
    },
    {
      id: '2',
      type: 'follow',
      content: 'followed your channel',
      user: {
        name: 'StreamerPro',
        avatar: 'https://placehold.co/100x100/FF5CAA/FFFFFF.png?text=SP',
      },
      isRead: false,
      timestamp: '45 minutes ago',
    },
    {
      id: '3',
      type: 'subscription',
      content: 'subscribed to your channel for 3 months',
      user: {
        name: 'GameFan123',
        avatar: 'https://placehold.co/100x100/6441A5/FFFFFF.png?text=GF',
      },
      isRead: false,
      timestamp: '2 hours ago',
    },
    {
      id: '4',
      type: 'gift',
      content: 'sent 5 gifts during your stream',
      user: {
        name: 'BigSupporter',
        avatar: 'https://placehold.co/100x100/FF0000/FFFFFF.png?text=BS',
      },
      isRead: true,
      timestamp: '1 day ago',
    },
    {
      id: '5',
      type: 'reaction',
      content: 'reacted to your clip "Amazing Gameplay Moment"',
      user: {
        name: 'ClipMaster',
        avatar: 'https://placehold.co/100x100/00FF00/FFFFFF.png?text=CM',
      },
      isRead: true,
      timestamp: '3 days ago',
    },
    {
      id: '6',
      type: 'follow',
      content: 'followed your channel',
      user: {
        name: 'NewViewer',
        avatar: 'https://placehold.co/100x100/1E90FF/FFFFFF.png?text=NV',
      },
      isRead: true,
      timestamp: '4 days ago',
    },
    {
      id: '7',
      type: 'mention',
      content: 'mentioned you: "Hey @YourUsername that was awesome!"',
      user: {
        name: 'ChatEnthusiast',
        avatar: 'https://placehold.co/100x100/FFA500/FFFFFF.png?text=CE',
      },
      isRead: true,
      timestamp: '1 week ago',
    },
  ]);

  const markAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({
        ...notification,
        isRead: true,
      }))
    );
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map(notification =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'mentions') return notification.type === 'mention';
    if (activeTab === 'followers') return notification.type === 'follow';
    if (activeTab === 'subscriptions') return notification.type === 'subscription';
    return false;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'mention':
        return <MessageSquare className="text-blue-500" size={18} />;
      case 'follow':
        return <Users className="text-green-500" size={18} />;
      case 'subscription':
        return <Heart className="text-red-500" size={18} />;
      case 'gift':
        return <Gift className="text-purple-500" size={18} />;
      case 'reaction':
        return <Heart className="text-pink-500" size={18} />;
      default:
        return <Bell className="text-gray-500" size={18} />;
    }
  };

  return (
    <AppLayout>
      <div className="container px-4 py-6 max-w-4xl mx-auto">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
              {unreadCount > 0 && (
                <Badge variant="destructive" className="animate-pulse">
                  {unreadCount} new
                </Badge>
              )}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={markAllAsRead}
              className="text-sm cursor-pointer"
            >
              <Check className="mr-2 h-4 w-4" />
              Mark all as read
            </Button>
          </div>

          <Tabs defaultValue="all" onValueChange={(value) => setActiveTab(value as NotificationType)}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all" className="cursor-pointer">All</TabsTrigger>
              <TabsTrigger value="mentions" className="cursor-pointer">Mentions</TabsTrigger>
              <TabsTrigger value="followers" className="cursor-pointer">Followers</TabsTrigger>
              <TabsTrigger value="subscriptions" className="cursor-pointer">Subscriptions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-6">
              <NotificationList 
                notifications={filteredNotifications} 
                markAsRead={markAsRead}
                deleteNotification={deleteNotification}
                getNotificationIcon={getNotificationIcon}
              />
            </TabsContent>
            
            <TabsContent value="mentions" className="mt-6">
              <NotificationList 
                notifications={filteredNotifications} 
                markAsRead={markAsRead}
                deleteNotification={deleteNotification}
                getNotificationIcon={getNotificationIcon}
              />
            </TabsContent>
            
            <TabsContent value="followers" className="mt-6">
              <NotificationList 
                notifications={filteredNotifications} 
                markAsRead={markAsRead}
                deleteNotification={deleteNotification}
                getNotificationIcon={getNotificationIcon}
              />
            </TabsContent>
            
            <TabsContent value="subscriptions" className="mt-6">
              <NotificationList 
                notifications={filteredNotifications} 
                markAsRead={markAsRead}
                deleteNotification={deleteNotification}
                getNotificationIcon={getNotificationIcon}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
};

interface NotificationListProps {
  notifications: Notification[];
  markAsRead: (id: string) => void;
  deleteNotification: (id: string) => void;
  getNotificationIcon: (type: string) => React.ReactNode;
}

const NotificationList: React.FC<NotificationListProps> = ({ 
  notifications, 
  markAsRead, 
  deleteNotification,
  getNotificationIcon 
}) => {
  if (notifications.length === 0) {
    return (
      <div className="text-center py-12">
        <Bell className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
        <p className="mt-4 text-lg font-medium">No notifications</p>
        <p className="mt-1 text-sm text-muted-foreground">
          When you get notifications, they'll appear here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {notifications.map((notification) => (
        <Card 
          key={notification.id} 
          className={`p-4 transition-all duration-300 hover:shadow-md ${
            !notification.isRead ? 'border-l-4 border-l-primary' : ''
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="rounded-full overflow-hidden w-10 h-10 flex-shrink-0">
              <img 
                src={notification.user.avatar} 
                alt={notification.user.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{notification.user.name}</span>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      {getNotificationIcon(notification.type)}
                      <span className="text-xs">{notification.type}</span>
                    </div>
                  </div>
                  <p className="text-sm">{notification.content}</p>
                  <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
                </div>
                <div className="flex gap-1">
                  {!notification.isRead && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 cursor-pointer"
                      onClick={() => markAsRead(notification.id)}
                    >
                      <Check className="h-4 w-4" />
                      <span className="sr-only">Mark as read</span>
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-destructive cursor-pointer"
                    onClick={() => deleteNotification(notification.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Notifications;
