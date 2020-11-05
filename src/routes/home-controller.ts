import { Application, Request, Response } from 'express';
import { Controller } from './index';

class HomeController implements Controller {
  public path = '/';

  public initializeRoutes(app: Application): void {
    app.get(`${this.path}hello`, this.handleHelloRoute);
    app.get(this.path, this.handleRootRoute);
  }

  private handleHelloRoute = (req: Request, res: Response): void => {
    console.log(req.user);
    if (!req.user) {
      res.redirect(this.path);
    }
    res.json(req.user);
  };

  private handleRootRoute = (req: Request, res: Response): void => {
    res.json({ message: 'Hello' });
  };
}

export default HomeController;
