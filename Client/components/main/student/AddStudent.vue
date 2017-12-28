<template>
  <div>
      <h2>Ajouter un étudiant</h2>
      <p v-if="currentView === 'StudentForm'">Informations sur l'étudiant</p>
      <p v-else>Ajoutez ses implémentations</p>
      <component :is="currentView"></component> 
  </div>
</template>

<script>
import StudentForm from '../../common/forms/StudentForm'
import AddImplementationsToStudent from './addParts/AddImplementationsToStudent'

export default {
    name: 'AddStudent',
    data() {
        return {
            currentView: 'StudentForm'
        }
    },
    components: {
        StudentForm,
        AddImplementationsToStudent
    },
    methods: {
        nextStep() {
            this.currentView = 'AddImplementationsToStudent';
        }
    }
}
</script>

<style>

</style>
