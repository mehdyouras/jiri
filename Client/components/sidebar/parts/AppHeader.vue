<template>
  <div>
      <h1>Jiri</h1>
      <p>{{currentUser.name}}</p>
      <a @click.prevent="logoutUser" href="#">Se déconnecter</a>
      <clock></clock>
  </div>
</template>
<script>
import Clock from './Clock.vue'
import {mapGetters} from 'vuex'

export default {
  name: 'AppHeader',
  components: {
      Clock,
  },
  methods: {
    logoutUser() {
      localStorage.removeItem('userToken')
      this.$router.push({name: 'login'})
    }
  },
  computed: {
    ...mapGetters([
      'currentUser'
    ])
  },
}
</script>
