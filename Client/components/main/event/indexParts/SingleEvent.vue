<template>
  <div>
      <h3>{{event.courseName}} {{event.academicYear}} - {{examSession}}</h3>
      <a href="#" @click.prevent="goToEventResults">Consulter la grille des résultats</a>
      <a href="#" @click.prevent="goToEditEvent">Modifier l'événement</a>
      <a href="#" @click.prevent="removeEvent">Supprimer l'événement</a>
      <div>
          <h4>Jurys</h4>
          <ol>
              <li v-for="jury in event.jurys" :key="jury.id">
                  <span>{{jury.name}}</span>
                  <span>{{jury.company}}</span>
                  <span>{{jury.email}}</span>
              </li>
          </ol>
          <h4>Projets</h4>
          <ol>
              <li v-for="project in event.weights" :key="project.id">
                  <span>{{project.project.name}}</span>
              </li>
          </ol>
          <h4>Etudiants</h4>
          <ol>
              <li v-for="student in event.students" :key="student.id">
                  <span>{{student.name}}</span>
                  <span>{{student.email}}</span>
              </li>
          </ol>
      </div>
  </div>
</template>

<script>
import {Bus} from '../../../../Bus'

export default {
    name: 'SingleEvent',
    props: [
        'event'
    ],
    computed: {
        examSession() {
            let examSession = this.event.examSession;
            return examSession.charAt(0).toUpperCase() + examSession.slice(1);;
        }
    },
    methods: {
        goToEventResults() {
            this.$router.push({name: 'eventResults', params: {eventId: this.event.id}})
        },
        goToEditEvent() {
            this.$router.push({name: 'editEvent', params: {eventId: this.event.id}})
        },
        removeEvent() {
            let payload = {
                type: 'event',
                id: this.event.id,
            }
            Bus.$emit('removeItem', payload);
        }
    },
}
</script>

<style>

</style>
