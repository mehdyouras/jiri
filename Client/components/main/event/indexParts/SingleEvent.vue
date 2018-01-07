<template>
  <b-card class="mb-3">
      <div class="d-flex mb-3">
        <b-dropdown variant="secondary">
            <b-dropdown-item @click="goToEditEvent">Modifier</b-dropdown-item>
            <b-dropdown-item @click="removeEvent" class="text-danger">Supprimer</b-dropdown-item>
        </b-dropdown>
        <h3 class="col">{{event.courseName}} {{event.academicYear}} - {{event.examSession}}</h3>
      </div>
      <b-button class="mb-3" variant="primary" href="#" @click.prevent="goToEventResults">Consulter la grille des résultats</b-button>
      <div>
          <h4 class="mb-3">Jurys</h4>
          <ol class="list-unstyled row">
              <li class="col-md-4 col-lg-3 mb-3" v-for="jury in itemsToShow.jurys" :key="jury.id">
                  <b-card class="text-center" no-body show>
                    <strong slot="header" class="d-block">{{jury.name}}</strong>
                    <div class="p-3">
                        <span class="d-block">{{jury.company}}</span>
                        <span class="d-block">{{jury.email}}</span>
                    </div>
                  </b-card>
              </li>
          </ol>
          <h4 class="mb-3">Projets</h4>
          <ol class="list-unstyled row">
              <li class="col-md-4 col-lg-3 mb-3" v-for="project in itemsToShow.weights" :key="project.id">
                  <b-card class="text-center" no-body show>
                    <div class="p-3">
                        <span>{{project.project.name}}</span>
                    </div>
                  </b-card>
              </li>
          </ol>
          <h4 class="mb-3">Etudiants</h4>
          <ol class="list-unstyled row">
              <li class="col-md-4 col-lg-3 mb-3" v-for="student in itemsToShow.students" :key="student.id">
                  <b-card class="text-center" no-body show>
                    <strong slot="header" class="d-block">{{student.name}}</strong>
                    <div class="p-3">
                        <span>{{student.email}}</span>
                    </div>
                  </b-card>
              </li>
          </ol>
      </div>
  </b-card>
</template>

<script>
export default {
    name: 'SingleEvent',
    props: [
        'event'
    ],
    computed: {
        itemsToShow() {
            return {
                students: _.filter(this.event.students, student => student.softDelete === false),
                weights: _.filter(this.event.weights, weight => weight.softDelete === false),
                jurys: _.filter(this.event.jurys, jury => jury.softDelete === false),
            }
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
                name: `${this.event.courseName} ${this.event.academicYear} - ${this.event.examSession}`
            }
            this.$emit('deleteModal', payload);
        }
    },
}
</script>

<style>

</style>
