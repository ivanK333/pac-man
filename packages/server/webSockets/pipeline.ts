import type { WebSocket } from 'ws';

const individualPipeline = (ctx: WebSocket) => {
  let idx = 0;
  const interval = setInterval(() => {
    ctx.send(`ping pong ${idx}`);
    idx += 1;
  }, 5000);
  return interval;
};

const broadcastPipeline = (clients: any) => {
  let idx = 0;
  const interval = setInterval(() => {
    for (const c of clients.values()) {
      c.send(`broadcast message ${idx}`);
    }
    idx += 1;
  }, 3000);
  return interval;
};

export { individualPipeline, broadcastPipeline };
