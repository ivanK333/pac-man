import type { RequestHandler } from 'express';
import axios from 'axios';

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
          next();
        })
        .catch(() => {
          res.status(401).json({ message: 'cookie is not valid' });
          next();
        })
    : res.status(401).json({ message: 'Unauthorized' });
};
