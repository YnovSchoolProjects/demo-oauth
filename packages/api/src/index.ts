import App from './app';
import GithubOAuthController from './controllers/github-oauth-controller';
import HomeController from './controllers/home-controller';
import connect from './connect';
import dotenv from 'dotenv';

dotenv.config();

const controllers = [new GithubOAuthController(), new HomeController()];
const app = new App({ port: parseInt(`${process.env.APP_PORT}`, 10), controllers });

connect(process.env.MONGO_DSN as string);

app.listen();
