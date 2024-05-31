// 1.引入创建路由需要的组件
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Books from '@/views/Books.vue'
import Book from '@/views/Book.vue'
import Schedule from '@/views/Schedule.vue'
// 2.配置系统所有路由页面，浏览器通过path路径加载对应组件
const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/books',
        component: Books,
        children: [
            {
                path: ':id',
                component: Book
            }
        ]
    },
    {
        path: '/schedule',
        component: Schedule
    }
]

// 3.创建路由实例
const router = createRouter({
    history: createWebHistory(), //使用history模式，hash模式使用 createWebHashHistory() 方法
    routes,
    scrollBehavior(to) {
        if (to.hash) {
          return {
            el: to.hash,
          }
        }
    }
})

// 4.声明,为路由提供外部引用的入口
export default router

