import type { RequestHandler } from 'express';

//import axios from 'axios';

//const AUTH_ENDPOINT = 'https://ya-praktikum.tech/api/v2/auth/user';

export const auth: RequestHandler = (req, _, next) => {
  const cookies = req.headers;
  console.log(cookies);
  /*axios
    .get(AUTH_ENDPOINT, {
      headers: { Cookie: cookies },
    })
    .then(({ data }) => {
      res.locals.user = data;
      console.log(data);
    })
    .catch((error) => {
      console.log('ERROR:', error.message);
    });*/
  next();
};
