<template>
  <div>
      <Sidebar></SideBar>
      <h2>Vue d'ensemble des événements</h2>
      <single-event v-for="event in currentUser.events" :key="event.id" :event="event"></single-event>
  </div>
</template>

<script>
import SingleEvent from './indexParts/SingleEvent'
import {mapGetters} from 'vuex'
import Sidebar from '../../sidebar/Sidebar'

export default {
  name: 'IndexEvents',
  components: {
    SingleEvent,
    Sidebar
  },
  computed: {
    ...mapGetters([
      'currentUser'
    ])
  },
}
</script>

<style>

</style>
