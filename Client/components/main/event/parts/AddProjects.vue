<template>
  <div>
      <ol>
          <li>Jiri</li>
          <li>Mariam Faso</li>
          <li>CV</li>
          <li>CSS Zen Garden</li>
          <li>Artiste</li>
      </ol>
        <NextPreviousButtons @handleStep='handleStep' :currentStep="currentStep" :viewCount="viewCount"></NextPreviousButtons>
  </div>
</template>

<script>
import NextPreviousButtons from './NextPreviousButtons'

export default {
    name: 'AddProjects',
    components: {
        NextPreviousButtons
    },
    props: [
        'currentStep',
        'viewCount'
    ],
    methods: {
        handleStep(action) {
        console.log('addinfos')
        this.$emit('handleStep', action)
        }
    }

}
</script>
