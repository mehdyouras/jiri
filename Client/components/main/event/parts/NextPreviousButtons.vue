<template>
  <div>
    <button @click="handleStep('nextStep')">Suivant</button>
    <button v-if="currentStep !== 0" @click="handleStep('previousStep')">Précédent</button>
  </div>
</template>
<script>
export default {
  name: 'NextPreviousButtons',
  props: [
    'currentStep'
  ],
  methods: {
      handleStep(action) {
          console.log(action)
          this.$emit('handleStep', action)
      },
  }
}
</script>

