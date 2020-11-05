import { API_CLIENT, COOKIE_SERVICE } from '@/container/types';
import Vue from 'vue';
import { container } from '@/container';

Vue.prototype.$container = container;
Vue.prototype.$apiClient = container.get(API_CLIENT);
Vue.prototype.$cookies = container.get(COOKIE_SERVICE);
