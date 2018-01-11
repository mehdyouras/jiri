<template>
  <b-card>
    <h2 class="mb-3">Résultats - {{event.courseName}} {{event.academicYear}} - {{event.examSession}}</h2>
    <b-btn class="mb-3" :to="{name: 'printResults', params: {eventId: $route.params.eventId}}">Version imprimable</b-btn>
    <Spinner v-if="isLoading"></Spinner>
    <div v-else class="row">
      <single-result-table v-for="student in event.students" :key="student.id" :student="student" :globalComments="globalComments"></single-result-table>
    </div>
  </b-card>
</template>

<script>
import {EVENT, ALL_GLOBAL_COMMENTS, SUB_SCORE_CREATED} from '../../../constants'
import SingleResultTable from './resultsPart/SingleResultTable'
import Spinner from '../../common/Spinner'

export default {
    name: 'EventResults',
    components: {
      SingleResultTable,
      Spinner
    },
    data() {
      return {
        event: {},
        globalComments: {},
        isLoading: 0,
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
        },
        pollInterval: 1500,
        loadingKey: 'isLoading'
      },
      globalComments: {
        query: ALL_GLOBAL_COMMENTS,
        update(data) {
          return data.allGlobalComments
        },
        pollInterval: 1500,
        loadingKey: 'isLoading'
      }
    },
}
</script>