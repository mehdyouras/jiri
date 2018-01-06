<template>
  <section class="container">
    <div class="row justify-content-md-center">
      <div class="card col col-lg-4 login-form">
        <div class="card-body">
          <h1>Jiri</h1>
          <b-alert :show="mutationError !== ''" variant="danger">
            {{mutationError}}
          </b-alert>
          <b-form>
            <b-form-group
              label="Adresse email"
              label-for="email"
              :invalid-feedback="this.errors.first('email')"
              :state="!this.errors.has('email')"
            >
              <b-form-input id="email" name="email" type="email" v-validate="'required|email'" v-model.trim="email" :class="{'is-invalid': this.errors.has('')}"></b-form-input>
            </b-form-group>
            <b-form-group
              label="Mot de passe"
              label-for="password"
              :invalid-feedback="this.errors.first('password')"
              :state="!this.errors.has('password')"
            >
              <b-form-input id="password" type="password" name="password" v-validate="'required'" v-model.trim="password" :class="{'is-invalid': this.errors.has('')}"></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary" @click.prevent="checkLogin">
              <template v-if="!isLoggingIn">
                Se connecter
              </template>
              <Spinner v-else></Spinner>
            </b-button>
          </b-form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import nanoid from 'nanoid'
import {Bus} from '../../Bus'
import Spinner from '../common/Spinner'
import {mapGetters} from 'vuex'

export default {
  name: 'LoginForm',
  components: {
    Spinner
  },
  data() {
      return {
        email: '',
        password: '',
        mutationError: '',
      }
  },
  computed: {
    ...mapGetters([
      'isLoggingIn'
    ])
  },
  methods: {
      checkLogin() {
        let {email, password} = this
        this.$validator.validateAll().then((result) => {
                if (result) {
                  Bus.$emit('authenticateUser', {email, password})
                return;
                }
            })
      },
      logoutUser() {
        localStorage.removeItem('userToken')
        this.$router.push({name: "home"})
      }
  },
  created() {
    Bus.$on('authenticateUserError', payload => {
      this.mutationError = payload;
    })
  }
}
</script>

<style lang="scss">
  .login-form {
    margin-top: 4em;
  }
</style>

