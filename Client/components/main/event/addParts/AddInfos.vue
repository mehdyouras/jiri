<template>
  <div>
      <label for="course">Nom du cours</label>
      <input v-validate="'required'" v-model='course' type="text" id="course" name="course">
      <span v-show="this.errors.has('course')">{{this.errors.first('course')}}</span>

      <label for="year">Année académique</label>
      <select v-model='year' name="year" id="year">
        <option value="" disabled>Choisissez</option>
        <option value="2018-2019">2018-2019</option>
        <option value="2017-2018">2017-2018</option>
      </select>
      <label for="session">Session d'examen</label>
      <select v-model='session' name="session" id="session">
          <option value="" disabled>Choisissez</option>
          <option value="Janvier">Janvier</option>
          <option value="Juin">Juin</option>
          <option value="Septembre">Septembre</option>
      </select>
      <NextPreviousButtons :errors="errors" @handleStep='handleStep' :currentStep="currentStep" :viewCount="viewCount"></NextPreviousButtons>
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
      year: '',
      session: '',
    }
  },
  props: [
    'currentStep',
    'viewCount'
  ],
  methods: {
    handleStep(action) {
      let {course, year, session} = this;
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$store.commit('addInfosToEvent', {course, year, session})
          this.$emit('handleStep', action)
          return;
        }
      });
    },
  }
}
</script>
