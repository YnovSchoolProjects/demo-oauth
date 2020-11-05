import App from './app';
import GithubOAuthController from './controllers/github-oauth-controller';
import HomeController from './controllers/home-controller';
import connect from './connect';

const controllers = [new GithubOAuthController(), new HomeController()];
const app = new App({ port: 8080, controllers });

const db = 'mongodb://root:example@localhost:27017/oauth?authSource=admin';
connect(db);

app.listen();
