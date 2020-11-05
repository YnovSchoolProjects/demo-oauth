import { Application, Request, Response } from 'express';
import { Controller } from './index';
import axios from 'axios';
import { GithubKeysResource, MinifiedGithubKeysResource } from '../resources/github-keys-resource';

class HomeController implements Controller {
  public path = '/';

  public initializeRoutes(app: Application): void {
    app.get(`${this.path}hello`, this.handleHelloRoute);
    app.get(this.path, this.handleRootRoute);
  }

  private handleHelloRoute = async (req: Request, res: Response): Promise<void> => {
    console.log(req.user);
    if (!req.user) {
      res.redirect(this.path);
      return;
    }

    try {
      const keys = await axios.get<GithubKeysResource[]>(`https://api.github.com/user/keys`, {
        // @ts-ignore
        headers: { Authorization: `token ${req.user.accessToken}` },
      });

      let formattedKeys = keys.data.map(
        ({ id, url, title }): MinifiedGithubKeysResource => ({
          id,
          url,
          title,
        }),
      );

      // @ts-ignore
      res.status(200).json([req.user.user, formattedKeys]);
    } catch ({ message }) {
      res.status(500).json({ message });
    }
  };

  private handleRootRoute = (req: Request, res: Response): void => {
    res.render('index', { message: 'Hello from demo' });
  };
}

export default HomeController;
