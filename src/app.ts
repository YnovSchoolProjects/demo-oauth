import express from 'express';
import { Application } from 'express';
import session from 'express-session';
import passport from 'passport';
import morgan from 'morgan';
import { Controller } from './routes';

class App {
  public app: Application;
  public port: number;

  public constructor({ port, controllers }: { port: number; controllers: Controller[] }) {
    this.app = express();
    this.port = port;

    this.bootstrapMiddlewares();
    this.bootstrapRoutes(controllers);
    // this.assets();
    // this.template();
  }

  private bootstrapMiddlewares(): void {
    this.app.use(session({ secret: 'oauth-demo-session' }));
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
  }

  private bootstrapRoutes(controllers: Controller[]): void {
    controllers.forEach((controller): void => {
      controller.initializeRoutes(this.app);
    });
  }

  private assets(): void {
    this.app.use(express.static('public'));
    this.app.use(express.static('views'));
  }

  private template(): void {
    this.app.set('view engine', 'pug');
  }

  public listen(): void {
    this.app.listen(this.port, (): void => {
      console.log(`App listening on the http://localhost:${this.port}`);
    });
  }
}

export default App;
