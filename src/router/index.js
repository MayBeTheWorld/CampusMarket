import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/home/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/cartList',
    name: 'CartList',
    component: () => import(/* webpackChunkName: "cartList" */'../views/cartList/CartList.vue')
  }, {
    path: '/orderConfirmation/:id',
    name: 'OrderConfirmation',
    component: () => import(/* webpackChunkName: "orderConfirmation" */'../views/orderConfirmation/OrderConfirmation.vue')
  }, {
    path: '/orderList',
    name: 'OrderList',
    component: () => import(/* webpackChunkName: "orderList" */'../views/orderList/OrderList.vue')
  }, {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */'../views/login/Login.vue'),
    beforeEnter: (to, from, next) => {
      // 只有当你访问此页面时beforeEnter才执行
      const { isLogin } = localStorage
      // 登录状态不允许访问此页面
      isLogin ? next({ name: 'Home' }) : next()
    }
  }, {
    path: '/register',
    name: 'Register',
    // import内的注册可以定义加载时包的名字
    component: () => import(/* webpackChunkName: "register" */'../views/register/Register.vue'),
    beforeEnter: (to, from, next) => {
      const { isLogin } = localStorage
      isLogin ? next({ name: 'Home' }) : next()
    }
  }, {
    path: '/shop/:id',
    name: 'Shop',
    component: () => import(/* webpackChunkName: "shop" */'../views/shop/Shop.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 路由守卫,beforeEach每次路由跳转之前执行的方法;to为将去往的页面，from为 跳转前的页面
router.beforeEach((to, from, next) => {
  // 解构赋值
  const { isLogin } = localStorage
  const { name } = to
  const isLoginOrRegister = (name === 'Login' || name === 'Register');
  // 跳转登录或者注册页面时不用校验isLogin
  (isLogin || isLoginOrRegister) ? next() : next({ name: 'Login' })
})

export default router
