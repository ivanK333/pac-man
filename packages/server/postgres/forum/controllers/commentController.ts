import type { Request, Response } from 'express';
import { Sequelize } from 'sequelize-typescript';

import CommentModel from '../models/commentModel';
import UserModel from '../../user/models/userModel';

const getComments = (req: Request, res: Response) => {
  const { message_id } = req.params;

  CommentModel.findAll({
    where: {
      message_id,
    },
    order: [[Sequelize.col('createdAt'), 'ASC']],
    include: [
      {
        model: UserModel,
      },
    ],
  })
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch(() => {
      res.status(400).json({ message: 'Bad request' });
    });
};
const postComment = (req: Request, res: Response) => {
  const { message_id } = req.params;
  const { user } = res.locals;
  const { id } = user;

  CommentModel.create({
    ...req.body,
    owner_id: id,
    message_id,
  })
    .then((comment) => {
      CommentModel.findOne({
        where: {
          id: comment.id,
        },
        include: {
          model: UserModel,
        },
      })
        .then((comment) => {
          res.status(200).json(comment);
        })
        .catch(() => {
          res.status(400).json({ message: 'Bad request' });
        });
    })
    .catch(() => {
      res.status(400).json({ message: 'Bad request' });
    });
};

const updateComment = (req: Request, res: Response) => {
  const { id } = req.params;
  const { user } = res.locals;

  CommentModel.findOne({ where: { id } }).then((comment) => {
    if (comment && String(user.id) === comment.owner_id) {
      CommentModel.update(
        {
          ...req.body,
        },
        {
          where: { id },
        },
      )
        .then(() => {
          CommentModel.findOne({
            where: {
              id,
            },
            include: {
              model: UserModel,
            },
          })
            .then((comment) => {
              res.status(200).json(comment);
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
const deleteComment = (req: Request, res: Response) => {
  const { id } = req.params;
  const { user } = res.locals;

  CommentModel.findOne({ where: { id } }).then((comment) => {
    if (comment && String(user.id) === comment.owner_id) {
      CommentModel.destroy({
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
  });
};

export { getComments, postComment, updateComment, deleteComment };
