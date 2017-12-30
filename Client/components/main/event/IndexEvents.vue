<template>
  <div>
      <h2>Vue d'ensemble des événements</h2>
      <Spinner v-if="isLoading"></Spinner>
      <template v-else>
        <router-link :to="{name: 'addEvent'}">Créer un événement</router-link>
        <template v-if="!events[0]">
            <p>Vous n'avez pas encore créé d'événement.</p>
        </template>
        <single-event v-for="event in events" :key="event.id" :event="event"></single-event>
      </template>
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
      events: {},
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
    events: {
      query: USER,
      variables() {
        return {
          id: this.currentUserId
        }
      },
      loadingKey: 'isLoading',
      update(data) {
        let eventsToShow = _.filter(data.User.events, event => {
          return event.softDelete === false;
        })
        return eventsToShow
      }
    }
  },
}
</script>

<style>

</style>
