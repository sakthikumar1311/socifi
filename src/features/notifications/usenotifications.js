// features/notifications/useNotifications.js
import { useState, useEffect } from 'react';
import { usePushNotifications } from '../../hooks/usePushNotifications';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const { requestPermission, isSupported } = usePushNotifications();

  useEffect(() => {
    if (isSupported) {
      requestPermission();
    }
  }, [isSupported, requestPermission]);

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...notification
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const dismissNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return {
    notifications,
    addNotification,
    dismissNotification,
    clearAllNotifications
  };
};