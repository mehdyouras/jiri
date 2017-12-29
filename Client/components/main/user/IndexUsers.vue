<template>
  <div>
      <h2>Vue d'ensemble des utilisateurs</h2>
      <ol>
          <li @click="editUser(user.id)" v-for="user in users" :key="user.id">
              <span>{{user.name}}</span>
              <span>{{user.email}}</span>
          </li>
      </ol>
  </div>
</template>

<script>
import {ALL_USERS} from '../../../constants'

export default {
    name: 'IndexUsers',
    data() {
        return {
            users: {},
        }
    },
    methods: {
        editUser(id) {
            this.$router.push({name: 'editUser', params: {userId: id}})
        }
    },
    apollo: {
        users: {
            query: ALL_USERS,
            update(data) {
                return data.allUsers
            }
        }
    }
}
</script>

<style>

</style>
