<template>
  <div>
    <Spinner v-if="isLoading"></Spinner>
    <template v-if="!isLoading">
      <AddItem :currentStep="currentStep"></AddItem>
      <transition 
        :enter-active-class="enterAnimation"
        :leave-active-class="leaveAnimation"
        mode="out-in">
        <ol class="list-unstyled row mt-3" v-if="currentStep === 1" key="students">
            <ListItem @deleteModal="openModal" v-for="item in allDetails.allStudents" :currentStep="currentStep" :item="item" :key="item.id"></ListItem>
        </ol>
        <ol class="list-unstyled row mt-3" v-if="currentStep === 2" key="users">
            <ListItem @deleteModal="openModal" v-for="item in allDetails.allUsers" :currentStep="currentStep" :item="item" :key="item.id"></ListItem>
        </ol>
        <ol class="list-unstyled row mt-3" v-if="currentStep === 3" key="projects">
            <ListItem @deleteModal="openModal" v-for="item in allDetails.allProjects" :currentStep="currentStep" :item="item" :key="item.id"></ListItem>
        </ol>
      </transition>
      <NextPreviousButtons @handleStep='handleStep' :currentStep="currentStep" :viewCount="viewCount"></NextPreviousButtons>
    </template>
    <b-modal @ok="deleteItem(modal.id)" ref="delete" title="Confirmation" ok-title="Supprimer" ok-variant="danger" cancel-title="Annuler">
        Êtes-vous sûr de vouloir <strong class="text-danger">supprimer</strong> <strong>{{modal.name}}</strong> ?
    </b-modal>
  </div>
</template>

<script>
import {ALL_STUDENTS_USERS_PROJECTS, EVENT} from '../../../../constants'

import NextPreviousButtons from '../addParts/NextPreviousButtons'
import ListItem from './ListItem'
import Spinner from '../../../common/Spinner'
import AddItem from '../addParts/AddItem'
import _ from 'lodash'
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
    'leaveAnimation',
    'enterAnimation'
  ],
  apollo: {
    allDetails: {
      query: ALL_STUDENTS_USERS_PROJECTS,
      update(data) {
        return data;
      },
      loadingKey: 'isLoading'
    },
    event: {
      query: EVENT,
      variables() {
        return {
          id: this.$route.params.eventId
        }
      },
      update(data) {
        function students() {
          let ids = [];
          data.Event.students.forEach(element => {
            ids.push(element.id)
          })
          return ids;
        };

        function users() {
          let ids = [];
          data.Event.jurys.forEach(element => {
            ids.push(element.id)
          })
          return ids;
        };

        function weights() {
          let ids = [];
          data.Event.weights.forEach(element => {
            ids.push(element.id)
          })
          return ids;
        };

        let payload = {
          students: students(),
          weights: weights(),
          users: users(),
        }

        this.$store.commit('setEventItem', payload)

      }
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

