// components/ChatBox.jsx
import React, { useState } from 'react';
import './ChatBox.css';

const ChatBox = ({ messages, onSendMessage, isConnected }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && onSendMessage) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="chat-box">
      <div className="chat-header">
        <h3>Live Chat</h3>
        <span className={`status ${isConnected ? 'connected' : 'disconnected'}`}>
          {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
        </span>
      </div>
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <span className="username">{msg.username}:</span>
            <span className="text">{msg.text}</span>
            <span className="timestamp">{msg.timestamp}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="message-form">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          disabled={!isConnected}
        />
        <button type="submit" disabled={!isConnected || !message.trim()}>
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatBox;