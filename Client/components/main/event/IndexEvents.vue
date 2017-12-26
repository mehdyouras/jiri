<template>
  <div>
      <Sidebar></SideBar>
      <h2>Vue d'ensemble des événements</h2>
      <Spinner v-if="isLoading"></Spinner>
      <single-event v-if="!isLoading" v-for="event in currentUser.events" :key="event.id" :event="event"></single-event>
  </div>
</template>

<script>
import SingleEvent from './indexParts/SingleEvent'
import {mapGetters} from 'vuex'
import Sidebar from '../../sidebar/Sidebar'
import {USER} from '../../../constants'
import Spinner from '../../common/Spinner'

export default {
  name: 'IndexEvents',
  data() {
    return {
      currentUser: {},
      isLoading: 0,
    }
  },
  components: {
    SingleEvent,
    Sidebar,
    Spinner
  },
  computed: {
    ...mapGetters([
      'currentUserId'
    ]),
  },
  apollo: {
    currentUser: {
      query: USER,
      variables() {
        return {
          id: this.currentUserId
        }
      },
      loadingKey: 'isLoading',
      update(data) {
        return data.User
      }
    }
  },
}
</script>

<style>

</style>
