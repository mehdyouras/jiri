<template>
  <div>
      <h1>Jiri</h1>
      <form method="post" action="#">
        <label for="email-input">Adresse email</label>
        <input v-model="email" type="text" id="email-input">
        <label for="password-input">Mot de passe</label>
        <input v-model="password" type="password" id="password-input">

        <input v-if="!isLoggingIn" @click.prevent="checkLogin" type="submit">
        <Spinner v-else></Spinner>
      </form>
  </div>
</template>

<script>
import nanoid from 'nanoid'
import {Bus} from '../../Bus'
import Spinner from '../common/Spinner'
import {mapGetters} from 'vuex'

export default {
  name: 'LoginForm',
  components: {
    Spinner
  },
  data() {
      return {
        email: '',
        password: '',
      }
  },
  computed: {
    ...mapGetters([
      'isLoggingIn'
    ])
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

