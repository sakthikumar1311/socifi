import React, { useState, useEffect, useRef } from 'react';
import { Home, MessageCircle, Video, User, Send, Wifi, Activity, Users, Settings } from 'lucide-react';

// Mock Services
const MessageService = {
  messages: [
    { id: 1, user: 'Alice', message: 'Hey there! How are you doing?', timestamp: new Date(Date.now() - 300000) },
    { id: 2, user: 'Bob', message: 'Great to see the new features!', timestamp: new Date(Date.now() - 180000) },
    { id: 3, user: 'Charlie', message: 'The real-time messaging works perfectly 🚀', timestamp: new Date(Date.now() - 60000) }
  ],
  
  sendMessage: (message) => {
    const newMessage = {
      id: Date.now(),
      user: 'You',
      message,
      timestamp: new Date()
    };
    MessageService.messages.push(newMessage);
    return newMessage;
  },
  
  getMessages: () => MessageService.messages
};

const RecommendationService = {
  videos: [
    { id: 1, title: 'React Advanced Patterns', thumbnail: '🎥', views: '1.2M', duration: '15:32' },
    { id: 2, title: 'Modern CSS Techniques', thumbnail: '🎨', views: '890K', duration: '22:15' },
    { id: 3, title: 'JavaScript Performance Tips', thumbnail: '⚡', views: '2.1M', duration: '18:47' },
    { id: 4, title: 'Web3 Development Guide', thumbnail: '🔗', views: '756K', duration: '31:20' },
    { id: 5, title: 'UI/UX Design Principles', thumbnail: '✨', views: '1.8M', duration: '25:08' },
    { id: 6, title: 'Socket.IO Real-time Apps', thumbnail: '🔄', views: '623K', duration: '28:14' }
  ],
  
  getRecommendations: () => RecommendationService.videos
};

const SmartContractService = {
  isConnected: true,
  balance: '12.34 ETH',
  transactions: 147,
  
  getStatus: () => ({
    connected: SmartContractService.isConnected,
    balance: SmartContractService.balance,
    transactions: SmartContractService.transactions
  })
};

// Components
const Navigation = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'chat', icon: MessageCircle, label: 'Chat' },
    { id: 'videos', icon: Video, label: 'Videos' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <nav className="bg-black/20 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            ⚡ NexusApp
          </div>
          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    currentPage === item.id
                      ? 'bg-white/20 text-white shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon size={18} />
                  <span className="hidden sm:block">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

const StatusIndicator = ({ status = 'online' }) => {
  return (
    <div className="flex items-center space-x-2">
      <div className={`w-3 h-3 rounded-full ${status === 'online' ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
      <span className="text-sm text-white/70 capitalize">{status}</span>
    </div>
  );
};

const MetricCard = ({ title, value, icon, color = 'purple' }) => {
  const colorClasses = {
    purple: 'from-purple-500/20 to-purple-600/20 border-purple-400/30',
    pink: 'from-pink-500/20 to-pink-600/20 border-pink-400/30',
    blue: 'from-blue-500/20 to-blue-600/20 border-blue-400/30',
    green: 'from-green-500/20 to-green-600/20 border-green-400/30'
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} backdrop-blur-lg rounded-xl p-6 border hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-${color}-500/20`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/60 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  );
};

const HomePage = () => {
  const [systemMetrics] = useState({
    uptime: '99.9%',
    performance: '847ms',
    activeUsers: '12,486',
    version: 'v2.1.0'
  });

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-6 animate-pulse">
            ⚡ System Dashboard
          </h1>
          <p className="text-xl text-white/70 mb-8">
            Real-time monitoring and intelligent services platform
          </p>
          <StatusIndicator status="online" />
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <MetricCard title="Uptime" value={systemMetrics.uptime} icon="⏱️" color="green" />
          <MetricCard title="Performance" value={systemMetrics.performance} icon="📊" color="blue" />
          <MetricCard title="Active Users" value={systemMetrics.activeUsers} icon="👥" color="purple" />
          <MetricCard title="Version" value={systemMetrics.version} icon="🔄" color="pink" />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-xl p-8 border border-white/10 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold text-white mb-2">Lightning Fast</h3>
            <p className="text-white/70">Optimized performance with sub-second response times</p>
          </div>
          <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-lg rounded-xl p-8 border border-white/10 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/20">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-bold text-white mb-2">Secure & Safe</h3>
            <p className="text-white/70">Enterprise-grade security with end-to-end encryption</p>
          </div>
          <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 backdrop-blur-lg rounded-xl p-8 border border-white/10 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/20">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-xl font-bold text-white mb-2">Modern Design</h3>
            <p className="text-white/70">Beautiful glassmorphism UI with smooth animations</p>
          </div>
        </div>

        {/* Windows Activation Notice */}
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-lg rounded-xl p-6 border border-blue-400/30 mb-8">
          <div className="flex items-center space-x-4">
            <div className="text-3xl">🪟</div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-1">System Activation Status</h3>
              <p className="text-white/70">All services are properly activated and running optimally</p>
            </div>
            <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-lg text-sm font-medium">
              ✓ Activated
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatPage = () => {
  const [messages, setMessages] = useState(MessageService.getMessages());
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = MessageService.sendMessage(newMessage);
      setMessages([...messages, message]);
      setNewMessage('');
      
      // Simulate typing indicator
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const responses = [
          "That's interesting! Tell me more 🤔",
          "Thanks for sharing! 😊",
          "Great point! I agree 👍",
          "Awesome! The system is working perfectly ⚡",
          "Nice to hear from you! 🎉"
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const botMessage = MessageService.sendMessage(randomResponse);
        botMessage.user = 'System Bot';
        setMessages(prev => [...prev, botMessage]);
      }, 2000);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="h-screen flex flex-col p-6">
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-black/20 backdrop-blur-lg rounded-t-xl p-6 border border-white/10 border-b-0">
          <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
            <MessageCircle className="text-purple-400" />
            <span>Real-time Chat</span>
          </h1>
          <p className="text-white/60 mt-1">Connected via Socket.IO</p>
        </div>

        {/* Messages Container */}
        <div className="flex-1 bg-black/10 backdrop-blur-lg border border-white/10 border-t-0 border-b-0 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.user === 'You' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  msg.user === 'You'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'bg-white/10 backdrop-blur text-white border border-white/20'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-xs font-medium opacity-70">{msg.user}</span>
                  <span className="text-xs opacity-50">{formatTime(msg.timestamp)}</span>
                </div>
                <p>{msg.message}</p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white/10 backdrop-blur text-white border border-white/20 px-4 py-2 rounded-lg">
                <div className="flex items-center space-x-2">
                  <span className="text-sm">System Bot is typing</span>
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-white rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-black/20 backdrop-blur-lg rounded-b-xl p-6 border border-white/10 border-t-0">
          <div className="flex space-x-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 bg-white/10 backdrop-blur border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            />
            <button
              onClick={handleSendMessage}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:scale-105 transition-transform flex items-center space-x-2"
            >
              <Send size={16} />
              <span>Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const VideosPage = () => {
  const [videos, setVideos] = useState(RecommendationService.getRecommendations());
  const [loading, setLoading] = useState(false);

  const refreshRecommendations = () => {
    setLoading(true);
    setTimeout(() => {
      // Simulate new video recommendations
      const newVideos = [
        { id: 7, title: 'Advanced TypeScript Tips', thumbnail: '🎯', views: '2.5M', duration: '35:20' },
        { id: 8, title: 'Node.js Best Practices', thumbnail: '🟢', views: '1.8M', duration: '28:45' },
        { id: 9, title: 'Database Optimization', thumbnail: '💾', views: '934K', duration: '42:30' },
        { id: 10, title: 'GraphQL Deep Dive', thumbnail: '🔍', views: '1.2M', duration: '38:15' },
        { id: 11, title: 'Docker Containerization', thumbnail: '🐳', views: '1.6M', duration: '31:50' },
        { id: 12, title: 'Kubernetes Fundamentals', thumbnail: '☸️', views: '1.1M', duration: '45:20' }
      ];
      setVideos(newVideos);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center space-x-2">
              <Video className="text-purple-400" />
              <span>Video Recommendations</span>
            </h1>
            <p className="text-white/60 mt-1">Powered by AI recommendation engine</p>
          </div>
          <button
            onClick={refreshRecommendations}
            disabled={loading}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:scale-105 transition-transform flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Activity size={16} className={loading ? 'animate-spin' : ''} />
            <span>{loading ? 'Loading...' : 'Refresh'}</span>
          </button>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            [...Array(6)].map((_, i) => (
              <div key={i} className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20 animate-pulse">
                <div className="aspect-video bg-white/20 rounded-lg mb-4"></div>
                <div className="h-4 bg-white/20 rounded mb-2"></div>
                <div className="h-3 bg-white/20 rounded w-2/3"></div>
              </div>
            ))
          ) : (
            videos.map((video) => (
              <div
                key={video.id}
                className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer"
              >
                <div className="aspect-video bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-lg mb-4 flex items-center justify-center text-6xl">
                  {video.thumbnail}
                </div>
                <h3 className="text-white font-semibold mb-2">{video.title}</h3>
                <div className="flex justify-between text-sm text-white/60">
                  <span>{video.views} views</span>
                  <span>{video.duration}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const ProfilePage = () => {
  const [contractStatus] = useState(SmartContractService.getStatus());
  const [userStats] = useState({
    messagesSent: 1247,
    videosWatched: 89,
    hoursOnline: 156,
    achievements: 12
  });

  const [settings, setSettings] = useState({
    darkMode: true,
    notifications: true,
    autoplayVideos: false
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto mb-4 flex items-center justify-center text-6xl">
            👤
          </div>
          <h1 className="text-3xl font-bold text-white">John Doe</h1>
          <p className="text-white/60">Premium User • Member since 2024</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <MetricCard title="Messages Sent" value={userStats.messagesSent.toLocaleString()} icon="💬" color="purple" />
          <MetricCard title="Videos Watched" value={userStats.videosWatched} icon="🎥" color="pink" />
          <MetricCard title="Hours Online" value={userStats.hoursOnline} icon="⏰" color="blue" />
          <MetricCard title="Achievements" value={userStats.achievements} icon="🏆" color="green" />
        </div>

        {/* Web3 Integration */}
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-lg rounded-xl p-8 border border-white/20 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
            <span>🔗</span>
            <span>Web3 Integration</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">🟢</div>
              <div className="text-white font-semibold">Connection Status</div>
              <div className="text-green-400">{contractStatus.connected ? 'Connected' : 'Disconnected'}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">💰</div>
              <div className="text-white font-semibold">Wallet Balance</div>
              <div className="text-purple-400">{contractStatus.balance}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">📈</div>
              <div className="text-white font-semibold">Transactions</div>
              <div className="text-pink-400">{contractStatus.transactions}</div>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
            <Settings className="text-purple-400" />
            <span>Account Settings</span>
          </h2>
          <div className="space-y-4">
            {Object.entries(settings).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <span className="text-white capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <button
                  onClick={() => toggleSetting(key)}
                  className={`w-12 h-6 rounded-full relative transition-colors ${
                    value ? 'bg-purple-500' : 'bg-gray-400'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                      value ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  ></div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'chat':
        return <ChatPage />;
      case 'videos':
        return <VideosPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderPage()}
    </div>
  );
};

export default App;