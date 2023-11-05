import type { Request, Response } from 'express';
import { Sequelize } from 'sequelize-typescript';

import TopicModel from '../models/topicModel';
import MessageModel from '../models/messageModel';
import UserModel from '../models/userModel';

const getTopics = (_: Request, res: Response) => {
  TopicModel.findAll({
    order: [[Sequelize.col('createdAt'), 'DESC']],
    include: [
      {
        model: UserModel,
      },
    ],
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
  const { id } = user;

  TopicModel.create({
    ...req.body,
    owner_id: id,
  })
    .then((topic) => {
      TopicModel.findOne({
        where: {
          id: topic.id,
        },
        include: {
          model: UserModel,
        },
      })
        .then((topic) => {
          res.status(200).json(topic);
        })
        .catch(() => {
          res.status(400).json({ message: 'Bad request' });
        });
    })
    .catch(() => {
      res.status(400).json({ message: 'Bad request' });
    });
};

const getTopicWithMessages = (req: Request, res: Response) => {
  const { id } = req.params;

  TopicModel.findOne({
    where: { id },
    include: [
      {
        model: MessageModel,
        include: [{ model: UserModel }],
      },
      { model: UserModel },
    ],
  })
    .then((topic) => {
      // console.log('====>', topic);
      res.status(200).json(topic);
    })
    .catch((error) => {
      res.status(400).json({ message: error });
    });
};

const updateTopic = (req: Request, res: Response) => {
  const { user } = res.locals;
  const { id } = user;

  TopicModel.findOne({ where: { id } }).then((topic) => {
    if (topic && String(user.id) === topic.owner_id) {
      TopicModel.update(
        {
          ...req.body,
        },
        { where: { id } },
      )
        .then(() => {
          TopicModel.findOne({
            where: {
              id,
            },
            include: {
              model: UserModel,
            },
          })
            .then((topic) => {
              res.status(200).json(topic);
            })
            .catch(() => {
              res.status(400).json({ message: 'Bad request' });
            });
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

export { getTopics, getTopicWithMessages, postTopic, deleteTopic, updateTopic };
