<template>
  <div>
    <b-alert :show="mutationError !== ''" variant="danger">
        {{mutationError}}
    </b-alert>
    <b-form-checkbox v-model="isAdmin">
        Administrateur
    </b-form-checkbox>
    
    <b-form-group
              label="Nom"
              label-for="user-name"
              :invalid-feedback="this.errors.first('user-name')"
              :state="!this.errors.has('user-name')"
            >
              <b-form-input id="user-name" name="user-name" type="text" v-validate="'required|alpha_spaces'" v-model.trim="name" :class="{'is-invalid': this.errors.has('user-name')}"></b-form-input>
    </b-form-group>

    <b-form-group
              label="Organisation"
              label-for="user-company"
              :invalid-feedback="this.errors.first('user-company')"
              :state="!this.errors.has('user-company')"
            >
              <b-form-input id="user-company" name="user-company" type="text" v-validate="'required'" v-model.trim="company" :class="{'is-invalid': this.errors.has('user-company')}"></b-form-input>
    </b-form-group>

    <b-form-group
              label="Adresse email"
              label-for="user-email"
              :invalid-feedback="this.errors.first('user-email')"
              :state="!this.errors.has('user-email')"
            >
              <b-form-input id="user-email" name="user-email" type="text" v-validate="'required'" v-model.trim="email" :class="{'is-invalid': this.errors.has('user-email')}"></b-form-input>
    </b-form-group>


    <b-form-group class=""
            label="Mot de passe"
            label-for="user-password"
            :invalid-feedback="this.errors.first('user-password')"
            :state="!this.errors.has('user-password')"
            >
            <div class="d-flex">
                <b-form-input class="mr-3" id="user-password" name="user-password" type="password" v-validate="'required'" v-model.trim="password" :class="{'is-invalid': this.errors.has('user-password')}"></b-form-input>
                <b-btn variant='secondary' @click="randomizePassword" >Aléatoire</b-btn>
            </div>
    </b-form-group>



    <b-btn variant="primary" @click.prevent="createUser">
        <template v-if="!isMutationLoading">
            Ajouter
        </template>
        <spinner v-else></spinner>
    </b-btn>
  </div>
</template>

<script>
import {Bus} from '../../../Bus'
import nanoid from 'nanoid'
import Spinner from '../../common/Spinner'
import {mapGetters} from 'vuex'

export default {
    name: 'UserForm',
    components: {
        Spinner
    },
    data() {
        return {
            email: "",
            password: "",
            name: "",
            company: "",
            isAdmin: false,
            mutationError: "",
        }
    },
    computed: {
        ...mapGetters([
            'isMutationLoading'
        ])
    },
    methods: {
        createUser() {
            this.$validator.validateAll().then((result) => {
                if (result) {
                    let {email, password, name, company, isAdmin} = this;
        
                    Bus.$emit('createUser', {email, password, name, company, isAdmin});
                    // this.email = "";
                    // this.password = "";
                    // this.name = "";
                    // this.company = "";
                    // this.isAdmin = false;
                    return;
                }
            });
        },
        randomizePassword() {
            let password = nanoid();
            this.password = password.slice(14);
        },
    },
    created() {
        this.$emit('formHasChanged')
        Bus.$on('createUserError', payload => {
            this.mutationError = payload;
        })
    }
}
</script>

<style>

</style>
