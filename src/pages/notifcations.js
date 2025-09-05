import React from 'react';
import NotificationBanner from '../components/NotificationBanner';
import { useNotifications } from '../features/notifications/useNotifications';

const NotificationsPage = () => {
  const { 
    notifications, 
    dismissNotification, 
    clearAllNotifications 
  } = useNotifications();

  return (
    <div className="notifications-page">
      <div className="notifications-header">
        <h1>Notifications</h1>
        {notifications.length > 0 && (
          <button 
            onClick={clearAllNotifications}
            className="clear-all-button"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="notifications-content">
        {notifications.length === 0 ? (
          <div className="empty-state">
            <p>No notifications yet</p>
          </div>
        ) : (
          <div className="notifications-list">
            {notifications.map(notification => (
              <div key={notification.id} className="notification-item">
                <div className="notification-content">
                  <h3>{notification.title}</h3>
                  <p>{notification.message}</p>
                  <span className="notification-time">
                    {new Date(notification.timestamp).toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={() => dismissNotification(notification.id)}
                  className="dismiss-button"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <NotificationBanner
        notifications={notifications.slice(0, 3)} // Show only latest 3 in banner
        onDismiss={dismissNotification}
      />
    </div>
  );
};

export default NotificationsPage;
import React from 'react';
import NotificationBanner from '../components/NotificationBanner';
import { useNotifications } from '../features/notifications/useNotifications';

const NotificationsPage = () => {
  const { 
    notifications, 
    dismissNotification, 
    clearAllNotifications 
  } = useNotifications();

  return (
    <div className="notifications-page">
      <div className="notifications-header">
        <h1>Notifications</h1>
        {notifications.length > 0 && (
          <button 
            onClick={clearAllNotifications}
            className="clear-all-button"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="notifications-content">
        {notifications.length === 0 ? (
          <div className="empty-state">
            <p>No notifications yet</p>
          </div>
        ) : (
          <div className="notifications-list">
            {notifications.map(notification => (
              <div key={notification.id} className="notification-item">
                <div className="notification-content">
                  <h3>{notification.title}</h3>
                  <p>{notification.message}</p>
                  <span className="notification-time">
                    {new Date(notification.timestamp).toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={() => dismissNotification(notification.id)}
                  className="dismiss-button"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <NotificationBanner
        notifications={notifications.slice(0, 3)} // Show only latest 3 in banner
        onDismiss={dismissNotification}
      />
    </div>
  );
};

export default NotificationsPage;
