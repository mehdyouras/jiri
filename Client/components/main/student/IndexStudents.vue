<template>
  <div>
      <h2>Vue d'ensemble des étudiants</h2>
      <ol>
          <li @click="goToAddMeeting(student.id)" v-for="student in students" :key="student.id">
              <span>{{student.name}}</span>
              <span>{{student.email}}</span>
          </li>
      </ol>
  </div>
</template>

<script>
import {ALL_STUDENTS} from '../../../constants'

export default {
    name: 'IndexStudents',
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
            this.$router.push({name:'addImplementationsToMeeting', params: {studentId: id}})
        }
    }
}
</script>

<style>

</style>
