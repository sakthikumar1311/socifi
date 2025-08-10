import React from 'react';
import ChatRoom from '../features/chat/ChatRoom';
import { useAuth } from '../hooks/useAuth';

const ChatPage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!user) {
    return <div className="error">Please log in to access chat</div>;
  }

  return (
    <div className="chat-page">
      <h1>Live Chat</h1>
      <ChatRoom roomId="general" />
    </div>
  );
};

export default ChatPage;