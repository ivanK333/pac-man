import type { Request, Response } from 'express';
import { Sequelize } from 'sequelize-typescript';

import TopicModel from '../models/topicModel';

const getTopics = (_: Request, res: Response) => {
  TopicModel.findAll({
    order: [[Sequelize.col('createdAt'), 'DESC']],
  })
    .then((topics) => {
      res.status(200).json(topics);
    })
    .catch(() => {
      res.status(400).json({ message: 'Bad request' });
    });
};
const postTopic = (req: Request, res: Response) => {
  const { user } = res.locals;
  const { id, login, avatar } = user;

  TopicModel.create({
    ...req.body,
    owner_avatar: avatar,
    owner_id: id,
    owner_login: login,
  })
    .then((topic) => {
      res.status(200).json(topic);
    })
    .catch(() => {
      res.status(400).json({ message: 'Bad request' });
    });
};

const updateTopic = (req: Request, res: Response) => {
  const { user } = res.locals;
  const { id, login, avatar } = user;

  TopicModel.findOne({ where: { id } }).then((topic) => {
    if (topic && String(user.id) === topic.owner_id) {
      TopicModel.update(
        {
          ...req.body,
          owner_avatar: avatar,
          owner_id: id,
          owner_login: login,
        },
        { where: { id }, returning: true },
      )
        .then((topic) => {
          res.status(200).json(topic[1][0]);
        })
        .catch(() => {
          res.status(400).json({ message: 'Bad request' });
        });
    } else {
      res.status(403).json({ message: 'Wrong owner' });
    }
  });
};

const deleteTopic = (req: Request, res: Response) => {
  const { id } = req.params;
  const { user } = res.locals;

  TopicModel.findOne({ where: { id } })
    .then((topic) => {
      if (topic && topic.owner_id === String(user.id)) {
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
      } else {
        res.status(403).json({ message: 'Wrong owner' });
      }
    })
    .catch(() => {
      res.status(400).json({ message: 'not found' });
    });
};

export { getTopics, postTopic, deleteTopic, updateTopic };
