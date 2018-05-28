import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

/* eslint-disable global-require, import/no-dynamic-require */
const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      name: 'login',
      path: '/login',
      component: resolve => require(['../components/page/Login.vue'], resolve),
    },
    {
      path: '/',
      redirect: '/news',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      children: [
        {
          name: 'layout',
          path: '/:type',
          component: resolve => require(['../components/page/contList.vue'], resolve),
        },
        {
          name: 'newsEditor',
          path: '/:type/newseditor',
          component: resolve => require(['../components/page/newsEditor.vue'], resolve),
        },
        {
          name: 'wcEditor',
          path: '/:type/wcEditor',
          component: resolve => require(['../components/page/wcEditor.vue'], resolve),
        },
        {
          name: 'jobEd',
          path: '/:type/jobEd',
          component: resolve => require(['../components/page/job.vue'], resolve),
        },
        {
          name: 'feiEd',
          path: '/:type/feiEd',
          component: resolve => require(['../components/page/fei.vue'], resolve),
        },
      ],
    },
    {
      name: 404,
      path: '*',
      redirect: '/news',
    },
  ],
});


export default router;
