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
import VueResource from 'vue-resource'

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
                mutation: gql`mutation {
                      authenticateUser(email: "${email}", password: "${password}"){
                        id
                        token
                      }
                  }
                `
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
}
</script>

