import {getAsyncComponent} from '../util/lazyUtil.js'

export const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        name: 'home',
        path: '/home',
        component: () => import('./../src/views/home.vue')
    }, {
        name: 'qrCode',
        path: '/qrCode',
        component: getAsyncComponent('../src/views/qrCode.vue')
    },
    {
        name: 'logoQrCode',
        path: '/logoQrCode',
        component: getAsyncComponent('../src/views/logoQrCode.vue')
    }
]
