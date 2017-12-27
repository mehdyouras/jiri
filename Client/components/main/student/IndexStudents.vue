<template>
  <div>
      <h2>Vue d'ensemble des étudiants</h2>
      <Students @studentClicked="goToAddMeeting"></Students>
  </div>
</template>

<script>
import {ALL_STUDENTS} from '../../../constants'
import Students from '../../common/indexes/Students'

export default {
    name: 'IndexStudents',
    components: {
        Students,
    },
    methods: {
        goToAddMeeting(id) {
            this.$router.push({name:'addImplementationsToMeeting', params: {studentId: id}})
        }
    }
}
</script>

<style>

</style>
