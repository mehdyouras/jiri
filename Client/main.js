import Vue from 'vue'
import VueRouter from 'vue-router'
import {apolloProvider} from './apollo'
import App from './App.vue'
import router from './router.js'
import { store } from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'mdi/css/materialdesignicons.min.css'
import './assets/css/vue2-animate.min.css'
import './assets/css/main.css'
import VeeValidate from 'vee-validate';
import VeeValidateConfig from './v-validate'


Vue.use(VeeValidate, VeeValidateConfig);

Vue.use(BootstrapVue);

new Vue({
    el: '#app',
    store,
    apolloProvider,
    render: h => h(App),
    router,
})