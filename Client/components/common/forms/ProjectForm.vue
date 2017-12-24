<template>
  <div>
    <label for="project-name">Nom du projet</label>
    <input v-model="name" type="text" id="project-name">
    <label for="project-description">Description</label>
    <input v-model="description" type="text">
    <label for="project-weight">Pondération</label>
    <input v-model="weight" type="number" name="project-weight" id="project-weight">

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
      let {name, description, weight} = this;
      weight = parseFloat(weight);
      
      Bus.$emit('createProject', {name, description, weight});
    }
  },
  created() {
        this.$emit('formHasChanged')
    }
}
</script>

