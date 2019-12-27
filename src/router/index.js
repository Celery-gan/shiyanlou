import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Common from '../views/common/Common'

Vue.use(VueRouter)
const routes = [
    // 首页
    {
        path: '/',
        component: Common,
        children: [{
            path: '',
            name: 'Home',
            component: Home,
            meta: {
                title: "首页",
                isMeta: true
            },
        }]
    },
    // 退出系统  logout
    {
        path: '/logout',
        component: Common,
        children: [{
            path: '',
            name: 'logout',
            component: () =>
                import ('../views/login/Logout'),
            meta: {
                title: "退出系统",
                isMeta: true
            },
        }]
    },
    // 登录页
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('../views/login/Login'),
        meta: {
            title: "登录",
            isMeta: true
        },
    },
    // 注册页
    {
        path: '/register',
        name: 'register',
        component: () =>
            import ('../views/login/Register'),
        meta: {
            title: "注册",
            isMeta: true
        },
    },
    // 导航路
    {
        path: '/test1',
        name: 'test1',
        component: () =>
            import ('../views/maps/Test1'),
        meta: {
            title: "导航1",
            isMeta: true
        },
    },
    // 导航路
    {
        path: '/map1',
        name: 'map1',
        component: () =>
            import ('../views/maps/Test1'),
        meta: {
            title: "导航1",
            isMeta: true
        },
    },
    // 导航路2
    {
        path: '/map2',
        name: 'map2',
        component: () =>
            import ('../views/maps/Test2'),
        meta: {
            title: "导航2",
            isMeta: true
        },
    },
    // 导航路3
    {
        path: '/map3',
        name: 'map3',
        component: () =>
            import ('../views/maps/Test3'),
        meta: {
            title: "导航3",
            isMeta: true
        },
    },
    // 错误路径
    {
        path: '*',
        name: 'error',
        component: () =>
            import ('../views/Error/Error'),
        meta: {
            title: "错误",
            isMeta: true
        },
    }
]


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

// router.beforeEach((to, from, next) => {
//     document.title = to.meta.title
// let username = localStorage.getItem('username')
// if (to.path === '/login' || to.path === '/register') {
//     next()
// } else {
//     username ? next() : next('/login')
// }
// })

export default router