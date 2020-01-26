import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: '/disk/mydisk'
  },
  {
    path: '/disk',
    component: () => import('../layouts/main/Main.vue'),
    children:[
      
      {
        path: 'mydisk',
        name : 'MyDisk',
        component: () => import('../views/MyDisk.vue'),
        // beforeEnter: (to, from, next) => {
        //   // ...
        // }
      },
      {
        path: 'folder/:fid',
        name : 'Folder',
        component: () => import('../views/MyDisk.vue')
      },
      {
        path: 'recents',
        name : 'Recents',
        component: () => import('../views/Recents.vue')
      },
      {
        path: 'starred',
        name : 'Starred',
        component: () => import('../views/Starred.vue')
      },
      {
        path: 'trash',
        name : 'Trash',
        component: () => import('../views/Trash.vue')
      },
      {
        path: 'documents',
        name : 'Documents',
        component: () => import('../views/Documents.vue')
      },
      {
        path: 'images',
        name : 'Images',
        component: () => import('../views/Images.vue')
      },
      {
        path: 'videos',
        name : 'Videos',
        component: () => import('../views/Videos.vue')
      },
      {
        path: 'audios',
        name : 'Audios',
        component: () => import('../views/Audios.vue')
      },
      {
        path: 'zip',
        name : 'Zip',
        component: () => import('../views/Zip.vue')
      },
      
      
    ]
  },
  {
    path: '',
    component: () => import('../layouts/full-page/FullPage.vue'),
    children:[
      {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue')
      },
      {
        path: "*",
        name: 'NotFound',
        component: () => import('../views/NotFound.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
