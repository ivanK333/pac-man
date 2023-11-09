import { useEffect } from 'react';

import { useWebSocket, socketUrl } from './webSocketHook';
type TNotification = { type: string; title: string; text: string };

export const useNotifications = () => {
  const ws = useWebSocket({ socketUrl });

  useEffect(() => {
    if (ws.data?.message) {
      console.log(ws.data?.message);
      const { type } = ws.data.message;
      const { title, text } = ws.data.message.content;
      const message = { type, title, text };
      showNotification(message);
    }
  }, [ws.data?.message]);

  const notify = (message: TNotification) => {
    const title = `${message.type}${message.title ? ': ' + message.title : ''}`;
    const notification = new Notification(title, {
      body: message.text,
      icon: '../assets/images/logo.svg',
    });
    console.log('Notify: ', notification);
    notification.onclick = () => {
      window.location.href = 'https://16bitgames.ya-praktikum.tech/forum/';
      clearTimeout(notificationTimeout);
    };
    notification.onclose = () => {
      clearTimeout(notificationTimeout);
    };
    const notificationTimeout = setTimeout(
      notification.close.bind(notification),
      5000,
    );
  };

  const showNotification = (message: TNotification) => {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        notify(message);
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            notify(message);
          }
        });
      }
    }
  };
  return ws;
};
