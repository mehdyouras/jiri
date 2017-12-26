<template>
<div id="app">
  <Sidebar v-if="route !== 'login'"></Sidebar>
  <router-view></router-view>
</div>
</template>

<script>
import Sidebar from './components/sidebar/Sidebar'
export default {
  name: 'app',
  components: {
    Sidebar
  },
  data() {
    return {
      route: this.$route.name,
    }
  }
}
</script>