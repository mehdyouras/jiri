<template>
  <div>
      <h2>Organiser une rencontre avec un étudiant</h2>
      <h3>{{student.name}}</h3>
        <pre>{{implementationToShow}}</pre>
        <Spinner v-if="isLoading"></Spinner>
        <template v-else>   
            <ol>
                <li @click="showScoreForm(implementation)" v-for="implementation in implementationToShow" :key="implementation.id">
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
                <li v-for="implementationScore in student.scores" :key="implementationScore.id">
                    <h4>{{implementationScore.implementation.project.name}}</h4>

                    <button @click="showEdit(implementationScore.id, implementationScore.comment, implementationScore.score)">Modifier</button>

                    <template v-if="editing !== implementationScore.id">
                        <p>{{implementationScore.comment}}</p>
                        <p>Note : {{implementationScore.score}}</p>
                    </template>
                    <template v-else>
                        <label for="comment">Commentaire</label>
                        <textarea v-model="comment" name="comment" id="comment" cols="30" rows="10"></textarea>
                        <label for="score">Note</label>
                        <input v-model.number="score" type="number" name="score" id="">

                        <button @click="editScore(implementationScore.id)">Noter</button>
                    </template>
                </li>
            </ol>
        </template>
  </div>
</template>

<script>
import {STUDENT} from '../../../constants'
import {Bus} from '../../../Bus'
import Spinner from '../../common/Spinner'
import _ from 'lodash'
import {mapGetters} from 'vuex'

export default {
    name: 'ChooseImplementationsForMeeting',
    data() {
        return {
            isLoading: 0,
            student: {},
            isAdding: false,
            editing: '',
            implementationAdded: {},
            comment: '',
            score: '',
        }
    },
    components: {
        Spinner
    },
    computed: {
        ...mapGetters([
            'currentUserId'
        ]),
        implementationToShow() {
            return _.filter(this.student.implementations, (implementation) => {
                if(implementation.score) {
                    return implementation.score.user.id !== this.currentUserId;
                } else {
                    return implementation;
                }
            })
        },
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
            this.$apollo.queries.student.refetch();
        },
        showEdit(id, comment, score) {
            this.editing = id;
            this.comment = comment;
            this.score = score;
        },
        editScore(id) {
            let {comment, score} = this;
            let payload = {
                id,
                comment,
                score
            }
            Bus.$emit('updateScore', payload);
            this.editing, this.comment, this.score = '';
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
