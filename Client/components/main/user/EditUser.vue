<template>
  <div>
      <h2>Modifier {{user.name}}</h2>
      <Spinner v-if="isLoading"></Spinner>
      <template v-else>
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

        <button @click.prevent="updateUser" >Modifier</button>
      </template>
  </div>
</template>

<script>
import {USER} from '../../../constants'
import {Bus} from '../../../Bus'
import Spinner from '../../common/Spinner'

export default {
    name: 'EditUser',
    components: {
        Spinner
    },
    data() {
        return {
            isLoading: 0,
            user: {},
            id: this.$route.params.userId,
            email: "",
            password: "",
            name: "",
            company: "",
            isAdmin: false,
        }
    },
    methods: {
        updateUser() {
            let {id, email, password, company, isAdmin} = this;

            let payload = {
                id,
                email,
                password,
                company,
                isAdmin
            }

            Bus.$emit('updateUser', payload);
            this.$router.push({name: 'indexUsers'})
        },
        randomizePassword() {
            let password = nanoid();
            this.password = password.slice(14);
        },
    },
    apollo: {
        user: {
            query: USER,
            variables() {
                return {
                    id: this.id,
                }
            },
            update(data) {
                this.email = data.User.email;
                this.name = data.User.name;
                this.company = data.User.company;
                this.isAdmin = data.User.isAdmin;
                return data.User
            },
            loadingKey: 'isLoading'
        }
    },
}
</script>

<style>

</style>
