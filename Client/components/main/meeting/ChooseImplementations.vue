<template>
  <div>
      <h2>Organiser une rencontre avec un étudiant</h2>
      <h3>{{student.name}}</h3>
        <Spinner v-if="isLoading"></Spinner>
        <template v-else>   
            <ol>
                <li @click="showScoreForm(implementation)" v-for="implementation in implementationNotAdded" :key="implementation.id">
                    {{implementation.project.name}}
                </li>
            </ol>
            <ol>
                <li v-if="isAdding">
                    <h4>{{implementationAdding.project.name}}</h4>
                    <label for="comment">Description</label>
                    <textarea v-model="comment" name="comment" id="comment" cols="30" rows="10"></textarea>

                    <label for="score">Note</label>
                    <input v-model.number="score" type="number" name="score" id="score">

                    <button @click="addScore">Noter</button>
                </li>
                <li v-for="implementation in implementationAdded" :key="implementation.id">
                    <h4>{{implementation.project.name}}</h4>

                    <button @click="showEdit(implementation.score.id, implementation.score.comment, implementation.score.score)">Modifier</button>

                    <template v-if="editing !== implementation.score.id">
                        <p>{{implementation.score.comment}}</p>
                        <p>Note : {{implementation.score.score}}</p>
                    </template>
                    <template v-else>
                        <label for="comment">Commentaire</label>
                        <textarea v-model="comment" name="comment" id="comment" cols="30" rows="10"></textarea>
                        <label for="score">Note</label>
                        <input v-model.number="score" type="number" name="score" id="">

                        <button @click="editScore(implementation.score.id)">Noter</button>
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
            implementationAdding: {},
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
        implementationNotAdded() {
            return _.filter(this.student.implementations, (implementation) => {
                if(implementation.score) {
                    return implementation.score.user.id !== this.currentUserId;
                } else {
                    return implementation;
                }
            })
        },
        implementationAdded() {
            return _.filter(this.student.implementations, (implementation) => {
                if(implementation.score) {
                    return implementation.score.user.id === this.currentUserId;
                }
            })
        }
    },
    methods: {
        showScoreForm(implementation) {
            this.isAdding = true;
            this.implementationAdding = implementation;
        },
        addScore() {
            let payload = {
                studentId: this.student.id,
                implementationId: this.implementationAdding.id,
                comment: this.comment,
                score: this.score,
            }
            Bus.$emit('createScore', payload)
            this.isAdding = false;
            this.comment, this.score = '';
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
                score,
                studentId: this.student.id,
            }
            Bus.$emit('updateScore', payload);
            this.editing= '';
            this.score = '';
            this.comment = '';
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
