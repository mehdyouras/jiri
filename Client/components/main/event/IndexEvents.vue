<template>
  <b-card>
      <h2 class="mb-3">Vue d'ensemble des événements</h2>
      <Spinner v-if="isLoading"></Spinner>
      <template v-else>
        <template v-if="!events[0]">
            <p>Vous n'avez pas encore créé d'événement.</p>
        </template>
        <b-button class="mb-3" variant="primary" :to="{name: 'addEvent'}">Créer un événement</b-button>
        <single-event @deleteModal="openModal" v-for="event in events" :key="event.id" :event="event"></single-event>
      </template>
      <b-modal @ok="removeEvent(modal.id)" ref="delete" title="Confirmation" ok-title="Supprimer" ok-variant="danger" cancel-title="Annuler">
          Êtes-vous sûr de vouloir <strong class="text-danger">supprimer</strong> l'événement <strong>{{modal.name}}</strong> ?
      </b-modal>
  </b-card>
</template>

<script>
import SingleEvent from './indexParts/SingleEvent'
import {mapGetters} from 'vuex'
import {USER} from '../../../constants'
import Spinner from '../../common/Spinner'
import {Bus} from '../../../Bus'

export default {
  name: 'IndexEvents',
  data() {
    return {
      events: {},
      isLoading: 0,
      modal: {
        id: "",
        name: "",
        type: "",
      }
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
  methods: {
    openModal(payload) {
      this.modal = payload;
      this.$refs.delete.show()
    },
    deleteItem() {
      Bus.$emit('deleteItem', this.modal);
      this.modal.id = "";
      this.modal.name = "";
      this.modal.type = "";
    }
  },
}
</script>

<style>

</style>
