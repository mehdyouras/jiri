<template>
  <div @handleStep='handleStep'>
      <label for="course">Nom du cours</label>
      <input v-model='course' type="text" id="course">
      <label for="year">Année académique</label>
      <select v-model='year' name="year" id="year">
          <option value="2018-2019">2018-2019</option>
          <option value="2017-2018">2017-2018</option>
      </select>
      <label for="session">Session d'examen</label>
      <select v-model='session' name="session" id="session">
          <option value="janvier">Janvier</option>
          <option value="juin">Juin</option>
          <option value="septembre">Septembre</option>
      </select>
      <NextPreviousButtons :currentStep="currentStep"></NextPreviousButtons>
  </div>
</template>

<script>
import NextPreviousButtons from './NextPreviousButtons'

export default {
  name: 'AddInfos',
  components: {
    NextPreviousButtons,
  },
  data() {
    return {
      course: '',
      year: '2017-2018',
      session: 'janvier',
    }
  },
  props: [
    'currentStep'
  ],
  methods: {
    handleStep(action) {
      console.log('test')
      this.$emit('handleStep', action)
    }
  }
}
</script>
