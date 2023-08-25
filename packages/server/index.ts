import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';

import { csvCounter } from './GameLayers/csvCounter';
import { readCsvAsmatrix } from './GameLayers/csvReader';
dotenv.config();
import { createClientAndConnect } from './db';

const app = express();
app.use(cors());
const port = Number(process.env.SERVER_PORT) || 3002;

createClientAndConnect();

app.get('/level', async (req, res) => {
  const { level } = req.query;
  const matrix = await readCsvAsmatrix(level as string);
  res.json({ matrix });
});

app.get('/levels', async (_, res) => {
  const levels = await csvCounter();
  res.json({ levels });
});

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)');
});

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
});
