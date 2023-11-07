import type { RequestHandler } from 'express';
import axios from 'axios';

import UserModel from '../postgres/user/models/userModel';

const AUTH_ENDPOINT = 'https://ya-praktikum.tech/api/v2/auth/user';

export const auth: RequestHandler = (req, res, next) => {
  const cookies = req.headers.cookie;
  cookies
    ? axios
        .get(AUTH_ENDPOINT, {
          headers: { Cookie: cookies },
        })
        .then(({ data }) => {
          res.locals.user = data;
          if (!data) {
            res.status(401).json({ message: 'cookie is not valid' });
            next();
          }

          UserModel.findOrCreate({
            where: { id: String(data.id) },
            defaults: {
              id: String(data.id) as string,
              login: data.login as string,
              avatar: data.avatar as string,
            } as UserModel,
          }).then(() => {
            UserModel.update(
              {
                avatar: res.locals.user.avatar,
                login: res.locals.user.login,
              },
              {
                where: {
                  id: String(data.id),
                },
              },
            );
          });
          next();
        })
        .catch(() => {
          res.status(401).json({ message: 'cookie is not valid' });
          next();
        })
    : res.status(401).json({ message: 'Unauthorized' });
};
