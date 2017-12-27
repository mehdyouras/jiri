<template>
  <div>
      <ol>
          <li @click="studentClicked(student.id)" v-for="student in students" :key="student.id">
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
        studentClicked(id) {
            this.$emit('studentClicked', id)
        }
    }
}
</script>

<style>

</style>
