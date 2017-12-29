<template>
  <div>
      <h2>Ajouter un utilisateur</h2>
      <ProjectForm @projectCreated="finish"></ProjectForm>
  </div>
</template>

<script>
import ProjectForm from '../../common/forms/ProjectForm'

export default {
    name: 'AddUser',
    components: {
        ProjectForm,
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
