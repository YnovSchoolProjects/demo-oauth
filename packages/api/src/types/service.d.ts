import { Application } from 'express';
import { User } from '@/models/user';
import { GithubUser } from '@/types/resources';

export interface Controller {
  initializeRoutes(app: Application): void;
}

export interface ModelRepository {
  findOrCreate(user: GithubUser): Promise<User>;
}
