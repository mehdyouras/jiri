<template>
  <div>
      <h2>Les implémentations de {{student.name}}</h2>
      <Spinner v-if="isLoading"></Spinner>
      <div v-else v-for="project in projects" :key="project.id">
          <SingleProjectForm :project="project" :student="student"></SingleProjectForm>
      </div>
  </div>
</template>

<script>
import {ALL_PROJECTS, STUDENT} from '../../../constants'
import SingleProjectForm from './editParts/SingleProjectForm.vue'
import Spinner from '../../common/Spinner'

export default {
    name: 'EditStudent',
    components: {
        SingleProjectForm,
        Spinner
    },
    data() {
        return {
            projects: {},
            student: {},
            isLoading: 0,
        }
    },
    computed: {
    },
    apollo: {
        projects: {
            query: ALL_PROJECTS,
            update(data){
                return data.allProjects
            },
            loadingKey: 'isLoading'
        },
        student: {
            query: STUDENT,
            variables() {
                return {
                    id: this.$route.params.studentId
                }
            },
            update(data) {
                return data.Student
            },
            loadingKey: 'isLoading'
        }
    },
}
</script>

<style>

</style>
