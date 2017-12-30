<template>
  <div>
        <template v-if="projectsToShow[0]">
            <label for="project">Nom du projet</label>
            <select v-model="projectId" name="project" id="project">
                <option disabled value="">Choisissez</option>
                <option v-for="weight in projectsToShow" :key="weight.project.id" :value="weight.project.id">
                    {{weight.project.name}}
                </option>
            </select>

            <label for="urlRepo">URL du repo Github</label>
            <input v-model="urlRepo" type="text" name="urlRepo" id="urlRepo">

            <label for="urlProject">URL du projet</label>
            <input v-model="urlProject" type="text" name="urlProject" id="urlProject">

            <button @click="addItem">Ajouter</button>
        </template>
  </div>
</template>

<script>
import {STUDENT} from '../../../constants'
import {Bus} from '../../../Bus'
import _ from 'lodash'

export default {
    name: 'ImplementationForm',
    data() {
        return {
            student: {},
            projectsToShow: {},
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
                let projectsToHide = [];
                data.Student.implementations.forEach(element => {
                    projectsToHide.push(element.project.id)
                });
                
                let projectsToShow = _.filter(data.Student.event.weights, weight => {
                    return !!_.find(projectsToHide, weight.project.id)
                }) 

                if(!projectsToShow[0]) {
                    this.$emit('dontShowAdd');
                }

                this.projectsToShow = projectsToShow;

                return data.Student
            }
        }
    }
}
</script>

<style>

</style>
