import Vue from 'vue'
import VueRouter from 'vue-router'
import {apolloProvider} from './apollo'
import App from './App.vue'
import router from './router.js'
import { store } from './store'
import VeeValidate from 'vee-validate';
import Buefy from 'buefy';
import 'buefy/lib/buefy.css';

Vue.use(Buefy);

Vue.use(VeeValidate);

new Vue({
    el: '#app',
    store,
    apolloProvider,
    render: h => h(App),
    router,
})