import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/home',
      redirect: '/home/news',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      children: [
        {
          name: 'layout',
          path: '/home/:type',
          component: resolve => require(['../components/page/contList.vue'], resolve),
        },
        {
          name: 'newsEditor',
          path: '/:type/newseditor',
          component: resolve => require(['../components/page/newsEditor.vue'], resolve),
        },
        // {
        //   path: '/sun',
        //   component: resolve => require(['../components/page/contList.vue'], resolve),
        // },
        // {
        //   path: '/bashi',
        //   component: resolve => require(['../components/page/contList.vue'], resolve),
        // },
        {
          name: 'wcEditor',
          path: '/:type/wcEditor',
          component: resolve => require(['../components/page/wcEditor.vue'], resolve),
        },
        // {
        //   path: '/zhaop',
        //   component: resolve => require(['../components/page/contList.vue'], resolve),
        // },
        {
          name: 'jobEd',
          path: '/:type/jobEd',
          component: resolve => require(['../components/page/job.vue'], resolve),
        },
        // {
        //   path: '/fei',
        //   component: resolve => require(['../components/page/contList.vue'], resolve),
        // },
        {
          name: 'feiEd',
          path: '/:type/feiEd',
          component: resolve => require(['../components/page/fei.vue'], resolve),
        },
        // {
        //   path: '/video',
        //   component: resolve => require(['../components/page/contList.vue'], resolve),
        // },
      ],
    },
    {
      name: 'login',
      path: '/login',
      component: resolve => require(['../components/page/Login.vue'], resolve),
    },
    {
      name: 404,
      path: '*',
      redirect: '/news',
    },
  ],
});

router.beforeEach((t, f, n) => {
  console.log(t, 'gffdgfd');
  n();
});


export default router;
