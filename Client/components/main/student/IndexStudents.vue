<template>
  <b-card>
      <h2 class="mb-3">Vue d'ensemble des étudiants</h2>
      <p>Séléctionner un étudiant pour organiser une rencontre.</p>
      <Students :editable="true" @studentClicked="goToAddMeeting"></Students>
  </b-card>
</template>

<script>
import {ALL_STUDENTS} from '../../../constants'
import Students from '../../common/indexes/Students'
import {Bus} from '../../../Bus'

export default {
    name: 'IndexStudents',
    data() {
        return {
            modalVisible: false,
        }
    },
    components: {
        Students,
    },
    methods: {
        goToAddMeeting(id) {
            this.$router.push({name:'addImplementationsToMeeting', params: {studentId: id}})
        },
        showModal() {
            this.modalVisible = true;
        }
    }
}
</script>

<style>

</style>
