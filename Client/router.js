import VueRouter from 'vue-router'
import Vue from 'vue'
import {store} from './store'
import userLoggedIn from './auth'

import LoginForm from './components/login/LoginForm.vue'
import SignupForm from './components/login/SignupForm.vue'
import Dashboard from './components/main/Dashboard.vue'

import {apolloClient} from './apollo'
import gql from 'graphql-tag'

Vue.use(VueRouter)

const routes = [
    {name: "login", path: "/", component: LoginForm, meta: { doesntRequiresAuth: true}},
    {name: "signup", path: "/addUser", component: SignupForm},
    {name: "dashboard", path: "/dashboard", component: Dashboard}
]

const router = new VueRouter({routes})

export default router;