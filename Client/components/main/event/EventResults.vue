<template>
  <b-card>
    <h2 class="mb-3">Résultats - {{event.courseName}} {{event.academicYear}} - {{event.examSession}}</h2>
    <div class="row">
      <single-result-table v-for="student in event.students" :key="student.id" :student="student"></single-result-table>
    </div>
  </b-card>
</template>

<script>
import {EVENT} from '../../../constants'
import SingleResultTable from './resultsPart/SingleResultTable'

export default {
    name: 'EventResults',
    components: {
      SingleResultTable
    },
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