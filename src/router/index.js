import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: () => import('@/views/Login') },
  {
    path: '/home',
    component: () => import('@/views/Home'),
    meta: {
      title: '用户管理'
    },
    children: [
      {
        path: '/users',
        component: () => import('@/views/Home/Users'),
        meta: {
          title: '用户列表'
        }
      },
      {
        path: '/roles',
        component: () => import('@/views/Home/Roles'),
        meta: {
          title: '权限管理'
        }
      },
      {
        path: '/rights',
        component: () => import('@/views/Home/Rights'),
        meta: {
          title: '权限列表'
        }
      },
      {
        path: '/goods',
        component: () => import('@/views/Home/Goods'),
        meta: {
          title: '商品列表'
        }
      },
      {
        path: '/params',
        component: () => import('@/views/Home/Params'),
        meta: {
          title: '分类参数'
        }
      },
      {
        path: '/categories',
        component: () => import('@/views/Home/Categories'),
        meta: {
          title: '商品分类'
        }
      },
      {
        path: '/orders',
        component: () => import('@/views/Home/Orders'),
        meta: {
          title: '订单列表'
        }
      },
      {
        path: '/reports',
        component: () => import('@/views/Home/Reports'),
        meta: {
          title: '数据报表'
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
