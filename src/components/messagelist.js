
// components/MessageList.jsx
import React, { useEffect, useRef } from 'react';
import './MessageList.css';

const MessageList = ({ messages, currentUser }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="message-list">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`message-item ${
            message.userId === currentUser?.id ? 'own-message' : 'other-message'
          }`}
        >
          <div className="message-avatar">
            <img src={message.avatar || '/default-avatar.png'} alt="Avatar" />
          </div>
          <div className="message-content">
            <div className="message-header">
              <span className="message-username">{message.username}</span>
              <span className="message-time">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <div className="message-text">{message.text}</div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
