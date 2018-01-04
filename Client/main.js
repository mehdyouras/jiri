import Vue from 'vue'
import VueRouter from 'vue-router'
import {apolloProvider} from './apollo'
import App from './App.vue'
import router from './router.js'
import { store } from './store'
import VeeValidate from 'vee-validate';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'mdi/css/materialdesignicons.min.css'
import 'vue2-animate/dist/vue2-animate.min.css'

Vue.use(BootstrapVue);

Vue.use(VeeValidate);

new Vue({
    el: '#app',
    store,
    apolloProvider,
    render: h => h(App),
    router,
})