<template>
  <div>
      <time :datetime="datetime">{{datetime}}</time>
  </div>
</template>
<script>
function padZero(number) {
  if (number < 10) {
    return '0' + number;
  }
  return number;
}
function getDate() {
  return new Date();
}
function getSeconds() {
  return padZero(getDate().getSeconds());
}
function getMinutes() {
  return padZero(getDate().getMinutes());
}
function getHour() {
  return padZero(getDate().getHours());
}
export default {
  name: 'clock',
  data() {
      return {
          ticker: null,
          hours: getHour(),
          minutes: getMinutes(),
      }
  },
  computed: {
      datetime() {
          return this.hours+':'+this.minutes
      },
  },
  created: function created() {
    this.ticker = setInterval(() => {
      this.minutes = getMinutes();
      this.hours = getHour();
      this.seconds = getSeconds();
    }, 1000);
  },
  destroyed: function destroyed() {
    clearInterval(this.ticker);
  },
}
</script>
