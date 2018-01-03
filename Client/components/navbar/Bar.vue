<template>
  <div class="jiri-navbar">
    <b-navbar toggleable="md" type="light" variant="light">
      <div class="container">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand :to="{ name: 'dashboard'}">
          <h1>Jiri</h1>
        </b-navbar-brand>
        <b-collapse is-nav id="nav_collapse">
          <Navbar></Navbar>
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown :text="currentUser.name" right>
              <b-dropdown-item href="#" @click.prevent="logoutUser">Se déconnecter</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
  </div>
</template>

<script>
import Navbar from './parts/Navbar'
import Clock from './parts/Clock.vue'
import {mapGetters} from 'vuex'
import {USER} from '../../constants'

export default {
  name: 'Sidebar',
  components: {
      Navbar,
      Clock
  },
  data() {
    return {
      currentUser: {},
    }
  },
  computed: {
      ...mapGetters([
          'currentUserId'
      ])
  },
  apollo: {
    currentUser: {
      query: USER,
      variables() {
        return {
          id: this.currentUserId
        }
      },
      update(data) {
        return data.User
      }
    }
  },
  methods: {
    logoutUser() {
      localStorage.removeItem('userToken')
      this.$router.push({name: 'login'})
    }
  },
}
</script>

<style lang="scss">
  .jiri-navbar {
    margin-bottom: 2em;
  }
</style>
