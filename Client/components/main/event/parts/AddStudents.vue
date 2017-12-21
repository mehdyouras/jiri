<template>
  <div>
      <ol>
          <li>Student 1</li>
          <li>Student 2</li>
          <li>Student 3</li>
          <li>Student 4</li>
          <li>Student 5</li>
      </ol>
      <NextPreviousButtons :currentStep="currentStep"></NextPreviousButtons>
  </div>
</template>

<script>
import NextPreviousButtons from './NextPreviousButtons'

export default {
  name: 'AddStudents',
  components: {
      NextPreviousButtons,
  },
  props: ['currentStep'],
}
</script>
