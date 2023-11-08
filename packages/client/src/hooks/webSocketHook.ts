import { useState, useEffect } from 'react';

import { WS_URL } from '../constants/api';

export const socketUrl = WS_URL;
interface WebSocketData {
  message?: any;
  timestamp: number;
}

interface WebSocketHookProps {
  socketUrl: string;
  retry?: number;
  retryInterval?: number;
}

export const useWebSocket = ({
  socketUrl,
  retry: defaultRetry = 3,
  retryInterval = 1500,
}: WebSocketHookProps): {
  send: (data: Record<string, any>) => boolean;
  data: WebSocketData | undefined;
  readyState: boolean;
} => {
  const [data, setData] = useState<WebSocketData | undefined>(undefined);
  const [send, setSend] = useState<(data: Record<string, any>) => boolean>(
    () => false,
  );
  const [retry, setRetry] = useState<number>(defaultRetry);
  const [readyState, setReadyState] = useState<boolean>(false);

  useEffect(() => {
    const ws = new WebSocket(socketUrl);

    ws.onopen = () => {
      //   console.log('Connected to socket');
      setReadyState(true);

      setSend(() => {
        return (data: Record<string, any>) => {
          //   console.log('sending message from useWebSocketHook =>', data);
          try {
            const d = JSON.stringify(data);
            ws.send(d);
            return true;
          } catch (err) {
            return false;
          }
        };
      });

      ws.onmessage = (event) => {
        const msg = formatMessage(event.data);
        setData({ message: msg, timestamp: getTimestamp() });
      };
    };

    ws.onclose = () => {
      setReadyState(false);

      if (retry > 0) {
        setTimeout(() => {
          setRetry((retry) => retry - 1);
        }, retryInterval);
      }
    };

    return () => {
      ws.close();
    };
  }, [socketUrl, retry, retryInterval]);

  return { send, data, readyState };
};

const formatMessage = (data: string): any => {
  try {
    const dataObject = JSON.parse(data);
    const buffer = dataObject.data;
    const message = String.fromCharCode(...buffer);
    const parsed = JSON.parse(message);
    // console.log('receiving messgage from useWebSocketHook =>', parsed);
    return parsed;
  } catch (err) {
    console.log(err);
    return data;
  }
};

const getTimestamp = (): number => {
  return new Date().getTime();
};
