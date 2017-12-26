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

export default {
  name: 'Sidebar',
  components: {
      AppHeader,
      Navbar,
      AppFooter,
  },
}
</script>
