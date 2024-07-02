// 1.引入创建路由需要的组件
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Register from '@/views/Register.vue'
import Books from '@/views/Books.vue'
import Book from '@/views/Book.vue'
import Schedule from '@/views/Schedule.vue'
import Robot from '@/views/Robot.vue'
import Translation from '@/views/Translation.vue'
import Portals from '@/views/Portals.vue'
import Coding from '@/views/Coding.vue'
import Setting from '@/views/Setting.vue'
// 2.配置系统所有路由页面，浏览器通过path路径加载对应组件
const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        name: 'login',
        path: '/login',
        component: Login
    },
    {
        name: 'home',
        path: '/home',
        component: Home
    },
    {
        name: 'register',
        path: '/register',
        component: Register
    },
    {
        name: 'books',
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
        name: 'schedule',
        path: '/schedule',
        component: Schedule
    },
    {
        name: 'robot',
        path: '/robot',
        component: Robot
    },
    {
        name: 'translation',
        path: '/translation',
        component: Translation
    },
    {
        name: 'portals',
        path: '/portals',
        component: Portals
    },
    {
        name: 'coding',
        path: '/coding',
        component: Coding
    },
    {
        name: 'setting',
        path: '/setting',
        component: Setting
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

