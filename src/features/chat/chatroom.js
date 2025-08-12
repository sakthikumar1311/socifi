import React, { useState, useEffect } from 'react';
import ChatBox from '../../components/ChatBox';
import MessageList from '../../components/MessageList';
import { useSocket } from './useSocket';
import { useAuth } from '../../hooks/useAuth';

const ChatRoom = ({ roomId }) => {
  const [messages, setMessages] = useState([]);
  const { user } = useAuth();
  const { socket, isConnected } = useSocket();

  useEffect(() => {
    if (socket && roomId) {
      socket.emit('join-room', roomId);

      socket.on('message', (message) => {
        setMessages(prev => [...prev, message]);
      });

      socket.on('user-joined', (data) => {
        setMessages(prev => [...prev, {
          type: 'system',
          text: `${data.username} joined the chat`,
          timestamp: new Date().toISOString()
        }]);
      });

      return () => {
        socket.off('message');
        socket.off('user-joined');
      };
    }
  }, [socket, roomId]);

  const handleSendMessage = (text) => {
    if (socket && user) {
      const message = {
        text,
        username: user.username,
        userId: user.id,
        roomId,
        timestamp: new Date().toISOString()
      };
      socket.emit('send-message', message);
    }
  };

  return (
    <div className="chat-room">
      <MessageList messages={messages} currentUser={user} />
      <ChatBox
        messages={messages}
        onSendMessage={handleSendMessage}
        isConnected={isConnected}
      />
    </div>
  );
};

export default ChatRoom;
import React, { useState, useEffect } from 'react';
import ChatBox from '../../components/ChatBox';
import MessageList from '../../components/MessageList';
import { useSocket } from './useSocket';
import { useAuth } from '../../hooks/useAuth';

const ChatRoom = ({ roomId }) => {
  const [messages, setMessages] = useState([]);
  const { user } = useAuth();
  const { socket, isConnected } = useSocket();

  useEffect(() => {
    if (socket && roomId) {
      socket.emit('join-room', roomId);

      socket.on('message', (message) => {
        setMessages(prev => [...prev, message]);
      });

      socket.on('user-joined', (data) => {
        setMessages(prev => [...prev, {
          type: 'system',
          text: `${data.username} joined the chat`,
          timestamp: new Date().toISOString()
        }]);
      });

      return () => {
        socket.off('message');
        socket.off('user-joined');
      };
    }
  }, [socket, roomId]);

  const handleSendMessage = (text) => {
    if (socket && user) {
      const message = {
        text,
        username: user.username,
        userId: user.id,
        roomId,
        timestamp: new Date().toISOString()
      };
      socket.emit('send-message', message);
    }
  };

  return (
    <div className="chat-room">
      <MessageList messages={messages} currentUser={user} />
      <ChatBox
        messages={messages}
        onSendMessage={handleSendMessage}
        isConnected={isConnected}
      />
    </div>
  );
};

export default ChatRoom;
