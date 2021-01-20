import {getAsyncComponent} from '../../util/lazyUtil.js'

export const routes = [
    {
        path: '/',
        redirect:  { name: 'home' }
    },
    {
        name: 'home',
        path: '/home',
        component: () => import('../views/waterImg/home.vue')
    }, {
        name: 'pressImg',
        path: '/pressImg',
        // component:  getAsyncComponent('../src/views/pressImg/index.vue')
        component:  () => import('../views/pressImg/index.vue')
    },
    {
        name: 'qrCode',
        path: '/qrCode',
        // component: getAsyncComponent('../src/views/qrCode/qrCode.vue')
        component:  () => import('../views/qrCode/qrCode.vue')
    },
    {
        name: 'logoQrCode',
        path: '/logoQrCode',
        // component: getAsyncComponent('../src/views/qrCode/logoQrCode.vue')
        component:  () => import('../views/qrCode/logoQrCode.vue')
    },

]
