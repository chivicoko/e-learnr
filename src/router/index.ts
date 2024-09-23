import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/course-list',
      name: 'course-list',
      component: () => import('../views/CourseListView.vue')
    },
    {
      path: '/course-list/:departmentId/courses',
      name: 'course',
      component: () => import('../views/CourseView.vue')
    },
    {
      path: '/course-list/:departmentId/courses/:courseId',
      name: 'course-option',
      component: () => import('../views/CourseOptionView.vue')
    },
    {
      path: '/error',
      name: 'error-page',
      component: () => import('../views/ErrorPageView.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue')
    },
  ]
});

router.onError((error) => {
  console.error('Router error:', error);
  router.push('/error');
});

export default router
