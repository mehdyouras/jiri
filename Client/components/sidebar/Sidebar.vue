<template>
  <div>
      <app-header></app-header>
      <Navbar></Navbar>
      <AppFooter></AppFooter>
  </div>
</template>

<script>
import AppHeader from './parts/AppHeader.vue'
import Navbar from './parts/Navbar'
import AppFooter from './parts/AppFooter'
import {USER} from '../../constants'
import {mapGetters} from 'vuex'

export default {
  name: 'Sidebar',
  components: {
      AppHeader,
      Navbar,
      AppFooter,
  },
  computed: {
    ...mapGetters([
      'currentUserId'
    ]),
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
        this.$store.commit('setIsAdmin', data.User.isAdmin)
      }
    }
  },
}
</script>
