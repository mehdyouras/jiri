<template>
  <div>
      <Sidebar></Sidebar>
      <div>
        <h2>Tableau de bord</h2>
        <div>
          <div>
            <h3>Vous êtes connecté en tant {{userType}}</h3>
            <p>Vous avez accès aux actions ci-contre.</p>
          </div>
          <nav>
            <router-link :v-if="currentUser.isAdmin" :to="{ name: 'addEvent'}">Ajouter un événement</router-link>
            <router-link :v-if="currentUser.isAdmin" :to="{ name: 'addStudent'}">Ajouter un étudiant</router-link>
            <router-link :v-if="currentUser.isAdmin" :to="{ name: 'addProject'}">Ajouter un projet</router-link>
            <router-link :v-if="currentUser.isAdmin" :to="{ name: 'addUser'}">Ajouter un utilisateur</router-link>
            <router-link :to="{ name: 'newMeeting'}">Ajouter une rencontre</router-link>
            <router-link :to="{ name: 'meetings'}">Afficher mes rencontres</router-link>
          </nav>
        </div>
      </div>
  </div>
</template>
<script>
import Sidebar from '../../sidebar/Sidebar.vue'
import {mapGetters} from 'vuex'
import {USER} from '../../../constants'

export default {
  name: 'dashboard',
  components: {
    Sidebar,
  },
  data() {
    return {
      currentUser: {},
    }
  },
  computed: {
    ...mapGetters([
      'currentUserId'
    ]),
    userType() {
      if(this.currentUser.isAdmin) {
        return 'qu\'administrateur'
      } else {
        return 'que ' + this.currentUser.name
      }
    }
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
}
</script>
