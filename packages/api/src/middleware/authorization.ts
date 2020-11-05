import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import config from '@config/authorization';
import { constants } from 'http2';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const [header, bearer, token] = authHeader.split(' ');
    jwt.verify(token, config.secret, (err, user): void => {
      if (err) {
        res.sendStatus(constants.HTTP_STATUS_FORBIDDEN);
        return;
      }

      req.user = user;
      return next();
    });
  } else {
    res.sendStatus(constants.HTTP_STATUS_UNAUTHORIZED);
  }
};
