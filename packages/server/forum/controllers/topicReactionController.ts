import type { Request, Response } from 'express';
import { Sequelize } from 'sequelize-typescript';

import TopicReactionModel from '../models/topicReactionModel';

const getTopicReactions = async (req: Request, res: Response) => {
  const { topic_id } = req.params;

  TopicReactionModel.findAll({
    where: { topic_id },
    order: [[Sequelize.col('createdAt'), 'DESC']],
  })
    .then((reactions) => {
      res.status(200).send(reactions);
    })
    .catch(() => {
      res.status(400).json({ message: 'Bad request' });
    });
};

const postTopicReaction = async (req: Request, res: Response) => {
  const { user } = res.locals;
  const { id } = user;
  const { topic_id } = req.params;

  TopicReactionModel.create({
    ...req.body,
    topic_id: topic_id,
    owner_id: id,
  })
    .then((reaction) => {
      res.status(200).json(reaction);
    })
    .catch(() => {
      res.status(400).json({ message: 'Bad request' });
    });
};

const deleteTopicReaction = async (req: Request, res: Response) => {
  const { user } = res.locals;
  const { topic_id, reaction_id } = req.params;

  TopicReactionModel.findOne({ where: { topic_id } }).then((reaction) => {
    if (reaction && String(user.id) === reaction.owner_id) {
      TopicReactionModel.destroy({
        where: { id: reaction_id },
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
  });
};

export { getTopicReactions, postTopicReaction, deleteTopicReaction };
