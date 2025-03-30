
import React, { useState, useRef, useEffect } from 'react';
import { chatMessages as initialChatMessages, ChatMessage } from '../data/mockData';
import { Send, Heart, MessageSquare, PlusCircle, Smile, Gift, Share2 } from 'lucide-react';

interface LiveChatProps {
  className?: string;
  isCollapsed?: boolean;
  toggleCollapse?: () => void;
}

const LiveChat: React.FC<LiveChatProps> = ({ 
  className = "", 
  isCollapsed = false,
  toggleCollapse
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialChatMessages);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const [showEmojis, setShowEmojis] = useState(false);

  // Auto scroll to bottom when new messages arrive only if autoScroll is enabled
  useEffect(() => {
    if (autoScroll) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, autoScroll]);

  // Detect manual scrolling to disable auto-scroll when user scrolls up
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      // If user has scrolled up more than 100px from bottom, disable auto-scroll
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setAutoScroll(isNearBottom);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Add new random message every 3-7 seconds
  useEffect(() => {
    const randomMessages = [
      'Nice play!', 
      'LUL', 
      'PogChamp', 
      'Let\'s go!', 
      'OMG that was insane!',
      'GG',
      'Love this stream!',
      'First time here, this is awesome!',
      'Can you play my favorite game next?',
      'Hello from Germany!',
      "You're so good at this game!"
    ];
    
    const randomUserColors = [
      '#FF5CAA', '#6441A5', '#9146FF', '#00FF00', '#FF0000', 
      '#1E90FF', '#FFA500', '#8A2BE2', '#32CD32', '#FF4500'
    ];
    
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * randomMessages.length);
      const randomColorIndex = Math.floor(Math.random() * randomUserColors.length);
      const randomUsername = `user${Math.floor(Math.random() * 10000)}`;
      
      const newRandomMessage: ChatMessage = {
        id: Date.now().toString(),
        user: {
          username: randomUsername,
          displayName: `User${Math.floor(Math.random() * 10000)}`,
          avatarUrl: `https://placehold.co/100x100/${randomColorIndex % 2 ? '9146FF' : '6441A5'}/FFFFFF.png?text=${randomUsername.substring(0, 2).toUpperCase()}`,
          color: randomUserColors[randomColorIndex],
          isSubscriber: Math.random() > 0.7,
          isMod: Math.random() > 0.9,
        },
        message: randomMessages[randomIndex],
        timestamp: new Date(),
        hasReactions: Math.random() > 0.8,
      };
      
      setMessages(prev => [...prev.slice(-99), newRandomMessage]);
    }, Math.floor(Math.random() * 4000) + 3000); // Random interval between 3-7 seconds
    
    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      user: {
        username: 'you',
        displayName: 'You',
        avatarUrl: 'https://placehold.co/100x100/FF5CAA/FFFFFF.png?text=YOU',
        color: '#1E90FF',
        isSubscriber: true,
      },
      message: newMessage,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setAutoScroll(true); // Re-enable auto-scroll when user sends a message
  };

  const handleAddReaction = (messageId: string) => {
    // This would typically update the message with a reaction, 
    // but for this demo we'll just log it
    console.log(`Added reaction to message ${messageId}`);
    
    // Add visual feedback by updating messages state
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, hasReactions: true } 
          : msg
      )
    );
  };

  const emojis = ['😀', '😂', '🎮', '❤️', '🔥', '👍', '👏', '🙌', '😱', '🤔'];

  const addEmoji = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
    setShowEmojis(false);
  };

  if (isCollapsed) {
    return (
      <button 
        onClick={toggleCollapse}
        className="fixed bottom-4 right-4 p-3 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 hover:scale-110 transition-all duration-300 animate-bounce-light cursor-pointer"
        aria-label="Open chat"
      >
        <MessageSquare size={24} />
      </button>
    );
  }

  return (
    <div className={`flex flex-col h-full bg-card rounded-lg shadow-lg border border-border backdrop-blur-sm ${className}`}>
      <div className="p-3 border-b border-border flex justify-between items-center bg-card">
        <h3 className="font-semibold">Live Chat</h3>
        <div className="flex items-center gap-2">
          {!autoScroll && (
            <button
              onClick={() => {
                setAutoScroll(true);
                messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-xs bg-primary/20 hover:bg-primary/30 text-primary px-2 py-1 rounded-full transition-colors cursor-pointer"
              aria-label="Scroll to latest"
            >
              New messages ↓
            </button>
          )}
          {toggleCollapse && (
            <button 
              onClick={toggleCollapse}
              className="p-1 rounded-full hover:bg-secondary transition-colors cursor-pointer"
              aria-label="Collapse chat"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>
      </div>
      
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin scrollbar-thumb-secondary"
      >
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`chat-message flex items-start gap-2 group hover:bg-secondary/20 p-2 rounded-lg transition-colors ${msg.isHighlighted ? 'bg-secondary/50' : ''}`}
          >
            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 hover:scale-110 transition-transform">
              <img 
                src={msg.user.avatarUrl} 
                alt={msg.user.displayName} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 flex-wrap">
                {msg.user.isMod && (
                  <span className="bg-green-500 text-white text-xs px-1 rounded">MOD</span>
                )}
                {msg.user.isSubscriber && (
                  <span className="bg-primary text-white text-xs px-1 rounded">SUB</span>
                )}
                <span className="font-medium" style={{ color: msg.user.color }}>
                  {msg.user.displayName}
                </span>
                <span className="text-xs text-muted-foreground">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="text-sm break-words">{msg.message}</p>
              
              {msg.hasReactions && (
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-xs text-muted-foreground flex items-center gap-1 bg-red-500/10 px-2 py-0.5 rounded-full">
                    <Heart size={12} className="fill-red-500 text-red-500" /> 
                    <span className="animate-pulse">23</span>
                  </span>
                </div>
              )}
            </div>
            
            <button 
              onClick={() => handleAddReaction(msg.id)}
              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-secondary rounded-full transition-all hover:scale-125 cursor-pointer"
              aria-label="React"
            >
              <Heart size={14} className="hover:fill-red-500 hover:text-red-500 transition-colors" />
            </button>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form 
        onSubmit={handleSendMessage}
        className="p-3 border-t border-border flex gap-2 items-center"
      >
        <div className="relative flex-1">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Send a message"
            className="w-full bg-background rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary pr-10"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <button 
              type="button"
              onClick={() => setShowEmojis(!showEmojis)} 
              className="p-1 rounded-full hover:bg-secondary/50 transition-colors cursor-pointer"
              aria-label="Emojis"
            >
              <Smile size={16} className="text-muted-foreground" />
            </button>
          </div>
          
          {showEmojis && (
            <div className="absolute bottom-full left-0 mb-2 bg-card p-2 rounded-lg shadow-lg border border-border grid grid-cols-5 gap-1 z-10 animate-fade-in">
              {emojis.map((emoji, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => addEmoji(emoji)}
                  className="w-8 h-8 text-lg flex items-center justify-center hover:bg-secondary rounded transition-colors cursor-pointer"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-1">
          <button 
            type="button"
            className="p-2 rounded-full hover:bg-secondary transition-colors cursor-pointer"
            aria-label="Gift"
          >
            <Gift size={18} className="text-muted-foreground hover:text-primary transition-colors" />
          </button>
          
          <button 
            type="submit"
            className="p-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-all hover:scale-110 cursor-pointer"
            aria-label="Send message"
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default LiveChat;
