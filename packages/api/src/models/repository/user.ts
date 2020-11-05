import { ModelRepository } from '@/types/service';
import UserSchema, { User } from '@/models/user';
import { GithubUser } from '@/types';
import { injectable } from 'inversify';
import { OAuth } from '@/types/resources';
import { OAuthProviderTypes } from '@/types/enum';

@injectable()
export default class UserRepository implements ModelRepository {
  public async findOrCreate(user: GithubUser): Promise<User> {
    const fetchedUser = await UserSchema.findOne({ githubId: user.id });
    if (fetchedUser) {
      return fetchedUser;
    }

    const emails = user.emails.map(({ value }): string => value);
    return await UserSchema.create({
      githubId: user.id,
      emails,
      displayName: user.displayName,
      username: user.username,
      oauthProviders: [],
    });
  }

  public async addProvider(user: User, provider: OAuth): Promise<User> {
    if (!user.oauthProviders.some(({ provider }): boolean => provider === OAuthProviderTypes.GITHUB)) {
      user.oauthProviders.push(provider);
      await user.save();
    }
    return user;
  }
}
