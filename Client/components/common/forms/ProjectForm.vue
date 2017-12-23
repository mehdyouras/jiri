<template>
  <div>
    <label for="project-name">Nom du projet</label>
    <input v-model="name" type="text" id="project-name">
    <label for="project-description">Description</label>
    <input v-model="description" type="text">
    <label for="project-weight">Pondération</label>
    <input v-model="weight" type="number" name="project-weight" id="project-weight">

    <button @click.prevent="addProject">Ajouter</button>
  </div>
</template>

<script>
import {CREATE_PROJECT} from '../../../constants/createProject.gql'
import VueApollo from 'vue-apollo'

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
    addProject() {
      let {name, description, weight} = this;
      this.$apollo.mutate({
        mutation: CREATE_PROJECT,
        variables: {
          name,
          description,
          weight : parseFloat(weight)
        }
      }).then((data) => {
        console.log(data);
      }).catch(e => {
        console.error(e)
      })
    }
  },
  created() {
        this.$emit('formHasChanged')
    }
}
</script>

