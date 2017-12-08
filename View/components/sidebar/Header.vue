<template>
  <div>
      <h1>Jiri</h1>
      <p>{{hours}} : {{minutes}}</p>
  </div>
</template>
<script>
export default {
  name: 'header',
  data() {
      return {
          hours: '',
          minutes: '',
      }
  },
  mounted () {
    setInterval(this.updateDateTime, 1000)
  },
  methods: {
      updateTime() {
          let now = new Date();
          this.hours = now.getHours();
          this.getMinutes = now.getMinutes();
          console.log(this.hours)
      }
  }
}
</script>
