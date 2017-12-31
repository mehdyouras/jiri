<template>
  <div>
        <template v-if="weightsToShow[0]">
            <label for="project">Nom du projet*</label>
            <select v-validate="'required'"  v-model="projectId" name="project" id="project">
                <option disabled value="">Choisissez</option>
                <option v-for="weight in weightsToShow" :key="weight.project.id" :value="weight.project.id">
                    {{weight.project.name}}
                </option>
            </select>
            <span v-show="this.errors.has('project')">{{this.errors.first('project')}}</span>
            <label for="urlRepo">URL du repo Github</label>
            <input v-validate="'url'" v-model="urlRepo" type="text" name="urlRepo" id="urlRepo">
            <span v-show="this.errors.has('urlRepo')">{{this.errors.first('urlRepo')}}</span>

            <label for="urlProject">URL du projet</label>
            <input v-validate="'url'" v-model="urlProject" type="text" name="urlProject" id="urlProject">
            <span v-show="this.errors.has('urlProject')">{{this.errors.first('urlProject')}}</span>

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
            weightsToShow: {},
            weightsToShowId: {},
            urlRepo: '',
            urlProject: '',
            projectId: '',
        }
    },
    methods: {
        addItem() {
            console.log(this.errors.all())
            this.$validator.validateAll().then((result) => {
                if (result) {
                    let payload = {
                        studentId: this.student.id,
                        urlRepo: this.urlRepo,
                        urlProject: this.urlProject,
                        projectId: this.projectId,
                    }
                    Bus.$emit('createImplementation', payload)
                    this.urlRepo = '';
                    this.urlProject = '';
                    this.projectId = '';
                return;
                }
            })
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

                let allProjects = [];

                data.Student.event.weights.forEach(element => {
                    allProjects.push(element.project.id)
                });
                
                let projectsToShow = _.difference(allProjects, projectsToHide)

                let weightsToShow= [];
                
                projectsToShow.forEach(project => {
                    let itemToPush = _.find(data.Student.event.weights, weight => {
                        return weight.project.id === project
                    })
                    weightsToShow.push(itemToPush);
                })
                if(!weightsToShow[0]) {
                    this.$emit('dontShowAdd');
                }

                this.weightsToShowId = projectsToShow;
                this.weightsToShow = weightsToShow;

                return data.Student
            }
        }
    }
}
</script>

<style>

</style>
