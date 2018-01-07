<template>
  <div>
    <b-form-group
              label="Adresse email"
              label-for="student-email"
              :invalid-feedback="this.errors.first('student-email')"
              :state="!this.errors.has('student-email')"
            >
              <b-form-input id="student-email" name="student-email" type="email" v-validate="'required|email'" v-model.trim="email" :class="{'is-invalid': this.errors.has('student-email')}"></b-form-input>
    </b-form-group>
    <b-form-group
              label="Nom"
              label-for="student-name"
              :invalid-feedback="this.errors.first('student-name')"
              :state="!this.errors.has('student-name')"
            >
              <b-form-input id="student-name" name="student-name" type="text" v-validate="'required|alpha_spaces'" v-model.trim="name" :class="{'is-invalid': this.errors.has('student-name')}"></b-form-input>
    </b-form-group>

    <b-btn variant="primary" @click.prevent="createStudent">
        <template v-if="!isMutationLoading">
            Ajouter
        </template>
        <spinner v-else></spinner>
    </b-btn>
  </div>
</template>

<script>
import {Bus} from '../../../Bus'
import Spinner from '../../common/Spinner'
import {mapGetters} from 'vuex'

export default {
    name:'StudentForm',
    components: {
        Spinner
  },
    data() {
      return {
        email: '',
        name: '',
      }
    },
    computed: {
    ...mapGetters([
          'isMutationLoading'
      ])
    },
    props: [
      'nextStep'
    ],
    methods: {
      createStudent() {
        this.$validator.validateAll().then((result) => {
          if (result) {
            let {email, name, nextStep} = this;
    
            Bus.$emit('createStudent', {email, name, nextStep: !!nextStep});
            this.$emit('studentCreated');
            this.email = '';
            this.name = '';
            return;
          }
        });
      }
    },
    created() {
        this.$emit('formHasChanged')
    }
}
</script>

<style>

</style>
