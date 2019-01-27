import Vue from 'vue'
import 'normalize.css/normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import '@/styles/index.scss' // global css

import App from './views/App'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.use(ElementUI)

import router from '@/router'

import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

import Hello from './views/Hello'
import Home from './views/Home'
import UsersIndex from './views/UsersIndex'

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
