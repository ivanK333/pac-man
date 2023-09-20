import * as fs from 'fs';
import * as path from 'path';

import dotenv from 'dotenv';
import cors from 'cors';
import { createServer as createViteServer } from 'vite';
import type { ViteDevServer } from 'vite';
dotenv.config();
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cookieParser from 'cookie-parser';

import { errorLogger, requestLogger } from './middlewares/logger';

//import { createClientAndConnect } from './db';

const isDev = () => process.env.NODE_ENV === 'development';
const port = Number(process.env.SERVER_PORT) || 5000;
async function startServer() {
  //createClientAndConnect();
  const app = express();
  app.use(requestLogger); // request logger
  app.use(
    cors({
      origin: '*', // allow all cors requests when develop
    }),
  );
  app.use(
    '/api/v2',
    createProxyMiddleware({
      changeOrigin: true,
      cookieDomainRewrite: {
        '*': '',
      },
      target: 'https://ya-praktikum.tech',
    }),
  );

  let vite: ViteDevServer | undefined;
  const distPath = path.resolve(__dirname, '../../packages/client/dist');
  const srcPath = path.resolve(__dirname, '../../packages/client');
  const ssrClientPath = require.resolve('client/ssr-dist/ssr.cjs');

  if (isDev()) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
    });

    app.use(vite.middlewares);
  }

  if (!isDev()) {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')));
  }

  app.use('*', cookieParser(), async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let template: string;

      if (!isDev()) {
        template = fs.readFileSync(
          path.resolve(distPath, 'index.html'),
          'utf-8',
        );
      } else {
        template = fs.readFileSync(
          path.resolve(srcPath, 'index.html'),
          'utf-8',
        );

        template = await vite!.transformIndexHtml(url, template);
      }

      interface SSRModule {
        render: (uri: string) => Promise<string>;
      }

      let mod: SSRModule;

      if (isDev()) {
        mod = (await vite!.ssrLoadModule(
          path.resolve(srcPath, 'ssr.tsx'),
        )) as SSRModule;
      } else {
        mod = await import(ssrClientPath);
      }

      const { render } = mod;
      const appHtml = await render(url);

      const html = template.replace(`<!--ssr-outlet-->`, appHtml);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      if (isDev()) {
        vite!.ssrFixStacktrace(e as Error);
      }
      next(e);
    }
  });
  app.use(errorLogger); // error logger

  app.listen(port);
}

startServer().then(() => {
  console.log(
    `  ➜ 🎸 Server is listening on port: ${port}`,
    `http://localhost:${port}/`,
  );
});
