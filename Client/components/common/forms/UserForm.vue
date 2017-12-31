<template>
  <div>
    <input v-validate="'required'" v-model="isAdmin" type="checkbox" id="user-isAdmin" name="user-isAdmin">
    <label for="user-isAdmin">Administrateur</label>
    <span v-show="this.errors.has('user-isAdmin')">{{this.errors.first('user-isAdmin')}}</span>
    
    <label for="user-name">Nom</label>
    <input v-validate="'required|alpha_spaces'" v-model="name" type="text" id="user-name" name="user-name">
    <span v-show="this.errors.has('user-name')">{{this.errors.first('user-name')}}</span>
    
    <label for="user-company">Organisation</label>
    <input v-validate="'required'" v-model="company" type="text" id="user-company" name="user-company">
    <span v-show="this.errors.has('user-company')">{{this.errors.first('user-company')}}</span>

    <label for="user-email">Email</label>
    <input v-validate="'required|email'" v-model="email" type="email" id="user-email" name="user-email">
    <span v-show="this.errors.has('user-email')">{{this.errors.first('user-email')}}</span>

    <label for="user-password">Mot de passe</label>
    <input v-validate="'required'" v-model="password" type="password" id="user-password" name="user-password">
    <span v-show="this.errors.has('user-password')">{{this.errors.first('user-password')}}</span>

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
            this.$validator.validateAll().then((result) => {
                if (result) {
                    let {email, password, name, company, isAdmin} = this;
        
                    Bus.$emit('createUser', {email, password, name, company, isAdmin});
                    this.$emit('userCreated');
                    return;
                }
            });
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
