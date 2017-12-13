import Vue from 'vue'
import VueRouter from 'vue-router'
import {apolloProvider} from './apollo'
import App from './App.vue'
import router from './router.js'
import { store } from './store'
import VueResource from 'vue-resource'

Vue.use(VueResource)

new Vue({
    el: '#app',
    store,
    apolloProvider,
    render: h => h(App),
    router,
})


// let userToken = localStorage.getItem('userToken');
// Vue.http.headers.common['Authorization'] = userToken ? `Bearer ${userToken}` : null;

// router.beforeEach((to, from, next) => {
//     if(!isLoggedIn()) {
        // next({
        //     path: '/',
        //     query: {
        //       redirect: to.fullPath,
        //     },
        // });
//     } else {
//         next();
//     }
// })
