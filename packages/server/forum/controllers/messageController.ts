import type { Request, Response } from 'express';
import { Sequelize } from 'sequelize-typescript';

import MessageModel from '../models/messageModel';

const getMessages = (req: Request, res: Response) => {
  const { topic_id } = req.params;
  MessageModel.findAll({
    where: {
      topic_id,
    },
    order: [[Sequelize.col('createdAt'), 'ASC']],
  })
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch(() => {
      res.status(400).json({ message: 'Bad request' });
    });
};
const postMessage = (req: Request, res: Response) => {
  const { topic_id } = req.params;
  MessageModel.create({
    ...req.body,
    owner_avatar: 'TEST AVATAR',
    owner_id: 'TEST ID',
    owner_login: 'TEST LOGIN',
    topic_id,
  })
    .then((message) => {
      res.status(200).json(message);
    })
    .catch(() => {
      res.status(400).json({ message: 'Bad request' });
    });
};
const updateMessage = (req: Request, res: Response) => {
  const { id } = req.params;

  MessageModel.update(
    {
      ...req.body,
      owner_avatar: 'SUPERTEST AVATAR',
      owner_id: 'SUPERTEST ID',
      owner_login: 'SUPERTEST LOGIN',
    },
    { where: { id }, returning: true },
  )
    .then((message) => {
      res.status(200).json(message[1][0]);
    })
    .catch(() => {
      res.status(400).json({ message: 'Bad request' });
    });
};
const deleteMessage = (req: Request, res: Response) => {
  const { id } = req.params;

  MessageModel.destroy({
    where: { id },
  })
    .then((deletedRecord) => {
      deletedRecord === 1
        ? res.status(200).json({ message: 'OK' })
        : res.status(404).json({ message: 'Not found' });
    })
    .catch(() => {
      res.status(400).json({ message: 'Bad request' });
    });
};

export { getMessages, postMessage, updateMessage, deleteMessage };
