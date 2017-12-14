import Vue from 'vue'
import VueRouter from 'vue-router'
import {apolloProvider} from './apollo'
import App from './App.vue'
import router from './router.js'
import { store } from './store'

new Vue({
    el: '#app',
    store,
    apolloProvider,
    render: h => h(App),
    router,
})