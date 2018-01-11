<template>
    <div class="">
      <Spinner v-if="isLoading"></Spinner>
      <template v-if="!isLoading">
        <AddItem :currentStep="currentStep"></AddItem>
        <transition-group 
            :enter-active-class="enterAnimation"
            :leave-active-class="leaveAnimation"
            mode="out-in">
          <transition-group tag="ol" name="zoom" class="list-unstyled row mt-3" v-if="currentStep === 1 && students[0]" key="students">
              <ListItem @deleteModal="openModal" v-for="item in students" :currentStep="currentStep" :item="item" :key="item.id"></ListItem>
          </transition-group>
          <transition-group tag="ol" name="zoom" class="list-unstyled row mt-3" v-if="currentStep === 2" key="users">
              <ListItem @deleteModal="openModal" v-for="item in allDetails.allUsers" :currentStep="currentStep" :item="item" :key="item.id"></ListItem>
          </transition-group>
          <transition-group tag="ol" name="zoom" class="list-unstyled row mt-3" v-if="currentStep === 3" key="projects">
              <ListItem @deleteModal="openModal" v-for="item in allDetails.allProjects" :currentStep="currentStep" :item="item" :key="item.id"></ListItem>
          </transition-group>
        </transition-group>
        <b-alert key="alert" class="mt-3" show v-if="currentStep === 1 && !students[0]" variant="warning">Il n'y a aucun étudiant disponible.</b-alert>
        <NextPreviousButtons @handleStep='handleStep' :currentStep="currentStep" :viewCount="viewCount"></NextPreviousButtons>
      </template>
      <b-modal @ok="deleteItem(modal.id)" ref="delete" title="Confirmation" ok-title="Supprimer" ok-variant="danger" cancel-title="Annuler">
        Êtes-vous sûr de vouloir <strong class="text-danger">supprimer</strong> <strong>{{modal.name}}</strong> ?
      </b-modal>
    </div>
</template>

<script>
import {ALL_STUDENTS_USERS_PROJECTS} from '../../../../constants/allStudentsUsersProjects.js'

import NextPreviousButtons from './NextPreviousButtons'
import ListItem from './ListItem'
import Spinner from '../../../common/Spinner'
import AddItem from './AddItem'
import {Bus} from '../../../../Bus'

export default {
  name: 'AddItemsToEvent',
  data() {
    return {
      isLoading: 0,
      modal: {
        id: "",
        name: "",
      },
    }
  },
  components: {
      NextPreviousButtons,
      ListItem,
      Spinner,
      AddItem,
  },
  props: [
    'currentStep',
    'viewCount',
    'enterAnimation',
    'leaveAnimation'
  ],
  computed: {
    students() {
      return _.filter(this.allDetails.allStudents, student => {
        if(!student.event) {
          return student
        }
      })
    },
  },
  apollo: {
    allDetails: {
      query: ALL_STUDENTS_USERS_PROJECTS,
      update(data) {
        return data
      },
      loadingKey: 'isLoading'
    }
  },
  methods: {
    handleStep(action) {
      this.$emit('handleStep', action)
    },
    openModal(payload) {
      this.modal = payload;
      this.$refs.delete.show()
    },
    deleteItem(id) {
      let type = ['student', 'user', 'project']
      Bus.$emit('removeItem', {id, type: type[this.currentStep - 1]})
      this.modal.id = "";
      this.modal.name = "";
    }
  },
}
</script>

