<template>
  <div>
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
      <NextPreviousButtons @handleStep='handleStep' :currentStep="currentStep" :viewCount="viewCount"></NextPreviousButtons>
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
    'currentStep',
    'viewCount'
  ],
  methods: {
    handleStep(action) {
      let {course, year, session} = this;
      if(course !== '' && year !== '' && session !== '') {
        this.$store.commit('addInfosToEvent', {course, year, session})
        this.$emit('handleStep', action)
      } else {
        console.log({error: 'Le nom du cours est manquant.'})
      }
    },
  }
}
</script>
