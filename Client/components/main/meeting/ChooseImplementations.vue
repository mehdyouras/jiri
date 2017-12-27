<template>
  <div>
      <h2>Organiser une rencontre avec un étudiant</h2>
      <h3>{{student.name}}</h3>
      <ol>
          <li v-for="project in student.event.weights" :key="project.id">
              {{project.project.name}}
          </li>
      </ol>
  </div>
</template>

<script>
import {STUDENT} from '../../../constants'

export default {
    name: 'ChooseImplementations',
    data() {
        return {
            student: {},
        }
    },
    created() {
        // Checks if the studentId in route exists
        if(this.$route.params.studentId) {
            this.$apollo.query({
                query: STUDENT,
                variables: {
                    id: this.$route.params.studentId
                }
            }).then(data => {
                if(data.data.Student === null) {
                    this.$router.push({name: 'addMeeting'})
                } else {
                    console.log(data.data.Student)
                    this.student = data.data.Student;
                }
            });
        } else {
            this.$router.push({name: 'addMeeting'})
        }
    }
}
</script>

<style>

</style>
