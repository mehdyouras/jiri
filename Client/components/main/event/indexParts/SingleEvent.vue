<template>
  <b-card>
      <div class="d-flex mb-3">
        <b-dropdown variant="secondary">
            <b-dropdown-item @click="goToEditEvent">Modifier</b-dropdown-item>
            <b-dropdown-item v-b-modal.delete class="text-danger">Supprimer</b-dropdown-item>
        </b-dropdown>
        <h3 class="col">{{event.courseName}} {{event.academicYear}} - {{examSession}}</h3>
      </div>
      <b-button class="mb-3" variant="primary" href="#" @click.prevent="goToEventResults">Consulter la grille des résultats</b-button>
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
      <b-modal @ok="removeEvent" id="delete" title="Confirmation" ok-title="Supprimer" ok-variant="danger" cancel-title="Annuler">
          Êtes-vous sûr de vouloir <strong class="text-danger">supprimer</strong> l'événement <strong>{{event.courseName}} {{event.academicYear}} - {{examSession}}</strong> ?
      </b-modal>
  </b-card>
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
