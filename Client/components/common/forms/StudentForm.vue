<template>
  <div>
    <label for="student-email">Adresse email</label>
    <input v-model="email" type="email" id="student-email">
    <label for="student-name">Nom</label>
    <input v-model="name" type="text" id="student-name">
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
    methods: {
      createStudent() {
        let {email, name} = this;

        Bus.$emit('createStudent', {email, name});
      }
    },
    created() {
        this.$emit('formHasChanged')
    }
}
</script>

<style>

</style>
