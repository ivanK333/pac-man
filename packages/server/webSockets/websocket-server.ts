import type http from 'http';

// websocket-server.ts
import WebSocket from 'ws';

import { broadcastPipeline, individualPipeline } from './pipeline';

const clients: WebSocket[] = [];

const broadcastToClients = (message: string) => {
  console.log('------clients-->', clients);
  clients.forEach((client) => {
    client.send(message);
  });
};

export const createWebSocketServer = (server: http.Server) => {
  const wss = new WebSocket.Server({ server });

  broadcastPipeline(wss.clients);

  wss.on('connection', (ctx) => {
    const interval = individualPipeline(ctx);
    console.log('-------> WebSocket Client connected');
    clients.push(ctx);

    ctx.on('close', () => {
      console.log('closed', wss.clients.size);
      clearInterval(interval);
    });

    ctx.on('message', (message: string) => {
      console.log(`------> Received message from WebSocket client: ${message}`);

      broadcastToClients(message); // Broadcast the message to all clients
    });

    // Send messages to WebSocket clients
    ctx.send('Hello, WebSocket client!');
  });

  console.log('====> WebSocket server started'); // Log message indicating WebSocket server has started

  return {
    broadcast: broadcastToClients, // Export the broadcast function
  };
};
