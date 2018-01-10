<template>
  <div>
      <Spinner v-if="isLoading"></Spinner>
      <template v-else>
          <template v-if="isAdmin">
            <b-button v-b-toggle.addForm variant="primary" class="mb-3">Ajouter un étudiant</b-button>
            <b-collapse id="addForm" class="">
                <b-card class="col-md-5">
                    <student-form></student-form>
                </b-card>
            </b-collapse>
          </template>
        
        <template>
            <section v-if="students(event.id)" v-for="event in juryTo" :key="event.id">
                <h3>{{event.courseName}} {{event.academicYear}} - {{event.examSession}}</h3>
                <transition-group tag="ol" name="zoom" class="list-unstyled row mt-3">
                    <li class="col-md-4 col-lg-3" v-for="student in students(event.id)" :key="student.id">
                        <b-card no-body show variant="secondary" class="mb-3">
                            <div class="card-text d-flex justify-content-between align-items-center">
                                <div @click.stop="studentClicked(student.id)" class="p-3 card-clickable">
                                    <span class="d-block">
                                        {{student.name}}
                                    </span>
                                    <span class="small">
                                        {{student.email}}
                                    </span>
                                </div>
                                <b-dropdown class="p-3" right v-if="editable && isAdmin" variant="light">
                                    <b-dropdown-item @click="editStudent(student.id)">Modifier</b-dropdown-item>
                                    <b-dropdown-item @click="openModal({id:student.id, name: student.name, type: 'student'})" class="text-danger">Supprimer</b-dropdown-item>
                                </b-dropdown>
                            </div>
                        </b-card>
                    </li>
                </transition-group>
            </section>
            <template v-else>
                <p>Il n'y a pas encore d'étudiant</p>
            </template>
        </template>
      </template>
      <b-modal @ok="deleteItem()" ref="delete" title="Confirmation" ok-title="Supprimer" ok-variant="danger" cancel-title="Annuler">
          Êtes-vous sûr de vouloir <strong class="text-danger">supprimer</strong> l'étudiant <strong>{{modal.name}}</strong> ?
      </b-modal>
      <edit-student v-if="editModal.show" @hidden="editModal.show = false" :visible="editModal.show" :studentId="studentIdToEdit"></edit-student>
  </div>
</template>

<script>
import {ALL_STUDENTS, USER} from '../../../constants'
import Spinner from '../../common/Spinner'
import {mapGetters} from 'vuex'
import StudentForm from '../../common/forms/StudentForm'
import {Bus} from '../../../Bus'
import EditStudent from '../../main/student/EditStudent'

export default {
    name: 'IndexStudents',
    components: {
        Spinner,
        StudentForm,
        EditStudent
    },
    data() {
        return {
            user: {},
            isLoading: 0,
            modal: {
                id: "",
                name: "",
                type: "",
            },
            editModal: {
                show: false,
            },
            studentIdToEdit: "",
        }
    },
    props: [
        'editable'
    ],
    computed: {
        ...mapGetters([
            'isAdmin',
            'currentUserId'
        ]),
        juryTo() {
            return _.filter(this.user.juryTo, event => {
                return event.softDelete === false;
            })
        },
    },
    apollo: {
        user: {
            query: USER,
            variables() {
                return {
                    id: this.currentUserId,
                }
            },
            update(data) {
                return data.User
            },
            loadingKey: 'isLoading',
        }
    },
    methods: {
        students(eventId) {
            let index = _.findIndex(this.user.juryTo, event => {
                return event.id === eventId
            })
            return _.filter(this.user.juryTo[index].students, student => {
                return student.softDelete === false;
            })
        },
        studentClicked(id) {
            this.$emit('studentClicked', id)
        },
        editStudent(id) {
            this.studentIdToEdit = id;
            this.editModal.show = true;
        },
        openModal(payload) {
            this.modal = payload;
            this.$refs.delete.show()
        },
        deleteItem() {
            Bus.$emit('removeItem', this.modal);
            this.modal.id = "";
            this.modal.name = "";
            this.modal.type = "";
        }
    }
}
</script>

<style lang="scss">

</style>

