import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import dotenv from 'dotenv';

import CommentModel from './models/commentModel';
import TopicModel from './models/topicModel';
import MessageModel from './models/messageModel';

dotenv.config();

const sequelizeOptions: SequelizeOptions = {
  host: process.env.POSTGRES_HOST!,
  port: Number(process.env.POSTGRES_PORT!),
  username: String(process.env.POSTGRES_USER!),
  password: String(process.env.POSTGRES_PASSWORD!),
  database: process.env.POSTGRES_DB!,
  dialect: 'postgres',
  logging: (msg) => console.log(msg),
};
export const sequelize = new Sequelize(sequelizeOptions);
sequelize.addModels([CommentModel, TopicModel, MessageModel]);
export async function dbConnect() {
  try {
    await sequelize.authenticate(); // Проверка аутентификации в БД
    await sequelize.sync(); // Синхронизация базы данных
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
