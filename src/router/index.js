import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'

import LogIn from '@/views/logIn/LogIn.vue'
import Console from '@/Layout/index.vue'
import homePage from '@/views/homePage/index.vue'
import HomePicture from '@/views/HomePicture/index.vue'
import News from '@/views/News/index.vue'
import ProjectDisplay from '@/views/ProjectDisplay/index.vue'
import ScientificAchievement from '@/views/ScientificAchievement/index.vue'
import TeamMember from '@/views/TeamMember/index.vue'

Vue.use(Router)
Vue.prototype.$axios = axios;

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'logIn'  //路由重定向
    },
    {
      path: '/logIn',
      name: 'LogIn',
      component: LogIn
    },
    {
      path: '/console',
      name: 'console',
      component: Console,
      children: [
        {
          path: '/homePage',
          name: 'homePage',
          component: homePage,
        },
        {
          path: '/HomePicture',
          name: 'HomePicture',
          component: HomePicture,
        },
        {
          path: '/News',
          name: 'News',
          component: News,
        },
        {
          path: '/ProjectDisplay',
          name: 'ProjectDisplay',
          component: ProjectDisplay,
        },
        {
          path: '/ScientificAchievement',
          name: 'ScientificAchievement',
          component: ScientificAchievement,
        },
        {
          path: '/TeamMember',
          name: 'TeamMember',
          component: TeamMember,
        },
      ]
    }
  ]
})
