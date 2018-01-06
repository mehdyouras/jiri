<template>
  <b-card>
      <h2 class="mb-3">Organiser une rencontre avec {{student.name}}</h2>
      <p>Séléctionnez un projet pour le commenter et le noter.</p>
        <Spinner v-if="isLoading"></Spinner>
        <template v-else>
            <template v-if="!student.implementations[0]">
                <p>Cet étudiant ne possède aucune implémentation.</p>
                <router-link v-if="isAdmin" :to="{name: 'addImplementationToStudent', params: {studentId: student.id}}">Lui ajouter des implémentations</router-link>
            </template>
            <ol class="list-unstyled row mt-3">
                <li class="col-md-4 col-lg-3" v-for="implementation in implementationNotAdded" :key="implementation.id">
                    <b-card :id="implementation.project.id" no-body show variant="secondary" class="mb-3">
                        <div class="card-text d-flex align-items-stretch justify-content-between">
                            <div @click="showScoreForm(implementation)" class="p-3 d-flex align-items-center card-clickable">
                                <strong class="">
                                    {{implementation.project.name}}
                                </strong>
                            </div>
                        </div>
                        <div class="d-flex">
                            <b-btn :href="implementation.urlRepo" variant="light" class="mdi mdi-github-circle mdi-24px col"><span class="sr-only">Lien vers le repo Github</span></b-btn>
                            <b-btn :href="implementation.urlProject" variant="light" class="mdi mdi-link mdi-24px col"><span class="sr-only">Lien vers le projet</span></b-btn>
                        </div>
                    </b-card>
                    <b-tooltip :target="implementation.project.id" :title="implementation.project.description"></b-tooltip>
                </li>
            </ol>   
            <ol class="list-unstyled row mt-3">
                <li class="col-md-4 col-lg-6 mb-3" v-if="isAdding">
                    <b-card>
                        <h4 class="mb-3">{{implementationAdding.project.name}}</h4>
                         <b-form-group
                                label="Commentaire"
                                label-for="comment"
                                :invalid-feedback="this.errors.first('comment')"
                                :state="!this.errors.has('comment')"
                                >
                                <b-form-textarea :rows="5" :max-rows="6" id="comment" name="comment" v-validate="'required'" v-model="comment" :class="{'is-invalid': this.errors.has('comment')}"></b-form-textarea>
                        </b-form-group>

                        <b-form-group
                                label="Note"
                                label-for="score"
                                :invalid-feedback="this.errors.first('score')"
                                :state="!this.errors.has('score')"
                                >
                                <b-input-group right="/20">
                                    <b-form-input :rows="5" :max-rows="6" type="number" id="score" name="score" v-validate="'required|decimal:2'" v-model.number="score" :class="{'is-invalid': this.errors.has('score')}"></b-form-input>
                                </b-input-group>
                        </b-form-group>

                        <b-btn variant="primary" @click="addScore">Noter</b-btn>
                    </b-card>
                </li>
                <li class="col-md-4 col-lg-6 mb-3" v-for="implementation in implementationAdded" :key="implementation.id">
                    <b-card>
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h4>{{implementation.project.name}}</h4>
                            <b-dropdown right variant="light">
                                <b-dropdown-item @click="showEdit(implementation.score.id, implementation.score.comment, implementation.score.score)">Modifier</b-dropdown-item>
                                <!-- <b-dropdown-item @click="openModal({id:student.id, name: student.name, type: 'student'})" class="text-danger">Supprimer</b-dropdown-item> -->
                            </b-dropdown>
                        </div>

                        <template v-if="editing !== implementation.score.id">
                            <p>{{implementation.score.comment}}</p>
                            <p class="display-4"><span class="badge badge-light">{{implementation.score.score}}/20</span></p>
                        </template>
                        <template v-else>
                            <label for="comment">Commentaire</label>
                            <textarea v-validate="'required'" v-model="comment" name="edit-comment" id="edit-comment" cols="30" rows="10"></textarea>
                            <span v-show="this.errors.has('edit-comment')">{{this.errors.first('edit-comment')}}</span>

                            <label for="score">Note</label>
                            <input v-validate="'required|decimal:2'" v-model.number="score" type="number" name="edit-score" id="edit-score">
                            <span v-show="this.errors.has('edit-score')">{{this.errors.first('edit-score')}}</span>

                            <button @click="editScore(implementation.score.id)">Noter</button>
                        </template>
                    </b-card>
                </li>
            </ol>
        </template>
  </b-card>
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
            'currentUserId',
            'isAdmin'
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
                if(!data.Student || data.Student.softDelte) {
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
