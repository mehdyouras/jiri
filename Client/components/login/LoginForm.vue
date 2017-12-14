<template>
  <div>
      <h1>Jiri</h1>
      <form method="post" action="#">
        <label :for="emailId">Nom</label>
        <input v-model="email" type="text" :id="emailId">
        <label :for="passwordId">Mot de passe</label>
        <input v-model="password" type="password" :id="passwordId">

        <input @click.prevent="checkLogin" type="submit">
      </form>
  </div>
</template>

<script>
import nanoid from 'nanoid'
import gql from 'graphql-tag'
import VueApollo from 'vue-apollo'
import {mapGetters} from 'vuex'
import {AUTHENTICATE_USER} from '../../constants/authenticateUser.gql'

export default {
  name: 'LoginForm',
  data() {
      return {
        email: '',
        password: '',
        emailId: nanoid(),
        passwordId: nanoid(),
        userLoggedIn: false,
      }
  },
  methods: {
      checkLogin() {
        let {email, password} = this
        this.$apollo.mutate(
            {
                mutation: AUTHENTICATE_USER,
                variables: {
                  email,
                  password
                }
            }
        ).then(data => {
          localStorage.setItem('userToken', data.data.authenticateUser.token); 
          this.$router.push('/addUser');
        }).catch(e => {
          console.log(e)
        })
      },
      logoutUser() {
        localStorage.removeItem('userToken')
        console.log(localStorage.getItem('userToken'))
        this.$router.push({name: "home"})
      }
  },
  computed: {
    ...mapGetters([
      'currentUserId'
    ])
  },
  beforeCreated() {
    if(currentUserId !== '') {
      this.$router.push({name: "signup"})
    }
  }
}
</script>

