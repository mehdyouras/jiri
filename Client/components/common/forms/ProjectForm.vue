<template>
  <div>
    <label for="project-name">Nom du projet</label>
    <input v-validate="'required'" v-model="name" type="text" id="project-name">
    <span v-show="this.errors.has('project-name')">{{this.errors.first('project-name')}}</span>

    <label for="project-description">Description</label>
    <input v-validate="'required'" v-model="description" name="description" type="text">
    <span v-show="this.errors.has('description')">{{this.errors.first('description')}}</span>

    <label for="project-weight">Pondération</label>
    <input v-validate="'required|decimal:2'" v-model="weight" type="number" name="project-weight" id="project-weight">
    <span v-show="this.errors.has('project-weight')">{{this.errors.first('project-weight')}}</span>

    <button @click.prevent="createProject">Ajouter</button>
  </div>
</template>

<script>
import {Bus} from '../../../Bus'

export default {
  name: 'ProjectForm',
  data() {
    return {
      name: "",
      description: "",
      weight: "",
    }
  },
  methods: {
    createProject() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          let {name, description, weight} = this;
          weight = parseFloat(weight);
          
          Bus.$emit('createProject', {name, description, weight});
          this.$emit('projectCreated')
          return;
        }
      });
    }
  },
  created() {
        this.$emit('formHasChanged')
    }
}
</script>

