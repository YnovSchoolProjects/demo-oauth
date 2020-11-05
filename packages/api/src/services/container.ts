import 'reflect-metadata';
import { ApiClient } from '@/services/api-client';
import { Container } from 'inversify';
import UserRepository from '@/models/repository/user';
import AuthenticationService from '@/services/authentication';

export const API_CLIENT = Symbol('API_CLIENT');
export const USER_REPOSITORY = Symbol('USER_REPOSITORY');
export const AUTHENTICATION_SERVICE = Symbol('AUTHENTICATION_SERVICE');

const container = new Container();

container.bind<ApiClient>(API_CLIENT).to(ApiClient);
container.bind<UserRepository>(USER_REPOSITORY).to(UserRepository);
container.bind<AuthenticationService>(AUTHENTICATION_SERVICE).to(AuthenticationService);

export { container };
