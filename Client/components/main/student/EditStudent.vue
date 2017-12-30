<template>
  <div>
      <h2>{{student.name}}</h2>
      <Spinner v-if="isLoading"></Spinner>
      <template  v-else>
        <label for="event">Modifier son événement</label>
        <select v-model="eventId" name="event" id="event">
            <option value="" disabled>Choisissez</option>
            <option v-for="event in events" :key="event.id" :value="event.id">{{event.courseName}} {{event.academicYear}} - {{event.examSession}}</option>
        </select>
        <div v-for="project in projects" :key="project.id">
            <SingleProjectForm :project="project" :student="student"></SingleProjectForm>
        </div>
      </template>
      <button @click="saveEdit">Envoyer</button>
  </div>
</template>

<script>
import {ALL_PROJECTS, STUDENT, USER} from '../../../constants'
import SingleProjectForm from './editParts/SingleProjectForm.vue'
import Spinner from '../../common/Spinner'
import {mapGetters} from 'vuex'
import {Bus} from '../../../Bus'

export default {
    name: 'EditStudent',
    components: {
        SingleProjectForm,
        Spinner
    },
    data() {
        return {
            projects: {},
            student: {},
            events: {},
            isLoading: 0,
            eventId: '',
        }
    },
    computed: {
        ...mapGetters([
            'currentAddedImplementations',
            'currentUserId'
        ])
    },
    methods: {
        saveEdit() {
            // Determines if implementation need update or create
            this.currentAddedImplementations.forEach(implementation => {
                if(implementation.id) {
                    Bus.$emit('updateImplementation', implementation)
                } else {
                    Bus.$emit('createImplementation', implementation)
                }
            });
            Bus.$emit('addStudentToEvent', {eventId: this.eventId, studentId: this.$route.params.studentId})
            this.$router.push({name: 'indexStudents'})
        }
    },
    apollo: {
        projects: {
            query: ALL_PROJECTS,
            update(data){
                return data.allProjects
            },
            loadingKey: 'isLoading'
        },
        student: {
            query: STUDENT,
            variables() {
                return {
                    id: this.$route.params.studentId
                }
            },
            update(data) {
                if(data.Student.event !== null) {
                    this.eventId = data.Student.event.id
                }
                return data.Student
            },
            loadingKey: 'isLoading'
        },
        events: {
            query: USER,
            variables() {
                return {
                    id: this.currentUserId,
                }
            },
            update(data) {
                return data.User.events
            },
            loadingKey: 'isLoading'
        }
    },
}
</script>

<style>

</style>
