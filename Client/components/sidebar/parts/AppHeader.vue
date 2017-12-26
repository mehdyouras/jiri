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

export default {
  name: 'AppHeader',
  components: {
      Clock,
  },
  props: [
    'currentUser'
  ],
  methods: {
    logoutUser() {
      localStorage.removeItem('userToken')
      this.$router.push({name: 'login'})
    }
  },
}
</script>
