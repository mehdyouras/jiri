<template>
  <div>
      <h2>Ajouter un étudiant</h2>
      <p>Informations sur l'étudiant</p>
      <StudentForm :nextStep="true" @studentCreated="nextStep"></StudentForm>
  </div>
</template>

<script>
import StudentForm from '../../common/forms/StudentForm'
import {mapGetters} from 'vuex'

export default {
    name: 'AddStudent',
    components: {
        StudentForm,
    },
    data() {
        return {
            currentView: 'StudentForm'
        }
    },
    computed: {
        ...mapGetters([
            'lastAddedId'
        ])
    },
    methods: {
        nextStep() {
            this.$router.push({name: 'editStudent', params: {studentId: this.lastAddedId}})
        }
    }
}
</script>

<style>

</style>
