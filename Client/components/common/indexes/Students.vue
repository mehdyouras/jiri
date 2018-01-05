<template>
  <div>
      <Spinner v-if="isLoading"></Spinner>
      <template v-else>
        <b-button v-b-toggle.addForm variant="primary" class="mb-3">Ajouter un étudiant</b-button>
        <b-collapse id="addForm" class="">
            <b-card class="col-md-5">
                <student-form></student-form>
            </b-card>
        </b-collapse>
        <template v-if="!students[0]">
            <p>Il n'y a pas encore d'étudiant</p>
        </template>
        <ol class="list-unstyled row mt-3" v-else>
            <li class="col-md-4 col-lg-3" v-for="student in students" :key="student.id">
                <b-card no-body show variant="secondary" class="mb-3">
                    <b-card-body class="card-text d-flex justify-content-between align-items-center">
                        <div @click.stop="studentClicked(student.id)">
                            <span class="d-block">
                                {{student.name}}
                            </span>
                            <span class="small">
                                {{student.email}}
                            </span>
                        </div>
                        <b-dropdown right v-if="editable && isAdmin" variant="light">
                            <b-dropdown-item @click="editStudent">Modifier</b-dropdown-item>
                            <b-dropdown-item @click="deleteStudent({id:student.id, name: student.name, type: 'student'})" class="text-danger">Supprimer</b-dropdown-item>
                        </b-dropdown>
                    </b-card-body>
                </b-card>
            </li>
        </ol>
      </template>
  </div>
</template>

<script>
import {ALL_STUDENTS} from '../../../constants'
import Spinner from '../../common/Spinner'
import {mapGetters} from 'vuex'
import StudentForm from '../../common/forms/StudentForm'

export default {
    name: 'IndexStudents',
    components: {
        Spinner,
        StudentForm
    },
    data() {
        return {
            students: {},
            isLoading: 0,
        }
    },
    props: [
        'editable'
    ],
    computed: {
        ...mapGetters([
            'isAdmin'
        ])
    },
    apollo: {
        students: {
            query: ALL_STUDENTS,
            update(data) {
                return data.allStudents
            },
            loadingKey: 'isLoading',
        }
    },
    methods: {
        studentClicked(id) {
            this.$emit('studentClicked', id)
        },
        editStudent(id) {
            this.$router.push({name: 'editStudent', params: {studentId: id}})
        },
        deleteItem(payload) {
            this.$emit('deleteModal', payload)
        },
    }
}
</script>

<style>

</style>
