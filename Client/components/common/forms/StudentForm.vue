<template>
  <div>
    <label for="student-email">Adresse email</label>
    <input v-validate="'required|email'" v-model="email" type="email" id="student-email">
    <span v-show="this.errors.has('student-email')">{{this.errors.first('student-email')}}</span>

    <label for="student-name">Nom</label>
    <input v-validate="'required|alpha_spaces'" v-model="name" type="text" id="student-name">
    <span v-show="this.errors.has('student-name')">{{this.errors.first('student-name')}}</span>

    <button @click.prevent="createStudent">Ajouter</button>
  </div>
</template>

<script>
import {Bus} from '../../../Bus'

export default {
    name:'StudentForm',
    data() {
      return {
        email: '',
        name: '',
      }
    },
    props: [
      'nextStep'
    ],
    methods: {
      createStudent() {
        this.$validator.validateAll().then((result) => {
          if (result) {
            let {email, name, nextStep} = this;
    
            Bus.$emit('createStudent', {email, name, nextStep: !!nextStep});
            this.$emit('studentCreated');
            return;
          }
        });
      }
    },
    created() {
        this.$emit('formHasChanged')
    }
}
</script>

<style>

</style>
