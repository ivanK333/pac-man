import type { RequestHandler } from 'express';
import axios from 'axios';

const AUTH_ENDPOINT = 'https://ya-praktikum.tech/api/v2/auth/user';

export const auth: RequestHandler = (req, res, next) => {
  const cookies = req.headers.cookie;
  console.log(cookies);
  cookies
    ? axios
        .get(AUTH_ENDPOINT, {
          headers: { Cookie: cookies },
        })
        .then(({ data }) => {
          res.locals.user = data;
          next();
        })
        .catch((error) => {
          console.log('ERROR:', error.message);
          next();
        })
    : next();
};
