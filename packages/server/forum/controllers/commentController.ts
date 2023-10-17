import type { Request, Response } from 'express';
import { Sequelize } from 'sequelize-typescript';

import CommentModel from '../models/commentModel';

const getComments = (req: Request, res: Response) => {
  const { message_id } = req.params;

  CommentModel.findAll({
    where: {
      message_id,
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
const postComment = (req: Request, res: Response) => {
  const { message_id } = req.params;
  const { user } = res.locals;
  const { id, login, avatar } = user;

  CommentModel.create({
    ...req.body,
    owner_avatar: avatar,
    owner_id: id,
    owner_login: login,
    message_id,
  })
    .then((comment) => {
      res.status(200).json(comment);
    })
    .catch(() => {
      res.status(400).json({ message: 'Bad request' });
    });
};

const updateComment = (req: Request, res: Response) => {
  const { id } = req.params;
  const { user } = res.locals;
  const { login, avatar } = user;

  CommentModel.findOne({ where: { id } }).then((comment) => {
    if (comment && String(user.id) === comment.owner_id) {
      CommentModel.update(
        {
          ...req.body,
          owner_avatar: avatar,
          owner_id: user.id,
          owner_login: login,
        },
        { where: { id }, returning: true },
      )
        .then((comment) => {
          res.status(200).json(comment[1][0]);
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
