import { ActionTree, GetterTree, MutationTree } from 'vuex';
import { User } from '@/types/entity';
import { container } from '@/container';
import { COOKIE_SERVICE, USER_API } from '@/container/types';
import UserApi, { UserCredentials, UserToken } from '@/services/api/User';
import { CookiesService } from '@/services/cookies-service';

type AuthState = {
  user:
    | {
        logged: true;
        token: string;
        user: User;
      }
    | {
        logged: false;
        token: null;
        user: null;
      };
  initialized: boolean;
};

const authState: AuthState = {
  user: {
    logged: false,
    token: null,
    user: null,
  },
  initialized: false,
};

const mutations: MutationTree<AuthState> = {
  INIT: (state, { user }) => {
    state.user = user;
    state.initialized = true;
  },
  LOGIN: (state, token: UserToken) => {
    state.user.logged = true;
    state.user.token = token.token;
    state.user.user = User.fromToken(token.token);
  },
  LOGOUT: (state) => {
    state.user.logged = false;
    state.user.token = null;
    state.user.user = null;
  },
};

const actions: ActionTree<AuthState, AuthState> = {
  initStore({ state, commit }) {
    if (!state.initialized) {
      const token = container.get<CookiesService>(COOKIE_SERVICE).get('token');
      commit('INIT', { user: { token, logged: !!token, user: User.fromToken(token) } });
    }
  },
  async login({ commit, state }, credentials: UserCredentials) {
    if (state.user.token) {
      return { status: true };
    }

    const result = await container.get<UserApi>(USER_API).login(credentials);

    if (result.status) {
      container.get<CookiesService>(COOKIE_SERVICE).set('token', result.data.token);
      commit('LOGIN', result.data);
    }

    return result;
  },
  async logout({ commit }) {
    container.get<CookiesService>(COOKIE_SERVICE).remove('token');
    commit('LOGOUT');
  },
};

const getters: GetterTree<AuthState, any> = {
  getUser: (state) => state.user.user,
  getToken: (state) => state.user.token,
  isUserLogged: (state) => state.user.logged,
};

export default {
  namespaced: true,
  state: authState,
  mutations,
  actions,
  getters,
};
