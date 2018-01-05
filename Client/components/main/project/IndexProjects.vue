<template>
  <b-card>
      <h2 class="mb-3">Vue d'ensemble des projets</h2>
      <Spinner v-if="isLoading"></Spinner>
      <template v-else>
        <b-button v-b-toggle.addForm variant="primary" class="mb-3">Ajouter un projet</b-button>
        <b-collapse id="addForm" class="">
            <b-card class="col-md-5">
                <ProjectForm></ProjectForm>
            </b-card>
        </b-collapse>
        <template v-if="!projects[0]">
            <p>Il n'y a pas de projet.</p>
        </template>
        <ol class="list-unstyled row mt-3">
            <li class="col-md-4 col-lg-3" v-for="project in projects" :key="project.id">
                <b-card :id="project.id" no-body class="mb-3">
                    <b-card-body class="card-text d-flex justify-content-between align-items-center">
                        <div>
                            <span class="d-block">
                                {{project.name}}
                            </span>
                        </div>
                        <b-dropdown right v-if="isAdmin" variant="light">
                            <b-dropdown-item @click="editProject">Modifier</b-dropdown-item>
                            <b-dropdown-item @click="openModal({id:project.id, name: project.name, type: 'project'})" class="text-danger">Supprimer</b-dropdown-item>
                        </b-dropdown>
                    </b-card-body>
                    <b-tooltip :target="project.id" :title="project.description"></b-tooltip>
                </b-card>
            </li>
        </ol>
      </template>
      <b-modal @ok="deleteProject" ref="delete" title="Confirmation" ok-title="Supprimer" ok-variant="danger" cancel-title="Annuler">
          Êtes-vous sûr de vouloir <strong class="text-danger">supprimer</strong> le projet <strong>{{modal.name}}</strong> ?
      </b-modal>
  </b-card>
</template>

<script>
import {ALL_PROJECTS} from '../../../constants'
import ProjectForm from '../../common/forms/ProjectForm'
import Spinner from '../../common/Spinner'
import {mapGetters} from 'vuex'
import {Bus} from '../../../Bus'

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
            modal: {
                id: "",
                name: "",
                type: "project",
            }
        }
    },
    computed: {
        ...mapGetters([
            'isAdmin'
        ])
    },
    apollo: {
        projects: {
            query: ALL_PROJECTS,
            update(data) {
                return data.allProjects
            },
            loadingKey: 'isLoading',
        }
    },
    methods: {
        editProject() {
            
        },
        openModal(payload) {
            this.modal = payload;
            this.$refs.delete.show()
        },
        deleteProject() {
            Bus.$emit('removeItem', this.modal);
        }
    }
}
</script>

<style>

</style>
