<template>
<div id="app">
  <template v-if="isAppLoaded">
    <Bar v-if="route !== 'login'"></Bar>
    <router-view class="container"></router-view>
    <app-footer></app-footer>
  </template>
  <Spinner v-if="!isAppLoaded"></Spinner>
</div>
</template>

<script>
import Bar from './components/navbar/Bar'
import {mapGetters} from 'vuex'
import Spinner from './components/common/Spinner'
import AppFooter from './components/footer/AppFooter'

export default {
  name: 'app',
  components: {
    Bar,
    Spinner,
    AppFooter
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

<style lang="scss">
  #app {
    min-height: 100vh;
    padding-bottom: 10rem;
    position: relative;
  }
</style>
