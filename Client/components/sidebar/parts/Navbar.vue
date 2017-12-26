<template>
  <nav>
      <router-link :to="{ name: 'dashboard'}">Tableau de bord</router-link>
      <router-link :to="{ name: 'overview'}">Vue d'ensemble</router-link>
      <div>
        <router-link :v-if="currentUser.isAdmin" :to="{ name: 'indexEvents'}">événements</router-link>
        <router-link :to="{ name: 'students'}">étudiants</router-link>
        <router-link :v-if="currentUser.isAdmin" :to="{ name: 'indexProjects'}">projets</router-link>
        <router-link :v-if="currentUser.isAdmin" :to="{ name: 'indexUsers'}">utilisateurs</router-link>
        <router-link :v-if="currentUser.isAdmin" :to="{ name: 'indexImplementations'}">implémentations</router-link>
        <router-link :v-if="currentUser.isAdmin" :to="{ name: 'indexResults'}">résultats</router-link>
        <router-link :to="{ name: 'meetings'}">Rencontres</router-link>
      </div>
      <span>Ajouter</span>
      <div>
        <router-link :v-if="currentUser.isAdmin" :to="{ name: 'addEvent'}">événement</router-link>
        <router-link :v-if="currentUser.isAdmin" :to="{ name: 'addStudent'}">étudiant</router-link>
        <router-link :v-if="currentUser.isAdmin" :to="{ name: 'addProject'}">projet</router-link>
        <router-link :v-if="currentUser.isAdmin" :to="{ name: 'addUser'}">utilisateur</router-link>
        <router-link :v-if="currentUser.isAdmin" :to="{ name: 'addImplementation'}">implémentation</router-link>
        <router-link :to="{ name: 'newMeeting'}">Rencontre</router-link>
      </div>
  </nav>
</template>

<script>
export default {
  name: 'navbar',
  props: [
    'currentUser'
  ]
}
</script>

