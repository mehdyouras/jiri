<template>
  <div>
      <h2>Organiser une rencontre avec un étudiant</h2>
      <p>Choisissez un étudiant</p>
      <Students @studentClicked="goToAddMeeting"></Students>
  </div>
</template>

<script>
import {ALL_STUDENTS} from '../../../constants'
import Students from '../../common/indexes/Students'

export default {
    name: 'ChooseStudentForMeeting',
    components: {
        Students
    },
    data() {
        return {
            students: {},
        }
    },
    apollo: {
        students: {
            query: ALL_STUDENTS,
            update(data) {
                return data.allStudents
            }
        }
    },
    methods: {
        goToAddMeeting(id) {
            this.$router.push({name: 'addImplementationsToMeeting', params: {studentId: id}})
        }
    }
}
</script>

<style>

</style>
