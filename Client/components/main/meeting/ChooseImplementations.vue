<template>
  <div>
      <h2>Organiser une rencontre avec un étudiant</h2>
      <h3>{{student.name}}</h3>
        <Spinner v-if="isLoading"></Spinner>
        <template v-else>   
            <ol>
                <li @click="showScoreForm(implementation)" v-for="implementation in student.implementations" :key="implementation.id">
                    {{implementation.project.name}}
                </li>
            </ol>
            <ol>
                <li v-if="isAdding">
                    <h4>{{implementationAdded.project.name}}</h4>
                    <label for="comment">Description</label>
                    <textarea v-model="comment" name="comment" id="comment" cols="30" rows="10"></textarea>

                    <label for="score">Note</label>
                    <input v-model.number="score" type="number" name="score" id="score">

                    <button @click="addScore">Noter</button>
                </li>
                <li v-for="score in student.scores" :key="score.id">
                    <h4>{{score.implementation.project.name}}</h4>
                    <p>{{score.comment}}</p>
                    <p>Note : {{score.score}}</p>
                </li>
            </ol>
        </template>
  </div>
</template>

<script>
import {STUDENT} from '../../../constants'
import {Bus} from '../../../Bus'
import Spinner from '../../common/Spinner'

export default {
    name: 'ChooseImplementationsForMeeting',
    data() {
        return {
            isLoading: 0,
            student: {},
            isAdding: false,
            implementationAdded: {},
            comment: '',
            score: '',
        }
    },
    components: {
        Spinner
    },
    methods: {
        showScoreForm(implementation) {
            this.isAdding = true;
            this.implementationAdded = implementation;
        },
        addScore() {
            let payload = {
                studentId: this.student.id,
                implementationId: this.implementationAdded.id,
                comment: this.comment,
                score: this.score,
            }
            Bus.$emit('createScore', payload)
            this.isAdding = false;
            this.comment, this.score = '';
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
            error(error) {
                this.$router.push({name: 'addMeeting'})
            },
            update(data) {
                if(!data.Student) {
                    this.$router.push({name: 'addMeeting'})
                } else {
                    return data.Student
                }
            }
        }
    },
}
</script>

<style>

</style>
