<template>
<div id="app">
  
  <router-view></router-view>
</div>
</template>

<script>

import gql from 'graphql-tag'
import VueApollo from 'vue-apollo'
import {apolloClient} from './apollo'
import router from './router.js'

export default {
  name: 'app',
  data() {
    return {
      currentUserId: '',
    }
  },
  methods: {
    isUserLoggedIn() {
      apolloClient.query(
        {
            query: gql`{
                  loggedInUser{
                      id
                  }
                }`
            }
        ).then((data) => {
            router.beforeEach((to, from, next) => {
              if(!data.data.loggedInUser) {
                console.log(data.data.loggedInUser)
                next({name: "login"})
              } else {
                console.log(data.data.loggedInUser)
                next();
              }
            })
        }).catch((e) => {
          router.beforeEach((to, from, next) => {
            next({name: "login"})
          })
        })
        },
  },
  created() {
    this.isUserLoggedIn();
  },
  updated() {
    this.isUserLoggedIn();
  }
}
</script>