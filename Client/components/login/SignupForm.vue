<template>
  <div>
      <form method="post" action="#">
        <input v-model="isAdmin" type="checkbox" :id="isAdminId">
        <label :for="isAdminId">Administrateur</label>
        
        <label :for="nameId">Nom</label>
        <input v-model="name" type="text" :id="nameId">
        
        <label :for="companyId">Organisation</label>
        <input v-model="company" type="text" :id="companyId">

        <label :for="emailId">Email</label>
        <input v-model="email" type="email" :id="emailId">

        <label :for="passwordId">Mot de passe</label>
        <input v-model="password" type="password" :id="passwordId">

        <a href="#" @click.prevent="randomizePassword" >Générer un mot de passe</a>

        <input @click.prevent="signupUser(name, email)" type="submit">
      </form>
  </div>
</template>

<script>
import nanoid from 'nanoid'
import gql from 'graphql-tag'
import VueApollo from 'vue-apollo'

export default {
  name: 'SignupForm',
  data() {
      return {
        email: '',
        name: '',
        password: '',
        isAdmin: false,
        company: '',
        nameId: nanoid(),
        emailId: nanoid(),
        passwordId: nanoid(),
        companyId: nanoid(),
        isAdminId: nanoid(),
      }
  },
  methods: {
      signupUser() {
          let {email, name, password, isAdmin, company} = this;
          return this.$apollo.mutate(
              {
                  mutation: gql`mutation {
                        signupUser(email: "${email}", password: "${password}") {
                            id
                            token
                        }
                        updateUser(id: "cjb2cz98e00cy0121oa37sp3n", name: "${name}", isAdmin: ${isAdmin}, company: "${company}") {
                            id
                        }
                    }
                  `
              }
          )
      },
      randomizePassword() {
          let password = nanoid();
          this.password = password.slice(14);
      }
  }
}
</script>

