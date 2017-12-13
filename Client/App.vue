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
import {mapMutations} from 'vuex'

export default {
  name: 'app',
  methods: {
    ...mapMutations([
      'currentUserId'
    ]),
    isUserLoggedIn() {
      this.$apollo.query({
        query: gql`{
                    loggedInUser{
                        id
                    }
                  }`,
      }).then(data => {  
        if(this.loggedIn(data) === null){
          this.$router.push({name:'login'});
        } else {
          this.$store.commit('currentUserId', data.data.loggedInUser.id);
        }
        if (this.loggedIn(data) !== null && this.$route.path === '/') {
          this.$router.push({name:'signup'});
        }
      }).catch(error => {
        console.error(error)
      });
    },
    loggedIn(data){
      return data.data.loggedInUser && data.data.loggedInUser.id !== ''
    }
  },
  beforeCreated() {
   this.isUserLoggedIn();
  },
  updated() {
   this.isUserLoggedIn();
  }
}
</script>