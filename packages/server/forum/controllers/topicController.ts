import type { Request, Response } from 'express';
import { Sequelize } from 'sequelize-typescript';

import TopicModel from '../models/topicModel';

const getTopics = (_: Request, res: Response) => {
  TopicModel.findAll({
    order: [[Sequelize.col('createdAt'), 'DESC']],
  })
    .then(() => {
      res.status(200).json(res.locals.user);
    })
    .catch(() => {
      res.status(400).json({ message: 'Bad request' });
    });
};
const postTopic = (req: Request, res: Response) => {
  TopicModel.create({
    ...req.body,
    owner_avatar: 'TEST AVATAR',
    owner_id: 'TEST ID',
    owner_login: 'TEST LOGIN',
  })
    .then((topic) => {
      res.status(200).json(topic);
    })
    .catch(() => {
      res.status(400).json({ message: 'Bad request' });
    });
};

const updateTopic = (req: Request, res: Response) => {
  const { id } = req.params;
  TopicModel.update(
    {
      ...req.body,
      owner_avatar: 'SUPERTEST AVATAR',
      owner_id: 'SUPERTEST ID',
      owner_login: 'SUPERTEST LOGIN',
    },
    { where: { id }, returning: true },
  )
    .then((topic) => {
      res.status(200).json(topic[1][0]);
    })
    .catch(() => {
      res.status(400).json({ message: 'Bad request' });
    });
};

const deleteTopic = (req: Request, res: Response) => {
  const { id } = req.params;
  TopicModel.destroy({
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

export { getTopics, postTopic, deleteTopic, updateTopic };
