import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store/store';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/admin',
      name: 'home',
      // @ts-ignore
      component: () => import(/* webpackChunkName: "admin" */ '@/views/admin/Home'),
      meta: {
        adminLayout: true,
        requireAuth: true,
      },
    },
    {
      path: '/',
      name: 'landing',
      // @ts-ignore
      component: () => import(/* webpackChunkName: "front" */ '@/views/front/Home'),
      meta: {
        requireAuth: false,
      },
    },
    {
      path: '/maintenance',
      name: 'maintenance',
      // @ts-ignore
      component: () => import(/* webpackChunkName: "front" */ '@/views/WorkInProgress'),
      meta: {
        requireAuth: false,
      },
      beforeEnter(to, from, next) {
        if (process.env.VUE_APP_MAINTENANCE === 'false') {
          next({ name: 'landing' });
        }
        next();
      },
    },
    {
      path: '/login',
      name: 'login',
      // @ts-ignore
      component: () => import(/* webpackChunkName: "login" */ '@/views/admin/Login'),
      meta: {
        adminLayout: true,
        requireAuth: false,
      },
    },
    {
      name: 'logout',
      path: '/logout',
      beforeEnter: async (to, from, next) => {
        await store.dispatch('auth/logout');
        next({ name: 'landing' });
      },
    },
    {
      path: '*',
      redirect: { name: 'landing' },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  await store.dispatch('auth/initStore');

  if (to.matched.some(record => record.meta.requireAuth) && !store.getters['auth/isUserLogged']) {
    // requireAuth && !userLogged => redirect to login
    next({ name: 'login' });
  } else if (to.matched.some(record => record.name === 'login') && store.getters['auth/isUserLogged']) {
    // is auth page && userLogged => redirect to home
    next({ name: 'home' });
  } else {
    // default case
    next();
  }
});

export default router;
