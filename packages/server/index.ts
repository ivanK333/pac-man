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

import { YandexAPIRepository } from './repository/YandexAPIRepository';
import { errorLogger, requestLogger } from './middlewares/logger';
import { dbConnect } from './forum/init';

interface SSRModule {
  render: (uri: string, repository: YandexAPIRepository) => Promise<string>;
}

const isDev = () => process.env.NODE_ENV === 'development';
const isProd = () => process.env.NODE_ENV === 'production';

const port = Number(process.env.SERVER_PORT) || 3005;

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

  app.use('/forum', router);

  let vite: ViteDevServer | undefined;
  const distPath = path.resolve(__dirname, '../../packages/client/dist');
  const srcPath = path.resolve(__dirname, '../../packages/client');
  // const ssrClientPath = require.resolve('client/ssr-dist/ssr.cjs');

  if (isDev()) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
    });

    app.use(vite.middlewares);
  }

  if (isProd()) {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')));
  }

  app.use('*', cookieParser(), async (req, res, next) => {
    const url = req.originalUrl;
    let mod: SSRModule;
    let template: string;

    try {
      template = fs.readFileSync(
        path.resolve(isDev() ? srcPath : distPath, 'index.html'),
        'utf-8',
      );

      // if (isDev()) {
      template = await vite!.transformIndexHtml(url, template);
      mod = (await vite!.ssrLoadModule(
        path.resolve(srcPath, 'ssr.tsx'),
      )) as SSRModule;
      // } else {
      //   mod = await import(ssrClientPath);
      // }

      const { render } = mod;

      const [initialState, appHtml] = await render(
        url,
        new YandexAPIRepository(req.headers['cookie']),
      );

      const initStateSerialized = JSON.stringify(initialState);

      const html = template
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace('<!--store-data-->', initStateSerialized);

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
dbConnect().then(() => {
  startServer().then(() => {
    console.log(
      `  ➜ 🎸 Server is listening on port: ${port}`,
      `http://localhost:${port}/`,
    );
    console.log(process.env.NODE_ENV);
  });
});
