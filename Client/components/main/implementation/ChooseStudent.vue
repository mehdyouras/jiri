<template>
  <b-card>
      <h2>Vue d'ensemble des implémentations</h2>
      <p>Séléctionner un étudiant pour afficher<template v-if="isAdmin">/ajouter</template> ses implémentations</p>
      <Students :editable="true" @studentClicked="goToEditStudent"></Students>
  </b-card>
</template>

<script>
import Students from '../../common/indexes/Students'
import {mapGetters} from 'vuex'

export default {
    name: 'ChooseStudentForImplementation',
    components: {
        Students,
    },
    computed: {
        ...mapGetters([
            'isAdmin'
        ])
    },
    methods: {
        goToEditStudent(id) {
            this.$children[0].editStudent(id)
        }
    }
}
</script>

<style>

</style>
