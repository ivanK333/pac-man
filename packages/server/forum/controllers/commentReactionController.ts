import type { Request, Response } from 'express';
import { Sequelize } from 'sequelize-typescript';

import CommentReactionModel from '../models/commentReactionModel';

const getCommentReactions = async (req: Request, res: Response) => {
  const { comment_id } = req.params;

  CommentReactionModel.findAll({
    where: { comment_id },
    order: [[Sequelize.col('createdAt'), 'DESC']],
  })
    .then((reaction) => {
      res.status(200).send(reaction);
    })
    .catch(() => {
      res.status(400).json({ message: 'Bad request' });
    });
};

const postCommentReaction = async (req: Request, res: Response) => {
  const { user } = res.locals;
  const { id } = user;
  const { comment_id } = req.params;

  CommentReactionModel.create({
    ...req.body,
    comment_id,
    owner_id: id,
  })
    .then((reaction) => {
      res.status(200).json(reaction);
    })
    .catch(() => {
      res.status(400).json({ message: 'Bad request' });
    });
};

const deleteCommentReaction = async (req: Request, res: Response) => {
  const { user } = res.locals;
  const { comment_id, reaction_id } = req.params;

  CommentReactionModel.findOne({ where: { comment_id } }).then((reaction) => {
    if (reaction && String(user.id) === reaction.owner_id) {
      CommentReactionModel.destroy({
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

export { getCommentReactions, postCommentReaction, deleteCommentReaction };
