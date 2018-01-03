<template>
  <b-card>
      <h2>Vue d'ensemble des événements</h2>
      <Spinner v-if="isLoading"></Spinner>
      <template v-else>
        <template v-if="!events[0]">
            <p>Vous n'avez pas encore créé d'événement.</p>
        </template>
        <b-button variant="primary" :to="{name: 'addEvent'}">Créer un événement</b-button>
        <single-event v-for="event in events" :key="event.id" :event="event"></single-event>
      </template>
  </b-card>
</template>

<script>
import SingleEvent from './indexParts/SingleEvent'
import {mapGetters} from 'vuex'
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
