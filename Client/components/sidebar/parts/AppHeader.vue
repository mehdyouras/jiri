<template>
  <div>
      <h1>Jiri</h1>
      <p>{{currentUser.name}}</p>
      <clock></clock>
  </div>
</template>
<script>
import Clock from './Clock.vue'
import {mapGetters} from 'vuex'

export default {
  name: 'AppHeader',
  components: {
      Clock,
  },
  computed: {
    ...mapGetters([
      'currentUser'
    ])
  }
}
</script>
