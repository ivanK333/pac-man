import type { Server as HttpServer } from 'http';

import type WebSocket from 'ws';
import { Server as WebSocketServer } from 'ws';

export const setupWebSocket = (server: HttpServer) => {
  const wss: WebSocketServer = new WebSocketServer({ noServer: true });

  server.on('upgrade', function upgrade(request, socket, head) {
    const url = request.url;
    try {
      wss.handleUpgrade(request, socket, head, (ws: WebSocket) => {
        wss.emit('connection', ws, request);
      });
      console.log(`WebSocket connection established: ${url}`);
    } catch (err) {
      console.log('upgrade exception', err);
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
      return;
    }
  });

  wss.on('connection', (ws: WebSocket) => {
    ws.on('message', (message: string) => {
      console.log(`  Received message: ${message}`);
      wss.clients.forEach((client) => {
        client.send(JSON.stringify(message));
      });
    });

    ws.on('close', () => {
      console.log('closed', wss.clients.size);
    });
  });

  console.log('Started WebSockets');
};
