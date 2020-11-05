import { Application } from 'express';

export interface Controller {
  initializeRoutes(app: Application): void;
}
