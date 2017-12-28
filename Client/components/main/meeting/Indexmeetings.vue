<template>
  <div>
        <h2>Les étudiants que vous avez déjà rencontré</h2>
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
import {STUDENTS_MET} from '../../../constants'
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
    },
    apollo: {
        students: {
            query: STUDENTS_MET,
            variables() {
                return {
                    id: this.currentUserId,
                }
            },
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
