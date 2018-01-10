<template>
  <b-card>
      <h2 class="mb-3">Vue d'ensemble des projets</h2>
      <p>Séléctionner un projet pour le modifier.</p>
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
        <transition-group tag="ol" name="zoom" class="list-unstyled row mt-3">
            <li class="col-md-4 col-lg-3" v-for="project in projects" :key="project.id">
                <b-card :id="project.id" no-body show variant="secondary" class="mb-3">
                    <div class="card-text d-flex align-items-stretch justify-content-between">
                        <div @click="openEditModal({id: project.id, name: project.name, description: project.description, weightId: project.weight.id, weight: project.weight.weight})" class="p-3 d-flex align-items-center card-clickable">
                            <span>
                                {{project.name}}
                            </span>
                        </div>
                        <b-dropdown class="p-3" right v-if="isAdmin" variant="light">
                            <b-dropdown-item @click="openEditModal({id: project.id, name: project.name, description: project.description, weightId: project.weight.id, weight: project.weight.weight})">Modifier</b-dropdown-item>
                            <b-dropdown-item @click="openDeleteModal({id:project.id, name: project.name, type: 'project'})" class="text-danger">Supprimer</b-dropdown-item>
                        </b-dropdown>
                    </div>
                </b-card>
                <b-tooltip :target="project.id" :title="project.description"></b-tooltip>
            </li>
        </transition-group>
      </template>
      <b-modal @ok="deleteProject" ref="delete" title="Confirmation" ok-title="Supprimer" ok-variant="danger" cancel-title="Annuler">
          Êtes-vous sûr de vouloir <strong class="text-danger">supprimer</strong> le projet <strong>{{deleteModal.name}}</strong> ?
      </b-modal>
      <b-modal @ok="editProject" ref="edit" title="Modifier" ok-title="Sauvegarder" ok-variant="primary" cancel-title="Annuler">
          <b-form-group
              label="Nom du projet"
              label-for="project-name"
              :invalid-feedback="this.errors.first('project-name')"
              :state="!this.errors.has('project-name')"
            >
              <b-form-input id="project-name" name="project-name" type="text" v-validate="'required'" v-model.trim="editModal.name" :class="{'is-invalid': this.errors.has('project-name')}"></b-form-input>
            </b-form-group>
            
            <b-form-group
                    label="Description"
                    label-for="description"
                    :invalid-feedback="this.errors.first('description')"
                    :state="!this.errors.has('description')"
                    >
                    <b-form-input id="description" name="description" type="text" v-validate="'required'" v-model.trim="editModal.description" :class="{'is-invalid': this.errors.has('description')}"></b-form-input>
            </b-form-group>

            <b-form-group
                    label="Pondération"
                    label-for="project-weight"
                    :invalid-feedback="this.errors.first('project-weight')"
                    :state="!this.errors.has('project-weight')"
                    >
                    <b-form-input id="project-weight" name="project-weight" type="number" min="0" max="1" placeholder="Entre 0 et 1" v-validate="'required|decimal:2|min_value:0|max_value:1'" v-model.number="editModal.weight" :class="{'is-invalid': this.errors.has('project-weight')}"></b-form-input>
            </b-form-group>
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
    name: 'IndexProjects',
    components: {
        Spinner,
        ProjectForm
    },
    data() {
        return {
            projects: {},
            isLoading: 0,
            deleteModal: {
                id: "",
                name: "",
                type: "project",
            },
            editModal: {
                id: "",
                weightId: "",
                weight: "",
                name: "",
                description: "",
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
        openEditModal(payload) {
            this.editModal = payload;
            this.$refs.edit.show();
        },
        editProject() {
            this.$validator.validateAll().then((result) => {
                if (result) {
                    let {id, name, description, weightId, weight} = this.editModal;
                    
                    Bus.$emit('updateProject', {id, name, description, weight, weightId});
                    return;
                }
            });
        },
        openDeleteModal(payload) {
            this.deleteModal = payload;
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
