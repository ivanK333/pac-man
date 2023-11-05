import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import dotenv from 'dotenv';

import CommentModel from './forum/models/commentModel';
import TopicModel from './forum/models/topicModel';
import MessageModel from './forum/models/messageModel';
import ThemeModel from './theme/models/themeModel';
import {
  registerCommentsCountQuery,
  registerMessagesCountQuery,
} from './forum/triggers';
import UserModel from './forum/models/userModel';

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
sequelize.addModels([
  CommentModel,
  TopicModel,
  MessageModel,
  ThemeModel,
  UserModel,
]);
export async function dbConnect() {
  try {
    await sequelize.authenticate(); // Проверка аутентификации в БД
    await sequelize.sync(/*{ force: true }*/); // Синхронизация базы данных
    console.log('Connection has been established successfully.');

    await sequelize.query(registerCommentsCountQuery);
    await sequelize.query(registerMessagesCountQuery);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
