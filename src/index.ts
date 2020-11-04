import express, { Application } from 'express';
import routes from './routes/index';
import passport from 'passport';
import connect from './connect';

// Boot express
const app: Application = express();
const port = 8080;

passport.serializeUser(function(user, done): void {
  done(null, user);
});

passport.deserializeUser(function(user, done): void {
  done(null, user);
});

// Application config
app.use(passport.initialize());
app.use(passport.session());
routes(app);

const db = 'mongodb://root:example@localhost:27017/oauth?authSource=admin';
connect(db);

// Start server
app.listen(port, (): void => console.log(`Server is listening on port ${port} !`));
