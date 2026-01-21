// hooks/usePushNotifications.js
import { useState, useEffect } from 'react';

export const usePushNotifications = () => {
  const [permission, setPermission] = useState(Notification.permission);
  const [isSupported, setIsSupported] = useState('Notification' in window);

  useEffect(() => {
    setIsSupported('Notification' in window);
  }, []);

  const requestPermission = async () => {
    if (!isSupported) return false;

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result === 'granted';
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  };

  const sendNotification = (title, options = {}) => {
    if (permission === 'granted') {
      return new Notification(title, {
        icon: '/favicon.ico',
        badge: '/badge.png',
        ...options
      });
    }
    return null;
  };

  return {
    permission,
    isSupported,
    requestPermission,
    sendNotification
  };
};// hooks/usePushNotifications.js
import { useState, useEffect } from 'react';

export const usePushNotifications = () => {
  const [permission, setPermission] = useState(Notification.permission);
  const [isSupported, setIsSupported] = useState('Notification' in window);

  useEffect(() => {
    setIsSupported('Notification' in window);
  }, []);

  const requestPermission = async () => {
    if (!isSupported) return false;

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result === 'granted';
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  };

  const sendNotification = (title, options = {}) => {
    if (permission === 'granted') {
      return new Notification(title, {
        icon: '/favicon.ico',
        badge: '/badge.png',
        ...options
      });
    }
    return null;
  };

  return {
    permission,
    isSupported,
    requestPermission,
    sendNotification
  };
};
