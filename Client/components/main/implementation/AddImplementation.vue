<template>
  <div>
      <h2>Les implémentations de {{student.name}}</h2>
      <ol>
          <li v-for="implementation in student.implementations" :key="implementation.id">
            <span>      
                {{implementation.project.name}}
            </span>
            <a :href="implementation.urlProject">Vers le site</a>
            <a :href="implementation.urlRepo">Vers le repo Github</a>
          </li>
      </ol>
  </div>
</template>

<script>
import {STUDENT} from '../../../constants'
import {mapGetters} from 'vuex'

export default {
    name: 'AddImplementation',
    data() {
        return {
            student: {},
        }
    },
    computed: {
        ...mapGetters([
            'currentUserId'
        ])
    },
    apollo: {
        student: {
            query: STUDENT,
            variables() {
                return {
                    id: this.$route.params.studentId
                }
            },
            update(data) {
                console.log(data)
                return data.Student
            }
        }
    }
}
</script>

<style>

</style>
