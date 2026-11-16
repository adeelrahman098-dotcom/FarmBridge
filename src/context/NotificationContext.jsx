import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_NOTIFICATIONS } from '../data/seedData';
import { useAuth } from './AuthContext';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('farmbridge_notifications');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing stored notifications', e);
      }
    }
    return INITIAL_NOTIFICATIONS;
  });

  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    localStorage.setItem('farmbridge_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = ({ userId, type, title, message, link }) => {
    const newNotif = {
      id: `notif_${Date.now()}`,
      userId,
      type,
      title,
      message,
      link: link || '#',
      isRead: false,
      createdAt: new Date().toISOString()
    };

    setNotifications(prev => [newNotif, ...prev]);

    // Show toast if notification is for currently active user
    if (currentUser && currentUser.id === userId) {
      const toastId = Date.now();
      setToasts(prev => [...prev, { id: toastId, title, message, type }]);
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== toastId));
      }, 5000);
    }
  };

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllAsRead = (userId) => {
    setNotifications(prev => prev.map(n => n.userId === userId ? { ...n, isRead: true } : n));
  };

  const userNotifications = notifications.filter(n => currentUser && n.userId === currentUser.id);
  const unreadCount = userNotifications.filter(n => !n.isRead).length;

  return (
    <NotificationContext.Provider value={{
      notifications,
      userNotifications,
      unreadCount,
      addNotification,
      markAsRead,
      markAllAsRead,
      toasts,
      dismissToast: (id) => setToasts(prev => prev.filter(t => t.id !== id))
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationContext);
}
