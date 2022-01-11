import { createRouter, createWebHashHistory } from 'vue-router'

import Landingpage from '@/views/Landingpage.vue'
import Groupomania from '@/views/Groupomania.vue'

import Home from '@/components/home/Home.vue'
import Profile from '@/components/profile/Profile.vue'
import Posts from '@/components/post/Post.vue'
import Login from '@/components/landingpage/Login.vue'
import Register from '@/components/landingpage/Register.vue'

const routes = [
  {
    path: '/', 
    component: Landingpage, 
    children: [
    {
      path: '/', component: Login
    },
    {
      path: '/register', component: Register
    }
  ]
},
  {
    path: '/home', 
    component: Groupomania,
    name: 'home',
    meta: { requiresAuth: true },
    children: [
      {
        path: '/home', component: Home, name: 'home'
      },
      {
        path: '/profile/:username', name: 'profile', component: Profile, props: true
      },
      {
        path: '/post/:id', name: 'post', component: Posts, props: true
      }
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach( async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const user = await fetch('http://localhost:3000/' + 'api/user/auth', {
      headers: {'Content-Type': 'application/json'},
      credentials: 'include'
    })
    if (user.status != 200) {
      next({
        path: '/',
      })
    } else {
      next()
    }
  } else {
    next() 
  }
})

export default router
