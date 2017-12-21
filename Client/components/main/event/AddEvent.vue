<template>
  <div @handleStep="handleStep">
    <h2>Ajouter un événement</h2>
    <component :is="currentView" :currentStep="currentStep"></component>
  </div>
</template>

<script>
import AddInfos from './parts/AddInfos'
import AddStudents from './parts/AddStudents'

export default {
  name: 'AddEvent',
  components: {
      AddInfos,
      AddStudents,
  },
  data() {
      return {
        views: [
            'AddInfos',
            'AddStudents',
        ],
        currentStep: 1,
      }
  },
  methods: {
      handleStep(action) {
          console.log(action)
          switch (action) {
            case 'nextStep':
                this.currentStep++
                break;
            case 'previousStep':
                this.currentStep--
          }
      }
  },
  computed: {
      currentView() {
          return this.views[this.currentStep];
      }
  }
}
</script>
