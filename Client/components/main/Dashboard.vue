<template>
  <div>
      <Sidebar></Sidebar>
      <div>
        <p>Vous êtes connecté en tant {{userType}}</p>
      </div>
  </div>
</template>
<script>
import Sidebar from '../sidebar/Sidebar.vue'
import {mapGetters} from 'vuex'

export default {
  name: 'dashboard',
  components: {
    Sidebar,
  },
  computed: {
    ...mapGetters([
      'currentUser'
    ]),
    userType() {
      if(this.currentUser.isAdmin) {
        return 'qu\'administrateur'
      } else {
        return 'que ' + this.currentUser.name
      }
    }
  },
}
</script>
