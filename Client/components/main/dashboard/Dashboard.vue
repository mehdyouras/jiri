<template>
  <b-card class="container">
    <b-row>
      <div class="card-text col">
        <h2>Tableau de bord</h2>
        <div>
          <div>
            <h3>Vous êtes connecté en tant {{userType}}</h3>
            <p>Vous avez accès aux actions ci-contre.</p>
          </div>
        </div>
      </div>
      <b-list-group class="col">
        <b-list-group-item v-if="isAdmin" :to="{ name: 'addEvent'}">Organiser un événement</b-list-group-item>
        <b-list-group-item v-if="isAdmin" :to="{ name: 'addStudent'}">Ajouter un étudiant</b-list-group-item>
        <b-list-group-item v-if="isAdmin" :to="{ name: 'addProject'}">Ajouter un projet</b-list-group-item>
        <b-list-group-item v-if="isAdmin" :to="{ name: 'addUser'}">Ajouter un membre du jury</b-list-group-item>
        <b-list-group-item :to="{ name: 'addMeeting'}">Organiser une rencontre avec un étudiant</b-list-group-item>
        <b-list-group-item :to="{ name: 'indexMeetings'}">Les étudiants que j'ai déjà rencontré</b-list-group-item>
      </b-list-group>
    </b-row>
  </b-card>
</template>
<script>
import {mapGetters} from 'vuex'
import {USER} from '../../../constants'

export default {
  name: 'dashboard',
  data() {
    return {
      currentUser: {},
    }
  },
  computed: {
    ...mapGetters([
      'currentUserId',
      'isAdmin'
    ]),
    userType() {
      if(this.isAdmin) {
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
