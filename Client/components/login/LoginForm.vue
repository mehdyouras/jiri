<template>
  <div>
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

export default {
  name: 'LoginForm',
  data() {
      return {
        email: '',
        password: '',
        emailId: nanoid(),
        passwordId: nanoid(),
      }
  },
  methods: {
      checkLogin() {
        let {email, password} = this
        let res = this.$apollo.mutate(
            {
                mutation: gql`mutation {
                      authenticateUser(email: "${email}", password: "${password}"){
                        id
                        token
                      }
                  }
                `
            }
        )
        console.log(res)
      }
  }
}
</script>

