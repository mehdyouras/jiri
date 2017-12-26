<template>
  <div>
      <app-header :currentUser="currentUser"></app-header>
      <Navbar :currentUser="currentUser"></Navbar>
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
  data() {
      return {
          currentUser: {},
      }
  },
  computed: {
      ...mapGetters([
          'currentUserId'
      ])
  },
  components: {
      AppHeader,
      Navbar,
      AppFooter,
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
}
</script>
