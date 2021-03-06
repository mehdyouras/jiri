<template>
  <b-card>
      <h2 class="mb-3">Vue d'ensemble des utilisateurs</h2>
      <p>Séléctionez un utilisateur pour le modifier.</p>
      <Spinner v-if="isLoading"></Spinner>
      <template v-else>
        <b-button v-b-toggle.addForm variant="primary" class="mb-3">Ajouter un utilisateur</b-button>
        <b-collapse id="addForm" class="">
            <b-card class="col-md-5">
                <user-form></user-form>
            </b-card>
        </b-collapse>
        <template v-if="!users[0]">
            <p>Il n'y a pas encore d'utilisateur</p>
        </template>
        <transition-group tag="ol" name="zoom" class="list-unstyled row mt-3" v-else>
            <li class="col-md-4 col-lg-3" v-for="user in users" :key="user.id">
                <b-card no-body show variant="secondary" class="mb-3">
                    <div class="card-text d-flex justify-content-between align-items-center">
                        <div @click="editUser(user)" class="p-3 card-clickable">
                            <span class="d-block">
                                {{user.name}}
                            </span>
                            <span class="text-wrap small">
                                {{user.email}}
                            </span>
                        </div>
                        <b-dropdown class="p-3" right v-if="isAdmin" variant="light">
                            <b-dropdown-item @click="editUser(user)">Modifier</b-dropdown-item>
                            <b-dropdown-item @click="openModal({id:user.id, name: user.name, type: 'user'})" class="text-danger">Supprimer</b-dropdown-item>
                        </b-dropdown>
                    </div>
                </b-card>
            </li>
        </transition-group>
      </template>
      <b-modal @ok="deleteItem()" ref="delete" title="Confirmation" ok-title="Supprimer" ok-variant="danger" cancel-title="Annuler">
          Êtes-vous sûr de vouloir <strong class="text-danger">supprimer</strong> l'utilisateur <strong>{{modal.name}}</strong> ?
      </b-modal>
      <edit-user v-if="editModal.show" @hidden="editModal.show = false" :visible="editModal.show" :user="userToEdit"></edit-user>
  </b-card>
</template>

<script>
import {ALL_USERS} from '../../../constants'
import {mapGetters} from 'vuex'
import Spinner from '../../common/Spinner'
import UserForm from '../../common/forms/UserForm'
import {Bus} from '../../../Bus'
import EditUser from './EditUser'

export default {
    name: 'IndexUsers',
    components: {
        Spinner,
        UserForm,
        EditUser
    },
    data() {
        return {
            users: {},
            modal: {
                id: "",
                name: "",
                type: "",
            },
            editModal: {
                show: false,
            },
            userToEdit: {},
            isLoading: 0,   
        }
    },
    computed: {
        ...mapGetters([
            'isAdmin'
        ])
    },
    methods: {
        editUser(user) {
            this.userToEdit = user;
            this.editModal.show = true;
        },
        openModal(payload) {
            this.modal = payload;
            this.$refs.delete.show();
        },
        deleteItem() {
            Bus.$emit('removeItem', this.modal)
            this.modal.id = "";
            this.modal.name = "";
            this.modal.type = "";
        }
    },
    apollo: {
        users: {
            query: ALL_USERS,
            update(data) {
                return data.allUsers
            },
            loadingKey: 'isLoading',
        }
    }
}
</script>

<style>

</style>
