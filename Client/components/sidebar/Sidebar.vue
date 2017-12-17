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
import {mapActions} from 'vuex'

export default {
  name: 'sidebar',
  components: {
      AppHeader,
      Navbar,
      AppFooter,
  },
  methods: {
      ...mapActions([
          'setCurrentUser'
      ])
  },
  created() {
      this.$store.dispatch('setCurrentUser')
  }
}
</script>
