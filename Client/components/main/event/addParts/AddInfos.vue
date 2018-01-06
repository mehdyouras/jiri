<template>
  <b-form>
    <b-form-group
      label="Nom du cours"
      label-for="course"
      :invalid-feedback="this.errors.first('course')"
      :state="!this.errors.has('course')"
    >
      <b-form-input id="course" name="course" type="text" v-validate="'required'" v-model.trim="course" :class="{'is-invalid': this.errors.has('course')}"></b-form-input>
    </b-form-group>

      <b-form-group label="Année académique"
                    label-for="year">
        <b-form-select label="Année académique" v-model='year' name="year" id="year">
          <option value="" disabled>Choisissez</option>
          <option value="2018-2019">2018-2019</option>
          <option value="2017-2018">2017-2018</option>
        </b-form-select>
      </b-form-group>
      
      <b-form-group label="Session d'examen"
                    label-for="session">
        <b-form-select v-model='session' name="session" id="session">
            <option value="" disabled>Choisissez</option>
            <option value="Janvier">Janvier</option>
            <option value="Juin">Juin</option>
            <option value="Septembre">Septembre</option>
        </b-form-select>
      </b-form-group>
      <NextPreviousButtons :errors="errors" @handleStep='handleStep' :currentStep="currentStep" :viewCount="viewCount"></NextPreviousButtons>
  </b-form>
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
