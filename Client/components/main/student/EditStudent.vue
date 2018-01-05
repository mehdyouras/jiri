<template>
  <b-card>
      <h2 class="mb-3" v-if="!isEditingName" @dblclick="editName">{{student.name}}</h2>
      <b-row v-else @keyup.enter="saveName">
        <b-form-input class="col-2 large mb-3" size="lg" id="name" name="name" type="text" v-validate="'required'" v-model.trim="name" :state="!this.errors.has('name')"></b-form-input>
      </b-row>
      <Spinner v-if="isLoading"></Spinner>
      <template  v-else>
        <label for="event">Modifier son événement</label>
        <select @change="switchEvent" v-model="eventId" name="event" id="event">
            <option value="" disabled>Choisissez</option>
            <option v-for="event in events" :key="event.id" :value="event.id">{{event.courseName}} {{event.academicYear}} - {{event.examSession}}</option>
        </select>
        <b-alert show variant="danger" v-if="!projects[0]">Cet événement n'a aucun projet.</b-alert>
        <div v-else v-for="project in projects" :key="project.project.id">
            <SingleProjectForm :project="project.project" :student="student"></SingleProjectForm>
        </div>
      </template>
      <button @click="saveEdit">Envoyer</button>
  </b-card>
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
            isEditingName: false,
            name: "",
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
            this.$router.push({name: 'indexStudents'})
        },
        switchEvent() {
            Bus.$emit('addStudentToEvent', {eventId: this.eventId, studentId: this.$route.params.studentId})
        },
        editName() {
            this.isEditingName = true;
        },
        saveName() {
            Bus.$emit('updateStudentName', {studentId: this.$route.params.studentId, name: this.name})
            this.isEditingName = false;
        }
    },
    apollo: {
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
                this.name = data.Student.name
                this.projects = data.Student.event.weights;
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
