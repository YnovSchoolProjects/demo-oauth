import 'reflect-metadata';
import { API_CLIENT, API_URL, COOKIE_SERVICE, MEDIA_API, TAG_API, USER_API } from '@/container/types';
import { ApiClient } from '@/services/api-client';
import { Container } from 'inversify';
import { CookiesService } from '@/services/cookies-service';

const container = new Container();

container.bind<string>(API_URL).toConstantValue(process.env.VUE_APP_API_ENDPOINT as string);
container.bind<ApiClient>(API_CLIENT).to(ApiClient);
container.bind<UserApi>(USER_API).to(UserApi);
container.bind<MediaApi>(MEDIA_API).to(MediaApi);
container.bind<TagApi>(TAG_API).to(TagApi);
container.bind<CookiesService>(COOKIE_SERVICE).to(CookiesService);

export { container };
