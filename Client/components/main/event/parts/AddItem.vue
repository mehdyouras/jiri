<template>
  <div>
      <button @click="addType">Ajouter un {{type}}</button>
      <!-- TODO: Add missing form and put theme in seperate file -->
      <div v-if="isAdding">
          <template v-if="currentStep === 1">
              <label for="student-email">Adresse email</label>
              <input type="email" id="student-email">
              <label for="student-name">Nom</label>
              <input type="text" id="student-name">
          </template>
          <template v-if="currentStep === 2">
            <input v-model="isAdmin" type="checkbox" id="user-isAdmin">
            <label for="user-isAdmin">Administrateur</label>
            
            <label for="user-name">Nom</label>
            <input v-model="name" type="text" id="user-name">
            
            <label for="user-company">Organisation</label>
            <input v-model="company" type="text" id="user-company">

            <label for="user-email">Email</label>
            <input v-model="email" type="email" id="user-email">

            <label for="user-password">Mot de passe</label>
            <input v-model="password" type="password" id="user-password">

            <a href="#" @click.prevent="randomizePassword" >Générer un mot de passe</a>
          </template>
      </div>
  </div>
</template>

<script>
import nanoid from 'nanoid'

export default {
    name: 'AddItem',
    data() {
        return {
            types: ['étudiant', 'utilisateur', 'projet'],
            isAdding: false,
        }
    },
    props: [
        'currentStep'
    ],
    computed: {
        type() {
            return this.types[this.currentStep - 1];
        }
    },
    methods: {
        addType() {
            this.isAdding = true;
        },
        randomizePassword() {
            let password = nanoid();
            this.password = password.slice(14);
      }
    }
}
</script>