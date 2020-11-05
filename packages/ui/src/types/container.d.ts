import { ApiClient } from '@/utils/api-client';
import { CookiesService } from '@/services/cookies-service';

declare module 'vue/types/vue' {
  interface Vue {
    $container: typeof import('@/container').container;
    $cookies: CookiesService;
    $apiClient: ApiClient;
  }
}
