<template>
  <div>
    <Spinner v-if="!itemsLoaded"></Spinner>
    <template v-if="itemsLoaded">
      <AddItem :currentStep="currentStep"></AddItem>
      <ol v-if="currentStep === 1">
          <ListItem v-for="item in allDetails.allStudents" :currentStep="currentStep" :item="item" :key="item.id"></ListItem>
      </ol>
      <ol v-if="currentStep === 2">
          <ListItem v-for="item in allDetails.allUsers" :currentStep="currentStep" :item="item" :key="item.id"></ListItem>
      </ol>
      <ol v-if="currentStep === 3">
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
      itemsLoaded: false,
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
        this.itemsLoaded = true;
        return data
      }
    }
  },
  methods: {
    handleStep(action) {
      this.$emit('handleStep', action)
    },
  },
}
</script>

