import { useState, useEffect, useRef } from 'react';

interface WebSocketHookProps {
  socketUrl: string;
  retry?: number;
  retryInterval?: number;
}

interface MessageData {
  message: any;
  timestamp: number;
}

const useWebSocket = ({
  socketUrl,
  retry: defaultRetry = 3,
  retryInterval = 1500,
}: WebSocketHookProps) => {
  const [data, setData] = useState<MessageData | undefined>();
  const send = useRef<(data: any) => void>(() => {
    console.log('send:', data);
  });
  const [retry, setRetry] = useState<number>(defaultRetry);
  const [readyState, setReadyState] = useState<boolean>(false);

  useEffect(() => {
    const ws = new WebSocket(socketUrl);

    ws.onopen = () => {
      console.log('Connected to socket');
      setReadyState(true);

      send.current = (data) => {
        try {
          const d = JSON.stringify(data);
          ws.send(d);
        } catch (err) {
          console.error('Error sending message:', err);
        }
      };

      ws.onmessage = (event) => {
        const msg = formatMessage(event.data);
        setData({ message: msg, timestamp: getTimestamp() });
      };
    };

    ws.onclose = () => {
      setReadyState(false);
      if (retry > 0) {
        setTimeout(() => {
          setRetry(retry - 1);
        }, retryInterval);
      }
    };

    return () => {
      ws.close();
    };
  }, [socketUrl, retry]);

  return { send: send.current, data, readyState };
};

const formatMessage = (data: string): any => {
  try {
    const parsed = JSON.parse(data);
    return parsed;
  } catch (err) {
    return data;
  }
};

const getTimestamp = (): number => {
  return new Date().getTime();
};

export default useWebSocket;
