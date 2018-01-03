<template>
<div id="app">
  <template v-if="isAppLoaded">
    <Bar v-if="route !== 'login'"></Bar>
    <router-view class="container"></router-view>
  </template>
  <Spinner v-if="!isAppLoaded"></Spinner>
</div>
</template>

<script>
import Bar from './components/navbar/Bar'
import {mapGetters} from 'vuex'
import Spinner from './components/common/Spinner'

export default {
  name: 'app',
  components: {
    Bar,
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