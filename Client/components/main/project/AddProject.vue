<template>
  <b-card>
      <h2>Ajouter un projet</h2>
      <div class="row">
        <ProjectForm class="col-lg-6" @projectCreated="finish"></ProjectForm>
      </div>
  </b-card>
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
