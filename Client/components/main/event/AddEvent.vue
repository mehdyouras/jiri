<template>
  <div>
    <h2>Ajouter un événement</h2>
    <keep-alive>
        <component @handleStep="handleStep" :is="currentView" :currentStep="currentStep" :viewCount="viewCount"></component>
    </keep-alive>
  </div>
</template>

<script>
import AddInfos from './parts/AddInfos'
import AddItemsToEvent from './parts/AddItemsToEvent'
import AddProjects from './parts/AddProjects'

export default {
  name: 'AddEvent',
  components: {
      AddInfos,
      AddItemsToEvent,
      AddProjects,
  },
  data() {
      return {
        views: [
            'AddInfos',
            'AddItemsToEvent',
            'AddItemsToEvent',
            'AddItemsToEvent',
        ],
        currentStep: 0,
      }
  },
  methods: {
      handleStep(action) {
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
      },
      viewCount() {
          return this.views.length;
      },
  }
}
</script>
