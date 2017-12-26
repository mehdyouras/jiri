<template>
  <div>
      <h2>Vue d'ensemble des projets</h2>
      <ol>
          <li v-for="project in projects" :key="project.id">
              <span>{{project.name}}</span>
          </li>
      </ol>
  </div>
</template>

<script>
import {ALL_PROJECTS} from '../../../constants'

export default {
    name: 'IndexUsers',
    data() {
        return {
            projects: {},
        }
    },
    apollo: {
        projects: {
            query: ALL_PROJECTS,
            update(data) {
                return data.allProjects
            }
        }
    }
}
</script>

<style>

</style>
