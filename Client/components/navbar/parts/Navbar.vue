<template>
  <b-navbar-nav>
      <b-nav-item :to="{ name: 'dashboard'}">Tableau de bord</b-nav-item>
      <b-nav-item-dropdown text="Vue d'ensemble">
        <b-dropdown-item :v-if="currentUser.isAdmin" :to="{ name: 'indexEvents'}">Événements</b-dropdown-item>
        <b-dropdown-item :to="{ name: 'indexStudents'}">Étudiants</b-dropdown-item>
        <b-dropdown-item :v-if="currentUser.isAdmin" :to="{ name: 'indexProjects'}">Projets</b-dropdown-item>
        <b-dropdown-item :v-if="currentUser.isAdmin" :to="{ name: 'indexUsers'}">Utilisateurs</b-dropdown-item>
        <b-dropdown-item :v-if="currentUser.isAdmin" :to="{ name: 'indexImplementations'}">Implémentations</b-dropdown-item>
        <b-dropdown-item :v-if="currentUser.isAdmin" :to="{ name: 'indexResults'}">Résultats</b-dropdown-item>
        <b-dropdown-item :to="{ name: 'indexMeetings'}">Rencontres</b-dropdown-item>
      </b-nav-item-dropdown>

      <b-nav-item-dropdown text="Ajouter">
        <b-dropdown-item :v-if="currentUser.isAdmin" :to="{ name: 'addEvent'}">Événement</b-dropdown-item>
        <b-dropdown-item :v-if="currentUser.isAdmin" :to="{ name: 'addStudent'}">Étudiant</b-dropdown-item>
        <b-dropdown-item :v-if="currentUser.isAdmin" :to="{ name: 'addProject'}">Projet</b-dropdown-item>
        <b-dropdown-item :v-if="currentUser.isAdmin" :to="{ name: 'addUser'}">Utilisateur</b-dropdown-item>
        <b-dropdown-item :to="{ name: 'addMeeting'}">Rencontre</b-dropdown-item>
      </b-nav-item-dropdown>

  </b-navbar-nav>
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

