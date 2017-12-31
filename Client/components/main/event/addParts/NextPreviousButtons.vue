<template>
  <div>
    <button v-if="currentStep !== 0" @click="handleStep('previousStep')">Précédent</button>
    <button v-if="currentStep < (viewCount - 1)" @click="handleStep('nextStep')">Suivant</button>
    <button v-if="currentStep === (viewCount - 1)" @click="handleStep('complete')">Envoyer</button>
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

