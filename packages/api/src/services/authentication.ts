import jwt from 'jsonwebtoken';
import { User } from '@/models/user';
import config from '@config/authorization';
import { injectable } from 'inversify';

export type JsonWebToken = string;

@injectable()
export default class AuthenticationService {
  public generateJWT(user: User): JsonWebToken {
    return jwt.sign(user, config.secret, { expiresIn: config.ttl });
  }
}
