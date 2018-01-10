<template>
  <b-modal @hidden="hidden" :visible="visible" @ok="editStudent()" ref="edit" ok-title="Sauvegarder" ok-variant="primary" cancel-title="Annuler">
      <div slot="modal-header">
        <h2 v-if="!isEditingName" @dblclick="editName">{{student.name}}</h2>
        <div class="d-flex" v-else @keyup.enter="saveName">
            <b-form-input class="col mr-3"  id="name" name="name" type="text" v-validate="'required'" v-model.trim="name" :class="{'is-invalid': this.errors.has('name')}"></b-form-input>
            <b-btn class="" @click="saveName" variant="primary">Sauvegarder</b-btn>
        </div>
      </div>
      <Spinner v-if="isLoading"></Spinner>
      <template v-else>
          <div class="">
            <b-form-group class="pl-0" label="Modifier son événement"
                        label-for="event">
                <b-form-select @input="switchEvent" label="Modifier son événement" v-model='eventId' name="event" id="event">
                    <option value="" disabled>Choisissez</option>
                    <option v-for="event in events" :key="event.id" :value="event.id">{{event.courseName}} {{event.academicYear}} - {{event.examSession}}</option>
                </b-form-select>
            </b-form-group>
          </div>
            <b-alert show variant="warning" v-if="!projects[0]">Cet événement n'a aucun projet. Veuillez en séléctionner un autre ou <router-link :to="{name: 'editEvent', params : {eventId: student.event.id}}">ajouter des projets à cet événement</router-link>.</b-alert>
            <div v-else v-for="project in projects" :key="project.project.id">
                <SingleProjectForm :project="project.project" :student="student"></SingleProjectForm>
            </div>
      </template>
  </b-modal>
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
    props: [
        'studentId',
        'visible'
    ],
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
        hidden() {
            this.$emit('hidden')
            this.edit = {};
        },
        editStudent() {
            // Determines if implementation need update or create
            this.currentAddedImplementations.forEach(implementation => {
                if(implementation.id) {
                    Bus.$emit('updateImplementation', implementation)
                } else {
                    Bus.$emit('createImplementation', implementation)
                }
            });
        },
        switchEvent() {
            Bus.$emit('addStudentToEvent', {eventId: this.eventId, studentId: this.studentId})
        },
        editName() {
            this.isEditingName = true;
        },
        saveName() {
            Bus.$emit('updateStudentName', {studentId: this.studentId, name: this.name})
            this.isEditingName = false;
        }
    },
    created() {
        this.edit = this.student;
    },
    apollo: {
        student: {
            query: STUDENT,
            variables() {
                return {
                    id: this.studentId
                }
            },
            update(data) {
                if(data.Student.event !== null) {
                    this.eventId = data.Student.event.id
                }
                this.name = data.Student.name
                if(data.Student.event) {
                    this.projects = data.Student.event.weights;
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
