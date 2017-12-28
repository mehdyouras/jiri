<template>
  <div>
      <h2>Ajouter un étudiant</h2>
      <StudentForm></StudentForm>
  </div>
</template>

<script>
import StudentForm from '../../common/forms/StudentForm'

export default {
    name: 'AddStudent',
    components: {
        StudentForm,
    }
}
</script>

<style>

</style>
