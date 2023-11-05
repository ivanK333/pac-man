import type { Request, Response } from 'express';
import { Sequelize } from 'sequelize-typescript';

import MessageReactionModel from '../models/messageReactionModel';

const getMessageReactions = async (req: Request, res: Response) => {
  const { message_id } = req.params;

  MessageReactionModel.findAll({
    where: { message_id },
    order: [[Sequelize.col('createdAt'), 'DESC']],
  })
    .then((reaction) => {
      res.status(200).send(reaction);
    })
    .catch(() => {
      res.status(400).json({ message: 'Bad request' });
    });
};

const postMessageReaction = async (req: Request, res: Response) => {
  const { user } = res.locals;
  const { id } = user;
  const { message_id } = req.params;

  MessageReactionModel.create({
    ...req.body,
    message_id,
    owner_id: id,
  })
    .then((reaction) => {
      res.status(200).json(reaction);
    })
    .catch(() => {
      res.status(400).json({ message: 'Bad request' });
    });
};

const deleteMessageReaction = async (req: Request, res: Response) => {
  const { user } = res.locals;
  const { message_id, reaction_id } = req.params;

  MessageReactionModel.findOne({ where: { message_id } }).then((reaction) => {
    if (reaction && String(user.id) === reaction.owner_id) {
      MessageReactionModel.destroy({
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

export { getMessageReactions, postMessageReaction, deleteMessageReaction };
