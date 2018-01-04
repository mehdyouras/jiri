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
          <ol class="list-unstyled row">
              <li class="col-md-4 col-lg-3 mb-3" v-for="jury in event.jurys" :key="jury.id">
                  <b-card class="text-center" no-body show>
                    <strong slot="header" class="d-block">{{jury.name}}</strong>
                    <b-card-body>
                        <span class="d-block">{{jury.company}}</span>
                        <span class="d-block">{{jury.email}}</span>
                    </b-card-body>
                  </b-card>
              </li>
          </ol>
          <h4>Projets</h4>
          <ol class="list-unstyled row">
              <li class="col-md-4 col-lg-3 mb-3" v-for="project in event.weights" :key="project.id">
                  <b-card class="text-center" no-body show>
                    <b-card-body>
                        <span>{{project.project.name}}</span>
                    </b-card-body>
                  </b-card>
              </li>
          </ol>
          <h4>Etudiants</h4>
          <ol class="list-unstyled row">
              <li class="col-md-4 col-lg-3 mb-3" v-for="student in event.students" :key="student.id">
                  <b-card class="text-center" no-body show>
                    <strong slot="header" class="d-block">{{student.name}}</strong>
                    <b-card-body>
                        <span>{{student.email}}</span>
                    </b-card-body>
                  </b-card>
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
