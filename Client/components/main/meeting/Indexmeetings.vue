<template>
  <div>
        <h2>Les étudiants que vous avez déjà rencontré</h2>
        <p>Choisissez un étudiant</p>
        <pre>{{studentsMet}}</pre>
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
import _ from 'lodash'
import {mapGetters} from 'vuex'

export default {
    name: 'IndexMeetings',
    data() {
        return {
            students: {},
        }
    },
    computed: {
        ...mapGetters([
            'currentUserId'
        ]),
        studentsMet() {
            return _.filter(this.students, (student) => {
                student.implementations.forEach(implementation => {
                     return implementation.score.user.id === this.currentUserId;
                })
            })
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
