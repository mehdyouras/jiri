<template>
  <div>
      <form method="post" action="#">
        <label :for="nameId">Nom</label>
        <input type="text" :id="nameId">
        <label :for="passwordId">Mot de passe</label>
        <input type="password" :id="passwordId">

        <input @click.prevent="checkLogin" type="submit">
      </form>
  </div>
</template>

<script>
import nanoid from 'nanoid'
export default {
  name: 'LoginForm',
  data() {
      return {
        nameId: nanoid(),
        passwordId: nanoid(),
      }
  },
  methods: {
      checkLogin() {
          console.log('Checked');
      }
  }
}
</script>

