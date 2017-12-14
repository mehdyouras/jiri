<template>
  <div>
      <app-header></app-header>
      <Navbar></Navbar>
  </div>
</template>

<script>
import AppHeader from './parts/AppHeader.vue'
import Navbar from './parts/Navbar'
import {mapActions} from 'vuex'

export default {
  name: 'sidebar',
  components: {
      AppHeader,
      Navbar,
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
