<template>
  <div>
      <Spinner v-if="isLoading"></Spinner>
      <template v-else>
        <router-link :to="{name: 'addEvent'}">Ajouter un étudiant</router-link>
        <template v-if="!students[0]">
            <p>Il n'y a pas encore d'étudiant</p>
        </template>
        <ol v-else>
            <li v-for="student in students" :key="student.id">
                <div @click="studentClicked(student.id)">
                    <span>{{student.name}}</span>
                    <span>{{student.email}}</span>
                </div>
                <button v-if="editable && isAdmin" @click="editStudent(student.id)">Modifier</button>
            </li>
        </ol>
      </template>
  </div>
</template>

<script>
import {ALL_STUDENTS} from '../../../constants'
import Spinner from '../../common/Spinner'
import {mapGetters} from 'vuex'

export default {
    name: 'IndexStudents',
    components: {
        Spinner
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
        }
    }
}
</script>

<style>

</style>
