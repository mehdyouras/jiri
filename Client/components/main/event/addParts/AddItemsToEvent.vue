<template>
  <div class="">
    <Spinner v-if="isLoading"></Spinner>
    <template v-if="!isLoading">
      <AddItem :currentStep="currentStep"></AddItem>
      <ol class="list-unstyled row" v-if="currentStep === 1">
          <ListItem v-for="item in allDetails.allStudents" :currentStep="currentStep" :item="item" :key="item.id"></ListItem>
      </ol>
      <ol class="list-unstyled row" v-if="currentStep === 2">
          <ListItem v-for="item in allDetails.allUsers" :currentStep="currentStep" :item="item" :key="item.id"></ListItem>
      </ol>
      <ol class="list-unstyled row" v-if="currentStep === 3">
          <ListItem v-for="item in allDetails.allProjects" :currentStep="currentStep" :item="item" :key="item.id"></ListItem>
      </ol>
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

