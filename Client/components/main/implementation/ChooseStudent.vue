<template>
  <div>
      <h2>Ajouter des implémentations à un étudiant</h2>
      <p>Choisissez un étudiant auquel ajouter des implémentations</p>
      <Students @studentClicked="goToAddImplementations" ></Students>
  </div>
</template>

<script>
import Students from '../../common/indexes/Students'

export default {
    name: 'ChooseStudentForImplementation',
    components: {
        Students,
    },
    methods: {
        goToAddImplementations(id) {
            this.$router.push({name: 'addImplementationToStudent', params: {studentId: id}})
        }
    }
}
</script>

<style>

</style>
