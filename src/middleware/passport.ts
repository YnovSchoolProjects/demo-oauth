import passport from 'passport';
import { Strategy as GithubStrategy } from 'passport-github2';
import UserSchema from '../models/user';

interface GithubUser {
  id: string;
  emails: [
    {
      value: string;
    },
  ];
  displayName: string;
  username: string;
}

passport.serializeUser(function(user, done): void {
  done(null, user);
});

passport.deserializeUser(function(user, done): void {
  done(null, user);
});

passport.use(
  new GithubStrategy(
    {
      clientID: 'e72b5e154db6e4fef668',
      clientSecret: '3fa6dbd3ca7e72c9e17987a968cd2f6beb28e4d0',
      callbackURL: 'http://localhost:8080/github/auth/callback',
    },
    async function(accessToken: string, refreshToken: string, profile: GithubUser, done: Function): Promise<void> {
      try {
        const user = await UserSchema.findOne({ githubId: profile.id });
        done(null, user);
      } catch (e) {
        const emails = profile.emails.map(({ value }): string => value);
        const user = await UserSchema.create({
          githubId: profile.id,
          emails: emails,
          displayName: profile.displayName,
          username: profile.username,
        });
        done(null, user);
      }
    },
  ),
);

export default passport;
