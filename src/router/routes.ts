import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/PathPickPage.vue') },
      { path: '/home', component: () => import('../pages/HomePage.vue') },
      {
        path: '/login',
        component: () => import('../pages/LoginPage.vue'),
      },
      {
        path: '/register',
        component: () => import('../pages/RegisterPage.vue'),
      },
      {
        path: '/categories',
        component: () => import('../pages/CategoryPage.vue'),
      },
      {
        path: '/playlists',
        component: () => import('../pages/PlaylistPage.vue'),
      },
      { path: '/help', component: () => import('../pages/HelpPage.vue') },
      { path: '/profile', component: () => import('../pages/ProfilePage.vue') },
      {
        path: '/feedback',
        component: () => import('../pages/FeedbackPage.vue'),
      },
      { path: '/contact', component: () => import('../pages/ContactPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
