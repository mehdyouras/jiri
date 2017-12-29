<template>
  <div>
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

    <button @click.prevent="createUser" >Ajouter</button>
  </div>
</template>

<script>
import {Bus} from '../../../Bus'
import nanoid from 'nanoid'

export default {
    name: 'UserForm',
    data() {
        return {
            email: "",
            password: "",
            name: "",
            company: "",
            isAdmin: false,
        }
    },
    methods: {
        createUser() {
        let {email, password, name, company, isAdmin} = this;

        Bus.$emit('createUser', {email, password, name, company, isAdmin});
        this.$emit('userCreated');
        },
        randomizePassword() {
            let password = nanoid();
            this.password = password.slice(14);
        },
    },
    created() {
        this.$emit('formHasChanged')
    }
}
</script>

<style>

</style>
