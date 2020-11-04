import { Application, Request, Response } from 'express';
import PassportMiddleware from '../middleware/passport';

export default (app: Application): void => {
  app.get('/hello', (req: Request, res: Response): void => {
    if (!req.user) {
      res.redirect('/');
    }
    res.json(req.user);
  });

  app.get('/', (req: Request, res: Response): void => {
    res.json({ message: 'Hello' });
  });

  app.get('/github/auth', PassportMiddleware.authenticate('github', { scope: ['user'] }));

  app.get('/github/auth/callback', PassportMiddleware.authenticate('github', { failureRedirect: '/login' }), function(
    req,
    res,
  ): void {
    // Successful authentication, redirect home.
    res.redirect('/hello');
  });
};
