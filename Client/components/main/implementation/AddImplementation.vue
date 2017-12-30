<template>
  <div>
      <h2>Les implémentations de {{student.name}}</h2>
        <Spinner v-if="isLoading"></Spinner>
        <template v-else>
            <template v-if="student.event === null">
                <p>Cet étudiant n'a été assigné à aucun événement.</p>
                <div v-if="isAdmin">
                    <label for="event">Choisissez un événement</label>
                    <select v-model="eventId" name="event" id="event">
                        <option value="" disabled>Choisissez</option>
                        <option v-for="event in events" :key="event.id" :value="event.id">{{event.courseName}} {{event.academicYear}} - {{event.examSession}}</option>
                    </select>
                    <button @click="addStudentToEvent">Ajouter à l'événement</button>
                </div>
            </template>
            <template v-else>
                <button v-if="showAdd" @click="showForm">Ajouter une implémentation</button>
                <div v-show="isAdding">
                    <ImplementationForm @dontShowAdd="dontShowAdd"></ImplementationForm>
                </div>
                <ol>
                    <li v-for="implementation in student.implementations" :key="implementation.id">
                        <span>      
                            {{implementation.project.name}}
                        </span>
                        <a :href="implementation.urlProject">Vers le site</a>
                        <a :href="implementation.urlRepo">Vers le repo Github</a>
                    </li>
                </ol>
            </template>
        </template>
  </div>
</template>

<script>
import {STUDENT, USER} from '../../../constants'
import {mapGetters} from 'vuex'
import Spinner from '../../common/Spinner'
import ImplementationForm from '../../common/forms/ImplementationForm'
import {Bus} from '../../../Bus'

export default {
    name: 'AddImplementation',
    data() {
        return {
            student: {},
            events: {},
            isAdding: false,
            isLoading: 0,
            eventId: '',
            showAdd: true,
        }
    },
    components: {
        Spinner,
        ImplementationForm
    },
    computed: {
        ...mapGetters([
            'currentUserId',
            'isAdmin'
        ])
    },
    methods: {
        showForm() {
            this.isAdding = true;
        },
        addStudentToEvent() {
            let payload = {
                eventId: this.eventId,
                studentId: this.student.id 
            }
            Bus.$emit('addStudentToEvent', payload)
        },
        dontShowAdd() {
            this.showAdd = false;
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
            loadingKey: 'isLoading',
            update(data) {
                return data.Student
            }
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
            }
        }
    }
}
</script>

<style>

</style>
