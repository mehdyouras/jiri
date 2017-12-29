<template>
  <div>
    <h2>Modifier {{event.courseName}} - {{event.academicYear}} - {{event.examSession}}</h2>
    <keep-alive>
        <component @handleStep="handleStep" :is="currentView" :currentStep="currentStep" :viewCount="viewCount"></component>
    </keep-alive>
  </div>
</template>

<script>
import EditInfos from './editParts/EditInfos'
import EditItemsToEvent from './editParts/EditItemsToEvent'
import {mapGetters} from 'vuex'
import {EVENT} from '../../../constants'

import {Bus} from '../../../Bus'

export default {
  name: 'AddEvent',
  components: {
      EditInfos,
      EditItemsToEvent,
  },
  data() {
      return {
        event: {},
        views: [
            'EditInfos',
            'EditItemsToEvent',
            'EditItemsToEvent',
            'EditItemsToEvent',
        ],
        currentStep: 0,
      }
  },
  methods: {
      handleStep(action) {
          switch (action) {
              case 'nextStep':
                this.currentStep++
                break;
            case 'previousStep':
                this.currentStep--
                break;
            case 'complete':
                Bus.$emit('updateEvent', {...this.getCurrentAddedEvent, eventId: this.$route.params.eventId})
                this.$router.push({name: 'indexEvents'});
                break;
          }
      },
  },
  apollo: {
      event : {
          query: EVENT,
          variables() {
              return {
                  id: this.$route.params.eventId,
              }
          },
          update(data) {
              return data.Event
          }
      }
  },
  computed: {
        ...mapGetters([
            'getCurrentAddedEvent',
        ]),
        currentView() {
            return this.views[this.currentStep];
        },
        viewCount() {
            return this.views.length;
        },
  }
}
</script>
