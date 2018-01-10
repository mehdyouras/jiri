<template>
  <b-card>
      <h2>Ajouter un étudiant</h2>
      <p>Informations sur l'étudiant</p>
      <div class="row">
        <StudentForm class="col-6" @studentCreated="showModal"></StudentForm>
      </div>
      <edit-student v-if="modalVisible" :studentId="lastAddedId" :visible="modalVisible"></edit-student>
  </b-card>
</template>

<script>
import StudentForm from '../../common/forms/StudentForm'
import {mapGetters} from 'vuex'
import EditStudent from './EditStudent'

export default {
    name: 'AddStudent',
    components: {
        StudentForm,
        EditStudent
    },
    data() {
        return {
            currentView: 'StudentForm',
            modalVisible: false,
        }
    },
    computed: {
        ...mapGetters([
            'lastAddedId'
        ])
    },
    methods: {
        showModal() {
            // this.$router.push({name: 'editStudent', params: {studentId: this.lastAddedId}})
            this.modalVisible = true;
        }
    }
}
</script>

<style>

</style>
