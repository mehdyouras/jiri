<template>
  <b-card class="col-md-5">
    <b-form-group
              label="Adresse email"
              label-for="student-email"
              :invalid-feedback="this.errors.first('student-email')"
              :state="!this.errors.has('student-email')"
            >
              <b-form-input id="student-email" name="student-email" type="email" v-validate="'required|email'" v-model.trim="email" :state="!this.errors.has('student-email')"></b-form-input>
    </b-form-group>
<!--     
    <label for="student-email">Adresse email</label>
    <input v-validate="'required|email'" v-model="email" type="email" id="student-email">
    <span v-show="this.errors.has('student-email')">{{this.errors.first('student-email')}}</span> -->

    <b-form-group
              label="Nom"
              label-for="student-name"
              :invalid-feedback="this.errors.first('student-name')"
              :state="!this.errors.has('student-name')"
            >
              <b-form-input id="student-name" name="student-name" type="text" v-validate="'required|alpha_spaces'" v-model.trim="name" :state="!this.errors.has('student-name')"></b-form-input>
    </b-form-group>

    <!-- <label for="student-name">Nom</label>
    <input v-validate="'required|alpha_spaces'" v-model="name" type="text" id="student-name">
    <span v-show="this.errors.has('student-name')">{{this.errors.first('student-name')}}</span> -->

    <button @click.prevent="createStudent">Ajouter</button>
  </b-card>
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
            this.email = '';
            this.name = '';
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
