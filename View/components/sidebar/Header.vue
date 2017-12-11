<template>
  <div>
      <h1>Jiri</h1>
      <clock></clock>
  </div>
</template>
<script>
import Clock from './Clock.vue'

export default {
  name: 'header',
  components: {
      Clock,
  },
}
</script>
