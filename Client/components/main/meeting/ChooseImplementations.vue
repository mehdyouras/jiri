<template>
  <div>
      <h2>Organiser une rencontre avec un étudiant</h2>
      <p>implementations</p>
  </div>
</template>

<script>
import {STUDENT} from '../../../constants'

export default {
    name: 'ChooseImplementations',
    methods: {
        redirect() {
            // Choose the appropriate component depending on studentId in route
            if(this.$route.params.studentId) {
                this.$apollo.query({
                    query: STUDENT,
                    variables: {
                        id: this.$route.params.studentId
                    }
                }).then(data => {
                    if(data.data.Student === null) {
                        this.$router.push({name: 'addMeeting'})
                    } else {
                        console.log('Good route')
                    }
                });
            } else {
                this.$router.push({name: 'addMeeting'})
            }
        }
    },
    created() {
        this.redirect();
    }
}
</script>

<style>

</style>
