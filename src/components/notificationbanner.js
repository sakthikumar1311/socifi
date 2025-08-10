// components/NotificationBanner.jsx
import React, { useState, useEffect } from 'react';
import './NotificationBanner.css';

const NotificationBanner = ({ notifications, onDismiss }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (notifications.length > 0) {
      setVisible(true);
    }
  }, [notifications]);

  const handleDismiss = (notificationId) => {
    onDismiss(notificationId);
    if (notifications.length === 1) {
      setVisible(false);
    }
  };

  if (!visible || notifications.length === 0) return null;

  return (
    <div className="notification-banner">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`notification-item ${notification.type}`}
        >
          <div className="notification-content">
            <span className="notification-title">{notification.title}</span>
            <span className="notification-message">{notification.message}</span>
          </div>
          <button
            className="notification-close"
            onClick={() => handleDismiss(notification.id)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationBanner;