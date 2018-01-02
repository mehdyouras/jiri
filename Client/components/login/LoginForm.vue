<template>
  <section class="section columns is-medium column is-centered">
    <div class="card column is-one-quarter">
      <h1 class="title is-1 has-text-centered">Jiri</h1>
      <form method="post" action="#">
        <b-field :type="this.errors.has('email') ? 'is-danger' : null" label="Adresse email">
          <b-input v-validate="'required|email'" v-model="email" type="email" name="email"></b-input>
        </b-field>
        <b-field :type="this.errors.has('password') ? 'is-danger' : null" label="Mot de passe">
          <b-input v-validate="'required'" name="password" v-model="password" type="password"></b-input>
        </b-field>

        <a @click.prevent="checkLogin" :class="['button', 'is-primary', {'is-loading': isLoggingIn}, 'mdi', 'mdi-login', 'mdi-18px']" href="#">
          Se connecter
        </a>
      </form>
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
}
</script>

