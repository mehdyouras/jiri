<template>
  <b-card>
    <h2>Résultats des étudiants - {{event.courseName}} {{event.academicYear}} - {{event.examSession}}</h2>
  </b-card>
</template>

<script>
import Event from '../../../constants'

export default {
    name: 'EventResults',
    data() {
      return {
        event: {},
      }
    },
    apollo: {
      event: {
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
    }
}
</script>