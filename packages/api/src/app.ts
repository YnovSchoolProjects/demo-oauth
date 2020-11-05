import express, { Application } from 'express';
import passport from 'passport';
import morgan from 'morgan';
import { Controller } from './types';

class App {
  public app: Application;
  public port: number;

  public constructor({ port, controllers }: { port: number; controllers: Controller[] }) {
    this.app = express();
    this.port = port;

    this.bootstrapMiddlewares();
    this.bootstrapRoutes(controllers);
  }

  private bootstrapMiddlewares(): void {
    this.app.use(passport.initialize());
    this.app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
  }

  private bootstrapRoutes(controllers: Controller[]): void {
    controllers.forEach((controller): void => {
      controller.initializeRoutes(this.app);
    });
  }

  public listen(): void {
    this.app.listen(this.port, (): void => {
      console.log(`App listening on the http://localhost:${this.port}`);
    });
  }
}

export default App;
