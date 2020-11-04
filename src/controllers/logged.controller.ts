import * as express from 'express';
import { Request, Response } from 'express';
import ControllerBase from '../interfaces/ControllerBase.interface';

class LoggedController implements ControllerBase {
  public path = '/';
  public router = express.Router();

  private constructor() {
    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.get('/logged', this.index);
  }

  public index = (req: Request, res: Response): void => {
    const users = {}; //FindLastOne or else
    res.render('home/index', { users });
  };
}

export default LoggedController;
