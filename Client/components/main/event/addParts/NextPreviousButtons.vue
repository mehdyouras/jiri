<template>
  <div>
    <b-button v-if="currentStep !== 0" @click="handleStep('previousStep')">Précédent</b-button>
    <b-button variant="primary" v-if="currentStep < (viewCount - 1)" @click="handleStep('nextStep')">Suivant</b-button>
    <b-button variant="primary" v-if="currentStep === (viewCount - 1)" @click="handleStep('complete')">Envoyer</b-button>
  </div>
</template>
<script>
export default {
  name: 'NextPreviousButtons',
  props: [
    'currentStep',
    'viewCount',
  ],
  methods: {
      handleStep(action) {
          this.$emit('handleStep', action)
      },
  }
}
</script>

