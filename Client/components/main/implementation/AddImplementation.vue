<template>
  <div>
      <h2>Les implémentations de {{student.name}}</h2>
        <!-- <pre>{{student}}</pre> -->
        <Spinner v-if="isLoading"></Spinner>
        <template v-else>     
            <button @click="showForm">Ajouter une implémentation</button>
            <div v-if="isAdding">
                <ImplementationForm></ImplementationForm>
            </div>
            <ol>
                <li v-for="implementation in student.implementations" :key="implementation.id">
                    <span>      
                        {{implementation.project.name}}
                    </span>
                    <a :href="implementation.urlProject">Vers le site</a>
                    <a :href="implementation.urlRepo">Vers le repo Github</a>
                </li>
            </ol>
        </template>
  </div>
</template>

<script>
import {STUDENT} from '../../../constants'
import {mapGetters} from 'vuex'
import Spinner from '../../common/Spinner'
import ImplementationForm from '../../common/forms/ImplementationForm'

export default {
    name: 'AddImplementation',
    data() {
        return {
            student: {},
            isAdding: false,
            isLoading: 0,
        }
    },
    components: {
        Spinner,
        ImplementationForm
    },
    computed: {
        ...mapGetters([
            'currentUserId'
        ])
    },
    methods: {
        showForm() {
            this.isAdding = true;
        }
    },  
    apollo: {
        student: {
            query: STUDENT,
            variables() {
                return {
                    id: this.$route.params.studentId
                }
            },
            loadingKey: 'isLoading',
            update(data) {
                return data.Student
            }
        }
    }
}
</script>

<style>

</style>
