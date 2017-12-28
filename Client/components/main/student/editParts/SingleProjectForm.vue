<template>
  <div>
    <label :for="project.id">{{project.name}}</label>
    <input v-model="isChecked" type="checkbox" :name="project.id" :id="project.id">
    
    <div v-show="isChecked">
      <label :for="project.id + 'a'">URL repo Github</label>
      <input v-model="urlRepo" type="text" :name="project.id + 'a'" :id="project.id + 'a'">

      <label :for="project.id + 'b'">URL du site</label>
      <input v-model="urlProject" type="text" :name="project.id + 'b'" :id="project.id + 'b'">
    </div>

  </div>
</template>

<script>
import _ from 'lodash'

export default {
    name: 'SingleProjectForm',
    data() {
      return {
        implementationIndex: '',
        isChecked: false,
        urlRepo: '',
        urlProject: '',
      }
    },
    props: [
      'project',
      'student'
    ],
    created() {
      this.implementationIndex = _.findIndex(this.student.implementations, {project: {id: this.project.id}});
        if(this.implementationIndex !== -1) {
          this.isChecked = true;
          this.urlRepo = this.student.implementations[implementationIndex].urlRepo;
          this.urlProject = this.student.implementations[implementationIndex].urlProject;
        }
    }
}
</script>

<style>

</style>
