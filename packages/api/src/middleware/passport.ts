import passport from 'passport';
import { Strategy as GithubStrategy } from 'passport-github2';
import { GithubUser } from '@/types';
import { AUTHENTICATION_SERVICE, container, USER_REPOSITORY } from '@/services/container';
import AuthenticationService from '@/services/authentication';
import UserRepository from '@/models/repository/user';
import { OAuthProviderTypes } from '@/types/enum';

passport.serializeUser((user, done): void => {
  done(null, user);
});

passport.deserializeUser((user, done): void => {
  done(null, user);
});

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      callbackURL: process.env.GITHUB_CALLBACK_URL as string,
    },
    async (accessToken: string, refreshToken: string, profile: GithubUser, done: Function): Promise<void> => {
      const userRepository = container.get<UserRepository>(USER_REPOSITORY);
      const authenticationService = container.get<AuthenticationService>(AUTHENTICATION_SERVICE);

      const user = await userRepository.findOrCreate(profile);
      await userRepository.addProvider(user, { accessToken, refreshToken, provider: OAuthProviderTypes.GITHUB });
      const token = authenticationService.generateJWT(user);

      done(null, { token, user });
    },
  ),
);

export default passport;
