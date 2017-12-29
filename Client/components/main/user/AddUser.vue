<template>
  <div>
      <h2>Ajouter un utilisateur</h2>
      <UserForm @userCreated="finish"></UserForm>
  </div>
</template>

<script>
import UserForm from '../../common/forms/UserForm'

export default {
    name: 'AddUser',
    components: {
        UserForm,
    },
    methods: {
        finish() {
            this.$router.push({name: 'dashboard'})
        }
    }
}
</script>

<style>

</style>
