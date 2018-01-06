<template>
  <b-modal @hidden="hidden" :visible="visible" @ok="editUser()" ref="edit" :title="'Modifier ' + edit.name" ok-title="Sauvegarder" ok-variant="primary" cancel-title="Annuler">
      <Spinner v-if="isLoading"></Spinner>
      <template v-else>
        <b-form-checkbox v-model="edit.isAdmin">
            Administrateur
        </b-form-checkbox>
        
        <b-form-group
                label="Nom"
                label-for="edit-user-name"
                :invalid-feedback="this.errors.first('edit-user-name')"
                :state="!this.errors.has('edit-user-name')"
                >
                <b-form-input id="edit-user-name" name="edit-user-name" type="text" v-validate="'required|alpha_spaces'" v-model.trim="edit.name" :class="{'is-invalid': this.errors.has('edit-user-name')}"></b-form-input>
        </b-form-group>

        <b-form-group
                label="Organisation"
                label-for="edit-user-company"
                :invalid-feedback="this.errors.first('edit-user-company')"
                :state="!this.errors.has('edit-user-company')"
                >
                <b-form-input id="edit-user-company" name="edit-user-company" type="text" v-validate="'required'" v-model.trim="edit.company" :class="{'is-invalid': this.errors.has('edit-user-company')}"></b-form-input>
        </b-form-group>

        <b-form-group
                label="Adresse email"
                label-for="edit-user-email"
                :invalid-feedback="this.errors.first('edit-user-email')"
                :state="!this.errors.has('edit-user-email')"
                >
                <b-form-input id="edit-user-email" name="edit-user-email" type="text" v-validate="'required'" v-model.trim="edit.email" :class="{'is-invalid': this.errors.has('edit-user-email')}"></b-form-input>
        </b-form-group>


        <b-form-group class=""
                label="Mot de passe"
                label-for="edit-user-password"
                :invalid-feedback="this.errors.first('edit-user-password')"
                :state="!this.errors.has('edit-user-password')"
                >
                <div class="d-flex">
                    <b-form-input class="mr-3" id="edit-user-password" name="edit-user-password" type="password" v-validate="'required'" v-model.trim="edit.password" :class="{'is-invalid': this.errors.has('edit-user-password')}"></b-form-input>
                    <b-btn variant='secondary' @click="randomizePassword" >Aléatoire</b-btn>
                </div>
        </b-form-group>
      </template>
  </b-modal>
</template>

<script>
import {USER} from '../../../constants'
import {Bus} from '../../../Bus'
import Spinner from '../../common/Spinner'

export default {
    name: 'EditUser',
    components: {
        Spinner
    },
    props: [
        'user',
        'visible'
    ],
    data() {
        return {
            isLoading: 0,
            edit: {
                id: "",
                email: "",
                password: "",
                name: "",
                company: "",
                isAdmin: false,
            }
        }
    },
    methods: {
        hidden() {
            this.$emit('hidden')
            this.edit = {};
        },
        editUser() {
            let {id, email, password, company, isAdmin} = this.edit;

            let payload = {
                id,
                email,
                password,
                company,
                isAdmin
            }

            Bus.$emit('updateUser', payload);
        },
        randomizePassword() {
            let password = nanoid();
            this.edit.password = password.slice(14);
        },
    },
    created() {
        this.edit = this.user;
    },
}
</script>

<style>

</style>
