<template>
  <b-card>
      <h2 class="mb-3">Ajouter un utilisateur</h2>
      <div class="row">
        <UserForm class="col-lg-6"></UserForm>
      </div>
  </b-card>
</template>

<script>
import UserForm from '../../common/forms/UserForm'
import {Bus} from '../../../Bus'

export default {
    name: 'AddUser',
    components: {
        UserForm,
    },
    methods: {
        finish() {
            this.$router.push({name: 'dashboard'})
        }
    },
    created() {
        Bus.$on('userCreated', this.finish)
    }
}
</script>

<style>

</style>
