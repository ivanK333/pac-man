// import WebSocket from 'ws';

export const individualPipeline = (ctx: WebSocket): NodeJS.Timeout => {
  let idx = 0;
  const interval = setInterval(() => {
    ctx.send(`ping pong ${idx}`);
    idx += 1;
  }, 5000);
  return interval;
};

// Broadcast messages
// One instance for all clients
export const broadcastPipeline = (clients: Set<WebSocket>): NodeJS.Timeout => {
  let idx = 0;
  const interval = setInterval(() => {
    for (const client of clients) {
      client.send(`broadcast message ${idx}`);
    }
    idx += 1;
  }, 3000);
  return interval;
};
