// 1.引入创建路由需要的组件
import { defineAsyncComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
// import Login from '@/views/Login.vue'
// import Home from '@/views/Home.vue'
// import Register from '@/views/Register.vue'
// import Books from '@/views/Books.vue'
// import Book from '@/views/Book.vue'
// import Schedule from '@/views/Schedule.vue'
// import Robot from '@/views/Robot.vue'
// import Translation from '@/views/Translation.vue'
// import Portals from '@/views/Portals.vue'
// import Coding from '@/views/Coding.vue'
// import Setting from '@/views/Setting.vue'
// import Words from '@/views/Words.vue'
// import Chat from '@/views/Chat.vue'
const Login = defineAsyncComponent(() => {
    return import('@/views/Login.vue')
})
const Home = defineAsyncComponent(() => {
    return import('@/views/Home.vue')
})
const Register = defineAsyncComponent(() => {
    return import('@/views/Register.vue')
})
const Books = defineAsyncComponent(() => {
    return import('@/views/Books.vue')
})
const Empty = defineAsyncComponent(() => {
    return import('@/views/Empty.vue')
})
const Book = defineAsyncComponent(() => {
    return import('@/views/Book.vue')
})
const Schedule = defineAsyncComponent(() => {
    return import('@/views/Schedule.vue')
})
const Robot = defineAsyncComponent(() => {
    return import('@/views/Robot.vue')
})
const Translation = defineAsyncComponent(() => {
    return import('@/views/Translation.vue')
})
const Portals = defineAsyncComponent(() => {
    return import('@/views/Portals.vue')
})
const Coding = defineAsyncComponent(() => {
    return import('@/views/Coding.vue')
})
const Setting = defineAsyncComponent(() => {
    return import('@/views/Setting.vue')
})
const Words = defineAsyncComponent(() => {
    return import('@/views/Words.vue')
})
const Chat = defineAsyncComponent(() => {
    return import('@/views/Chat.vue')
})
const Board = defineAsyncComponent(() => {
    return import('@/views/Board.vue')
})
const Apps = defineAsyncComponent(() => {
    return import('@/views/Apps.vue')
})
// 2.配置系统所有路由页面，浏览器通过path路径加载对应组件
const routes = [
    {
        name: 'root',
        path: '/',
        redirect: '/home'
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
            },
            {
                path: '',
                component: Empty
            }
        ]
    },
    {
        name: 'book',
        path: '/book',
        component: Book,
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
    },
    {
        name: 'words',
        path: '/words',
        component: Words
    },
    {
        name: 'chat',
        path: '/chat',
        component: Chat
    },
    {
        name: 'board',
        path: '/board',
        component: Board
    },
    {
        name: 'apps',
        path: '/apps',
        component: Apps
    }
]

// 3.创建路由实例
const router = createRouter({
    history: createWebHashHistory(), //history模式使用 createWebHistory() 方法
    routes,
    scrollBehavior(to) {
        if (to.hash) {
            return {
                el: to.hash,
            }
        }
    }
})
// permission.js
router.beforeEach(async (to, from, next) => {
    console.log("route", to, from)
    next();
});

// 4.声明,为路由提供外部引用的入口
export default router

