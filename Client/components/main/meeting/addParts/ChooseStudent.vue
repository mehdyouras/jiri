<template>
  <div>
      <p>Choisissez un étudiant</p>
      <ol>
          <li @click="goToAddMeeting(student.id)" v-for="student in students" :key="student.id">
              <span>{{student.name}}</span>
              <span>{{student.email}}</span>
          </li>
      </ol>
  </div>
</template>

<script>
import {ALL_STUDENTS} from '../../../../constants'

export default {
    name: 'ChooseStudent',
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
            this.$emit('chooseRoute', id);
        }
    }
}
</script>

<style>

</style>
