<template>
<div id="app">
  <template v-if="isAppLoaded">
    <Sidebar v-if="route !== 'login'"></Sidebar>
    <router-view></router-view>
  </template>
  <Spinner v-if="!isAppLoaded"></Spinner>
</div>
</template>

<script>
import Sidebar from './components/sidebar/Sidebar'
import {mapGetters} from 'vuex'
import Spinner from './components/common/Spinner'

export default {
  name: 'app',
  components: {
    Sidebar,
    Spinner
  },
  computed: {
    ...mapGetters([
      'isAppLoaded',
    ]),
    route() {
      return this.$route.name;
    }
  },
}
</script>