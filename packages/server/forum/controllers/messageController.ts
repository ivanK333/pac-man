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
  const { user } = res.locals;
  const { login, avatar } = user;

  MessageModel.create({
    ...req.body,
    owner_avatar: avatar,
    owner_id: user.id,
    owner_login: login,
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
  const { user } = res.locals;
  const { login, avatar } = user;

  MessageModel.findOne({ where: { id } }).then((message) => {
    if (message && String(user.id) === message.owner_id) {
      MessageModel.update(
        {
          ...req.body,
          owner_avatar: avatar,
          owner_id: user.id,
          owner_login: login,
        },
        { where: { id }, returning: true },
      )
        .then((message) => {
          res.status(200).json(message[1][0]);
        })
        .catch(() => {
          res.status(400).json({ message: 'Bad request' });
        });
    } else {
      res.status(403).json({ message: 'Wrong owner' });
    }
  });
};
const deleteMessage = (req: Request, res: Response) => {
  const { id } = req.params;
  const { user } = res.locals;

  MessageModel.findOne({ where: { id } })
    .then((message) => {
      if (message && String(user.id) === message.owner_id) {
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
      } else {
        res.status(403).json({ message: 'Wrong owner' });
      }
    })
    .catch(() => {
      res.status(400).json({ message: 'not found' });
    });
};

export { getMessages, postMessage, updateMessage, deleteMessage };