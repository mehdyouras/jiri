<template>
  <div>
      <b-button v-b-toggle.addForm variant="primary" class="mb-3">Ajouter un {{type}}</b-button>
      <b-collapse id="addForm" v-model="showForm">
          <b-card class="col-md-5">
            <student-form @formHasChanged="closeForm" v-if="currentStep === 1"></student-form>
            <user-form @formHasChanged="closeForm" v-if="currentStep === 2"></user-form>
            <project-form @formHasChanged="closeForm" v-if="currentStep === 3"></project-form>
          </b-card>
      </b-collapse>
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
            showForm: false,
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
        closeForm() {
            this.showForm = false;
        }
    }
}
</script>