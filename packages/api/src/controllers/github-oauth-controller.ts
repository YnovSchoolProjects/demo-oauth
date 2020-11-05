import { Application, Request, Response } from 'express';
import PassportMiddleware from '../middleware/passport';
import { Controller } from '@/types';

class GithubOAuthController implements Controller {
  public path = '/github/auth';

  public initializeRoutes(app: Application): void {
    app.get('/github/auth', PassportMiddleware.authenticate('github', { scope: ['user', 'read:public_key'] }));

    app.get(
      `${this.path}/callback`,
      PassportMiddleware.authenticate('github', { failureRedirect: '/login' }),
      this.authenticationSuccess,
    );
  }

  private authenticationSuccess = (req: Request, res: Response): void => {
    // Successful authentication, redirect home.
    res.redirect('/hello');
  };
}

export default GithubOAuthController;
