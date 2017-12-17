<template>
  <nav>
      <router-link :to="{ name: 'dashboard'}">Tableau de bord</router-link>
      <router-link :to="{ name: 'overview'}">Vue d'ensemble</router-link>
      <div>
        <router-link :v-if="currentUser.isAdmin" :to="{ name: 'events'}">événements</router-link>
        <router-link :to="{ name: 'students'}">étudiants</router-link>
        <router-link :v-if="currentUser.isAdmin" :to="{ name: 'projects'}">projets</router-link>
        <router-link :v-if="currentUser.isAdmin" :to="{ name: 'users'}">utilisateurs</router-link>
        <router-link :v-if="currentUser.isAdmin" :to="{ name: 'implementations'}">implémentations</router-link>
        <router-link :v-if="currentUser.isAdmin" :to="{ name: 'results'}">résultats</router-link>
        <router-link :to="{ name: 'meetings'}">Rencontres</router-link>
      </div>
      <span>Ajouter</span>
      <div>
        <router-link :v-if="currentUser.isAdmin" :to="{ name: 'newEvent'}">événement</router-link>
        <router-link :v-if="currentUser.isAdmin" :to="{ name: 'newStudent'}">étudiant</router-link>
        <router-link :v-if="currentUser.isAdmin" :to="{ name: 'newProject'}">projet</router-link>
        <router-link :v-if="currentUser.isAdmin" :to="{ name: 'newUser'}">utilisateur</router-link>
        <router-link :v-if="currentUser.isAdmin" :to="{ name: 'newImplementation'}">implémentation</router-link>
        <router-link :to="{ name: 'newMeeting'}">Rencontre</router-link>
      </div>
  </nav>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'navbar',
  computed: {
    ...mapGetters([
      'currentUser'
    ])
  }

}
</script>

