<template>
  <div>
    <Spinner v-if="!itemsLoaded"></Spinner>
    <template v-if="itemsLoaded">
      <AddItem @formHasChanged="handleQuery" :currentStep="currentStep"></AddItem>
      <ol>
          <ListItem v-for="item in items" :item="item" :key="item.id"></ListItem>
      </ol>
      <NextPreviousButtons @handleStep='handleStep' :currentStep="currentStep" :viewCount="viewCount"></NextPreviousButtons>
    </template>
  </div>
</template>

<script>
import NextPreviousButtons from './NextPreviousButtons'
import ListItem from './ListItem'
import Spinner from '../../../common/Spinner'
import AddItem from './AddItem'

import VueApollo from 'vue-apollo'

import {ALL_USERS} from '../../../../constants/allUsers.gql'
import {ALL_STUDENTS} from '../../../../constants/allStudents.gql'
import {ALL_PROJECTS} from '../../../../constants/allProjects.gql'

export default {
  name: 'AddPersons',
  data() {
    return {
      itemsLoaded: false,
      items: {},
      queries: [false, ALL_STUDENTS, ALL_USERS, ALL_PROJECTS],
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
  methods: {
    handleStep(action) {
      this.$emit('handleStep', action)
    },
    handleQuery() {
      if(this.queryToPerform) {
      this.$apollo.query({
        query: this.queryToPerform,
      }).then((data) => {
          this.items = data.data[Object.keys(data.data)[0]];
          this.itemsLoaded = true;
        }
      )
    }
    }
  },
  computed: {
    queryToPerform() {
      return this.queries[this.currentStep];
    }
  },
  mounted() {
    this.handleQuery();
  }
}
</script>

