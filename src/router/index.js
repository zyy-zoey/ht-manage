import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: () => import('@/views/Login') },
  {
    path: '/home',
    component: () => import('@/views/Home'),
    require: '/home',
    meta: {
      title: '用户管理'
    },
    children: [
      {
        path: '/users',
        component: () => import('@/views/Users'),
        meta: {
          title: '用户列表'
        }
      },
      {
        path: '/roles',
        component: () => import('@/views/Roles'),
        meta: {
          title: '权限管理'
        }
      },
      {
        path: '/rights',
        component: () => import('@/views/Rights'),
        meta: {
          title: '权限列表'
        }
      },
      {
        path: '/goods',
        component: () => import('@/views/Goods'),
        meta: {
          title: '商品列表'
        }
      },
      {
        path: '/params',
        component: () => import('@/views/Params'),
        meta: {
          title: '分类参数'
        }
      },
      {
        path: '/categories',
        component: () => import('@/views/Categories'),
        meta: {
          title: '商品分类'
        }
      },
      {
        path: '/orders',
        component: () => import('@/views/Orders'),
        meta: {
          title: '订单列表'
        }
      },
      {
        path: '/reports',
        component: () => import('@/views/Reports'),
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
