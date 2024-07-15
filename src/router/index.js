import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        { path: "", name: "index", component: () => import("../views/HomeChild.vue") },
        { path: "/productlist", name: 'ProductList', component: () => import("../views/ProductList.vue") },
        { path: "/orderlist", name: 'OrderList', component: () => import("../views/OrderList.vue") },
        { path: "/couponlist", name: 'ConponList', component: () => import("../views/CouponList.vue") },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../components/CouponModal.vue')
    },
  ]
})

export default router
