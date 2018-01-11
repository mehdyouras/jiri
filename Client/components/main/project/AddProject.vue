<template>
  <b-card>
      <h2 class="mb-3">Ajouter un projet</h2>
      <div class="row">
        <ProjectForm class="col-lg-6"></ProjectForm>
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
}
</script>

<style>

</style>
