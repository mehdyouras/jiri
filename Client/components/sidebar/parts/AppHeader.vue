<template>
  <div>
      <h1>Jiri</h1>
      <template>
        <p>{{currentUser.name}}</p>
        <a @click.prevent="logoutUser" href="#">Se déconnecter</a>
        <clock></clock>
      </template>
  </div>
</template>
<script>
import Clock from './Clock.vue'
import {mapGetters} from 'vuex'
import {USER} from '../../../constants'

export default {
  name: 'AppHeader',
  components: {
      Clock,
  },
  data() {
    return {
      currentUser: {
        name: '',
        isAdmin: false,
      },
    }
  },
  computed: {
      ...mapGetters([
          'currentUserId'
      ])
  },
  apollo: {
    currentUser: {
      query: USER,
      variables() {
        return {
          id: this.currentUserId
        }
      },
      update(data) {
        return data.User
      }
    }
  },
  methods: {
    logoutUser() {
      localStorage.removeItem('userToken')
      this.$router.push({name: 'login'})
    }
  },
}
</script>
