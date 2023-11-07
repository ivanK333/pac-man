import type { Server as HttpServer } from 'http';

import type WebSocket from 'ws';
import { Server as WebSocketServer } from 'ws';

import { individualPipeline, broadcastPipeline } from './pipeline';
// type MyWebSocket = WebSocket;

export const setupWebSocket = (server: HttpServer) => {
  const wss: WebSocketServer = new WebSocketServer({ noServer: true });

  server.on('upgrade', function upgrade(request, socket, head) {
    try {
      // Handle authentication and other steps
      // Upgrade logic here

      wss.handleUpgrade(request, socket, head, (ws: WebSocket) => {
        wss.emit('connection', ws, request);
      });
    } catch (err) {
      console.log('upgrade exception', err);
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
      return;
    }
  });

  broadcastPipeline(wss.clients);

  wss.on('connection', (ws: WebSocket) => {
    // Handle connection logic
    const interval = individualPipeline(ws);

    // Handle message events
    ws.on('message', (message: string) => {
      console.log(`Received message => ${message}`);
      ws.send(`you said ${message}`);
    });

    // Handle close event
    ws.on('close', () => {
      console.log('closed', wss.clients.size);
      clearInterval(interval);
    });

    // Sent a message that the connection is established
    ws.send('connection established.');
  });

  console.log('===> Started WebSockets');
};
