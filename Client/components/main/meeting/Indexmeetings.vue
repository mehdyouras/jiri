<template>
  <b-card>
        <h2 class="mb-3">Les étudiants que vous avez déjà rencontré</h2>
        <Spinner v-if="isLoading"></Spinner>
        <template v-else>
            <b-btn variant="primary" :to="{name: 'addMeeting'}">Organiser une rencontre</b-btn>
            <template v-if="!students[0]">
                <b-alert class="mt-3" show variant="warning">Vous n'avez pas encore rencontré d'étudiant.</b-alert>
            </template>
            <template v-else>            
                <p>Choisissez un étudiant</p>
                <Students @studentClicked="goToAddMeeting"></Students>
            </template>
        </template>
  </b-card>
</template>

<script>
import {STUDENTS_MET} from '../../../constants'
import _ from 'lodash'
import {mapGetters} from 'vuex'
import Spinner from '../../common/Spinner'
import Students from '../../common/indexes/Students'

export default {
    name: 'IndexMeetings',
    components: {
        Spinner,
        Students
    },
    data() {
        return {
            students: {},
            isLoading: 0,
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
            },
            loadingKey: 'isLoading'
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
