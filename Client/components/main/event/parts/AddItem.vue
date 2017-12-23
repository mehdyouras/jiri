<template>
  <div>
      <button @click="addType">Ajouter un {{type}}</button>
      <div v-if="isAdding">
          <student-form v-if="currentStep === 1"></student-form>
          <user-form v-if="currentStep === 2"></user-form>
          <project-form v-if="currentStep === 3"></project-form>
      </div>
  </div>
</template>

<script>
import nanoid from 'nanoid'

import UserForm from '../../../common/forms/UserForm'
import StudentForm from '../../../common/forms/StudentForm'
import ProjectForm from '../../../common/forms/ProjectForm'

export default {
    name: 'AddItem',
    components: {
        UserForm,
        StudentForm,
        ProjectForm,
    },
    data() {
        return {
            types: ['étudiant', 'utilisateur', 'projet'],
            isAdding: false,
        }
    },
    props: [
        'currentStep'
    ],
    computed: {
        type() {
            return this.types[this.currentStep - 1];
        }
    },
    methods: {
        addType() {
            this.isAdding = true;
        },
        randomizePassword() {
            let password = nanoid();
            this.password = password.slice(14);
      }
    }
}
</script>