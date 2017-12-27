<template>
  <div>
        <label for="project">Nom du projet</label>
        <select v-model="projectId" name="project" id="project">
            <option disabled value="">Choisissez</option>
            <option v-for="weight in student.event.weights" :key="weight.project.id" :value="weight.project.id">
                {{weight.project.name}}
            </option>
        </select>

        <label for="urlRepo">URL du repo Github</label>
        <input v-model="urlRepo" type="text" name="urlRepo" id="urlRepo">

        <label for="urlProject">URL du projet</label>
        <input v-model="urlProject" type="text" name="urlProject" id="urlProject">

        <button @click="addItem">Ajouter</button>
  </div>
</template>

<script>
import {STUDENT} from '../../../constants'
import {Bus} from '../../../Bus'

export default {
    name: 'ImplementationForm',
    data() {
        return {
            student: {},
            urlRepo: '',
            urlProject: '',
            projectId: '',
        }
    },
    methods: {
        addItem() {
            let payload = {
                studentId: this.student.id,
                urlRepo: this.urlRepo,
                urlProject: this.urlProject,
                projectId: this.projectId,
            }
            Bus.$emit('createImplementation', payload)
        }
    },
    apollo: {
        student: {
            query: STUDENT,
            variables() {
                return {
                    id: this.$route.params.studentId
                }
            },
            loadingKey: 'isLoading',
            update(data) {
                return data.Student
            }
        }
    }
}
</script>

<style>

</style>
