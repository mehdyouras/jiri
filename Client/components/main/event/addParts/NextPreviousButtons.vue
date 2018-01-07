<template>
  <div>
    <b-button v-if="currentStep !== 0" @click="handleStep('previousStep')">Précédent</b-button>
    <b-button variant="primary" v-if="currentStep < (viewCount - 1)" @click="handleStep('nextStep')">Suivant</b-button>
    <b-button variant="primary" v-if="currentStep === (viewCount - 1)" @click="handleStep('complete')">
      <template v-if="!isMutationLoading">
        Envoyer
      </template>
      <Spinner v-else></Spinner>
    </b-button>
  </div>
</template>
<script>
import Spinner from '../../../common/Spinner'
import {mapGetters} from 'vuex'

export default {
  name: 'NextPreviousButtons',
  components: {
      Spinner
  },
  props: [
    'currentStep',
    'viewCount',
  ],
  computed: {
    ...mapGetters([
      'isMutationLoading'
    ])
  },
  methods: {
      handleStep(action) {
          this.$emit('handleStep', action)
      },
  }
}
</script>

