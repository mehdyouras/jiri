<template>
  <div>
      <h2>Vue d'ensemble des projets</h2>
      <Spinner v-if="isLoading"></Spinner>
      <template v-else>
        <ProjectForm></ProjectForm>
        <template v-if="!projects[0]">
            <p>Il n'y a pas de projet.</p>
        </template>
        <ol>
            <li v-for="project in projects" :key="project.id">
                <span>{{project.name}}</span>
            </li>
        </ol>
      </template>
  </div>
</template>

<script>
import {ALL_PROJECTS} from '../../../constants'
import ProjectForm from '../../common/forms/ProjectForm'
import Spinner from '../../common/Spinner'

export default {
    name: 'IndexUsers',
    components: {
        Spinner,
        ProjectForm
    },
    data() {
        return {
            projects: {},
            isLoading: 0,
        }
    },
    apollo: {
        projects: {
            query: ALL_PROJECTS,
            update(data) {
                return data.allProjects
            },
            loadingKey: 'isLoading',
        }
    }
}
</script>

<style>

</style>
