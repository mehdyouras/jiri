<template>
    <div class="">
      <Spinner v-if="isLoading"></Spinner>
      <template v-if="!isLoading">
        <AddItem :currentStep="currentStep"></AddItem>
        <transition 
            :enter-active-class="enterAnimation"
            :leave-active-class="leaveAnimation"
            mode="out-in">
          <ol class="list-unstyled row mt-3" v-if="currentStep === 1" key="students">
              <ListItem v-for="item in allDetails.allStudents" :currentStep="currentStep" :item="item" :key="item.id"></ListItem>
          </ol>
          <ol class="list-unstyled row mt-3" v-if="currentStep === 2" key="users">
              <ListItem v-for="item in allDetails.allUsers" :currentStep="currentStep" :item="item" :key="item.id"></ListItem>
          </ol>
          <ol class="list-unstyled row mt-3" v-if="currentStep === 3" key="projects">
              <ListItem v-for="item in allDetails.allProjects" :currentStep="currentStep" :item="item" :key="item.id"></ListItem>
          </ol>
        </transition>
        <NextPreviousButtons @handleStep='handleStep' :currentStep="currentStep" :viewCount="viewCount"></NextPreviousButtons>
      </template>
    </div>
</template>

<script>
import {ALL_STUDENTS_USERS_PROJECTS} from '../../../../constants/allStudentsUsersProjects.gql'

import NextPreviousButtons from './NextPreviousButtons'
import ListItem from './ListItem'
import Spinner from '../../../common/Spinner'
import AddItem from './AddItem'

export default {
  name: 'AddItemsToEvent',
  data() {
    return {
      isLoading: 0,
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
  },
}
</script>

