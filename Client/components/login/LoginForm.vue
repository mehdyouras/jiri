<template>
  <div>
      <h1>Jiri</h1>
      <form method="post" action="#">
        <label for="email-input">Adresse email</label>
        <input v-model="email" type="text" id="email-input">
        <label for="password-input">Mot de passe</label>
        <input v-model="password" type="password" id="password-input">

        <input @click.prevent="checkLogin" type="submit">
      </form>
  </div>
</template>

<script>
import nanoid from 'nanoid'
import {Bus} from '../../Bus'

export default {
  name: 'LoginForm',
  data() {
      return {
        email: '',
        password: '',
        userLoggedIn: false,
      }
  },
  methods: {
      checkLogin() {
        let {email, password} = this
        Bus.$emit('authenticateUser', {email, password})
      },
      logoutUser() {
        localStorage.removeItem('userToken')
        this.$router.push({name: "home"})
      }
  },
}
</script>

