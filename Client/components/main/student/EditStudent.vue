<template>
  <b-modal @hidden="hidden" :visible="visible" @ok="editStudent()" ref="edit" ok-title="Sauvegarder" ok-variant="primary" cancel-title="Annuler">
      <div slot="modal-header">
        <h2 v-if="!isEditingName" @dblclick="editName">{{student.name}}</h2>
        <div class="d-flex" v-else @keyup.enter="saveName">
            <b-form-input class="col mr-3"  id="name" name="name" type="text" v-validate="'required'" v-model.trim="name" :class="{'is-invalid': this.errors.has('name')}"></b-form-input>
            <b-btn @click="saveName" variant="primary">Sauvegarder</b-btn>
        </div>
      </div>
      <Spinner v-if="isLoading"></Spinner>
      <b-alert show variant="warning" v-else-if="!events[0]">Il n'y a aucun événement disponible.</b-alert>
      <template v-else>
          <div>
            <b-form-group class="pl-0" label="Modifier son événement"
                        label-for="event">
                <b-form-select @input="switchEvent" label="Modifier son événement" v-model='eventId' name="event" id="event">
                    <option value="" disabled>Choisissez</option>
                    <option v-for="event in events" :key="event.id" :value="event.id">{{event.courseName}} {{event.academicYear}} - {{event.examSession}}</option>
                </b-form-select>
            </b-form-group>
          </div>
            <b-alert show variant="warning" v-if="!projects[0]">Cet événement n'a aucun projet. Veuillez en séléctionner un autre.</b-alert>
            <div v-if="eventId !== ''" v-for="project in projects" :key="project.project.id">
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
                if(data.Student.event !== null && data.Student.event.softDelete === false) {
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
                return _.filter(data.User.juryTo, event => {
                    return event.softDelete === false;
                })
                // return data.User.events
            },
            loadingKey: 'isLoading'
        }
    },
}
</script>

<style>

</style>
