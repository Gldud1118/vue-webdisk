import Vue from 'vue'
import VueRouter from 'vue-router';
import store from '@/store';

Vue.use(VueRouter);

const requireAuth = (to, from, next) => {
  const loginPath = `/login?rPath=${encodeURIComponent(to.path)}`
  store.getters.isAuth ? next() : next(loginPath)
}

const routes = [
  {
    path: "/",
    redirect: '/disk/mydisk',
    beforeEnter: requireAuth
  },
  {
    path: '/test',
    component: () => import('../layouts/main/Main.vue'),
    beforeEnter: requireAuth,
  },
  {
    path: '/disk',
    component: () => import('../layouts/main/Main.vue'),
    beforeEnter: requireAuth,
    children:[
      
      {
        path: 'mydisk',
        name : 'MyDisk',
        component: () => import('../views/Folder.vue')
      },
      {
        path: `folder/${store.state.rootFolderId}`,
        name : 'MyDisk',
        component: () => import('../views/Folder.vue'),
        redirect: '/disk/mydisk'
      },
      {
        path: 'folder/:fid',
        name : 'Folder',
        component: () => import('../views/Folder.vue'),
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
        component: () => import('../views/FileLibrary.vue')
      },
      {
        path: 'images',
        name : 'Images',
        component: () => import('../views/FileLibrary.vue')
      },
      {
        path: 'videos',
        name : 'Videos',
        component: () => import('../views/FileLibrary.vue')
      },
      {
        path: 'audios',
        name : 'Audios',
        component: () => import('../views/FileLibrary.vue')
      },
      {
        path: 'zip',
        name : 'Zip',
        component: () => import('../views/FileLibrary.vue')
      },
      {
        path: 'search',
        name : 'Search',
        component: () => import('../views/Search.vue')
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
