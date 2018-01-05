<template>
  <div>
      <h2>Vue d'ensemble des étudiants</h2>
      <Students @deleteModal="openModal" :editable="true" @studentClicked="goToAddMeeting"></Students>
      <b-modal @ok="removeEvent(modal.id)" ref="delete" title="Confirmation" ok-title="Supprimer" ok-variant="danger" cancel-title="Annuler">
          Êtes-vous sûr de vouloir <strong class="text-danger">supprimer</strong> l'événement <strong>{{modal.name}}</strong> ?
      </b-modal>
  </div>
</template>

<script>
import {ALL_STUDENTS} from '../../../constants'
import Students from '../../common/indexes/Students'

export default {
    name: 'IndexStudents',
    data() {
        return {
            modal: {
                id: "",
                name: "",
                type: "",
            }
        }
    },
    components: {
        Students,
    },
    methods: {
        goToAddMeeting(id) {
            this.$router.push({name:'addImplementationsToMeeting', params: {studentId: id}})
        },
        openModal(payload) {
            this.modal = payload;
            this.$refs.delete.show()
        },
        deleteItem() {
            Bus.$emit('deleteItem', this.modal);
            this.modal.id = "";
            this.modal.name = "";
            this.modal.type = "";
        }
    }
}
</script>

<style>

</style>
