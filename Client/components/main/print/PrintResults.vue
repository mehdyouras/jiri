<template>
  <section>
      <h2>Résultats de l'événement {{event.courseName}} {{event.academicYear}} - {{event.examSession}}</h2>
      <single-result-table :printable="true" v-for="student in event.students" :key="student.id" :student="student" :globalComments="globalComments"></single-result-table>
  </section>
</template>

<script>
import {EVENT, ALL_GLOBAL_COMMENTS} from '../../../constants'
import SingleResultTable from '../event/resultsPart/SingleResultTable'

export default {
    name: 'PrintResults',
    components: {
        SingleResultTable
    },
    data() {
        return {
            event: {},
            globalComments: {},
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

<style>

</style>
