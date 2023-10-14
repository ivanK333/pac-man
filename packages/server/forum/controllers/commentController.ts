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

  CommentModel.create({
    ...req.body,
    owner_avatar: 'TEST AVATAR',
    owner_id: 'TEST ID',
    owner_login: 'TEST LOGIN',
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

  CommentModel.update(
    {
      ...req.body,
      owner_avatar: 'SUPERTEST AVATAR',
      owner_id: 'SUPERTEST ID',
      owner_login: 'SUPERTEST LOGIN',
    },
    { where: { id }, returning: true },
  )
    .then((comment) => {
      res.status(200).json(comment[1][0]);
    })
    .catch(() => {
      res.status(400).json({ message: 'Bad request' });
    });
};
const deleteComment = (req: Request, res: Response) => {
  const { id } = req.params;

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
};

export { getComments, postComment, updateComment, deleteComment };
