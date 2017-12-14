import VueRouter from 'vue-router'
import Vue from 'vue'

import LoginForm from './components/login/LoginForm.vue'
import SignupForm from './components/login/SignupForm.vue'
import Dashboard from './components/main/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
    {name: "login", path: "/", component: LoginForm},
    {name: "signup", path: "/addUser", component: SignupForm},
    {name: "dashboard", path: "/dashboard", component: Dashboard}
]

const router = new VueRouter({routes})

export default router;