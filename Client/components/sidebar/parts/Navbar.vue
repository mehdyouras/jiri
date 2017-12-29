<template>
  <nav>
      <router-link :to="{ name: 'dashboard'}">Tableau de bord</router-link>
      <span>Vue d'ensemble</span>
      <div>
        <router-link :v-if="currentUser.isAdmin" :to="{ name: 'indexEvents'}">événements</router-link>
        <router-link :to="{ name: 'indexStudents'}">étudiants</router-link>
        <router-link :v-if="currentUser.isAdmin" :to="{ name: 'indexProjects'}">projets</router-link>
        <router-link :v-if="currentUser.isAdmin" :to="{ name: 'indexUsers'}">utilisateurs</router-link>
        <router-link :v-if="currentUser.isAdmin" :to="{ name: 'indexImplementations'}">implémentations</router-link>
        <router-link :v-if="currentUser.isAdmin" :to="{ name: 'indexResults'}">résultats</router-link>
        <router-link :to="{ name: 'indexMeetings'}">Rencontres</router-link>
      </div>
      <span>Ajouter</span>
      <div>
        <router-link :v-if="currentUser.isAdmin" :to="{ name: 'addEvent'}">événement</router-link>
        <router-link :v-if="currentUser.isAdmin" :to="{ name: 'addStudent'}">étudiant</router-link>
        <router-link :v-if="currentUser.isAdmin" :to="{ name: 'addProject'}">projet</router-link>
        <router-link :v-if="currentUser.isAdmin" :to="{ name: 'addUser'}">utilisateur</router-link>
        <router-link :v-if="currentUser.isAdmin" :to="{ name: 'addImplementation'}">implémentation</router-link>
        <router-link :to="{ name: 'addMeeting'}">Rencontre</router-link>
      </div>
  </nav>
</template>

<script>
import {mapGetters} from 'vuex'
import {USER} from '../../../constants'

export default {
  name: 'navbar',
  data() {
    return {
      currentUser: {
        name: '',
        isAdmin: false,
      },
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
}
</script>

