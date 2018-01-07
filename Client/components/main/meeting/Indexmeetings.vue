<template>
  <b-card>
        <h2 class="mb-3">Les étudiants que vous avez déjà rencontrés</h2>
        <Spinner v-if="isLoading"></Spinner>
        <template v-else>
            
            <template v-if="!students[0]">
                <b-alert class="mt-3" show variant="warning">
                    <p>Vous n'avez pas encore rencontré d'étudiant.</p>
                    <b-btn variant="primary" :to="{name: 'addMeeting'}">Organiser une rencontre</b-btn>
                </b-alert>
            </template>
            <template v-else>   
                <b-btn class="mb-3" variant="primary" :to="{name: 'addMeeting'}">Organiser une rencontre</b-btn>         
                <p>Choisissez un étudiant</p>
                <ol class="list-unstyled row mt-3">
                    <li class="col-md-4 col-lg-3" v-for="student in students" :key="student.id">
                        <b-card no-body show variant="secondary" class="mb-3">
                            <div class="card-text d-flex justify-content-between align-items-center">
                                <div @click.stop="goToAddMeeting(student.id)" class="p-3 card-clickable">
                                    <span class="d-block">
                                        {{student.name}}
                                    </span>
                                    <span class="small d-block">
                                        {{student.email}}
                                    </span>
                                    <b-badge v-if="student.implementations.length - userMarks(student.id) !== 0"  variant="success">{{userMarks(student.id)}} cotés</b-badge>
                                    <b-badge v-else variant="success">Tous cotés</b-badge>
                                    <b-badge v-if="student.implementations.length - userMarks(student.id)" variant="warning">{{student.implementations.length - userMarks(student.id)}} non cotés</b-badge>
                                </div>
                            </div>
                        </b-card>
                    </li>
                </ol>
            </template>
        </template>
  </b-card>
</template>

<script>
import {STUDENTS_MET, USER} from '../../../constants'
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
        },
        user: {
            query: USER,
            variables() {
                return {
                    id: this.currentUserId
                }
            },
            update(data) {
                return data.User
            },
            loadingKey: 'loadingKey',
        },
    },
    methods: {
        goToAddMeeting(id) {
            this.$router.push({name: 'addImplementationsToMeeting', params: {studentId: id}})
        },
        userMarks(studentId) {
            return _.filter(this.user.scores, score => {
                return score.student.id === studentId
            }).length
        },
        projectMarked(implementations) {
            let projectMarked = _.filter(implementations, implementation => {
                return implementation.score !== null;
            })

            return projectMarked.length
        },
        projectNotMarked(implementations) {
            let projectNotMarked = _.filter(implementations, implementation => {
                return implementation.score === null;
            })

            return projectNotMarked.length
        }
    }
}
</script>

<style>

</style>
