<template>
  <div>
    <label :for="project.id">{{project.name}}</label>
    <input v-model="isChecked" type="checkbox" :name="project.id" :id="project.id">
    
    <div v-show="isChecked">
      <label :for="project.id + 'a'">URL repo Github</label>
      <input @input="save" v-model="urlRepo" type="text" :name="project.id + 'a'" :id="project.id + 'a'">

      <label :for="project.id + 'b'">URL du site</label>
      <input @input="save" v-model="urlProject" type="text" :name="project.id + 'b'" :id="project.id + 'b'">
    </div>

  </div>
</template>

<script>
import _ from 'lodash'

export default {
    name: 'SingleProjectForm',
    data() {
      return {
        isChecked: false,
        urlRepo: '',
        urlProject: '',
        implementationIndex: '',
        implementationId: '',
      }
    },
    props: [
      'project',
      'student'
    ],
    methods: {
      save() {
        if(this.implementationIndex !== -1) {
          this.implementationId = this.student.implementations[this.implementationIndex].id;
        } else {
          this.implementationId = false;
        }
        let payload = {
          id: this.implementationId,
          studentId: this.$route.params.studentId,
          projectId: this.project.id,
          urlRepo: this.urlRepo,
          urlProject: this.urlProject,
        };
        this.$store.commit('currentAddedImplementations', payload)
      }
    },
    created() {
       this.implementationIndex = _.findIndex(this.student.implementations, {project: {id: this.project.id}});
        if(this.implementationIndex !== -1) {
          this.isChecked = true;
          this.urlRepo = this.student.implementations[this.implementationIndex].urlRepo;
          this.urlProject = this.student.implementations[this.implementationIndex].urlProject;
        }
    }
}
</script>

<style>

</style>
