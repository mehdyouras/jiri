<template>
  <b-card>
      <h2 class="mb-3">Organiser une rencontre avec {{student.name}}</h2>
      <b-btn v-b-modal.addGlobalComment variant="primary mb-3"><template v-if="edit.globalComment === ''">Emettre un</template><template v-else>Modifier le</template>  commentaire global</b-btn>
      <b-btn :to="{name: 'addMeeting'}" variant="secondary mb-3">Séléctionner un autre étudiant</b-btn>
      <p>Séléctionnez un projet pour le commenter et le noter.</p>
        <Spinner v-if="isLoading"></Spinner>
        <template v-else>
            <template v-if="!implementationsToShow[0]">
                <b-alert show variant="warning">
                    <p class="mb-0">Cet étudiant ne possède aucune implémentation.</p>
                    <b-btn class="mt-3" variant="primary" v-if="isAdmin" @click="editStudent(student.id)">Lui ajouter des implémentations</b-btn>
                </b-alert>
            </template>
            <transition-group tag="ol" name="zoom" v-if="implementationNotAdded[0]" class="list-unstyled row mt-3">
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
            </transition-group>   
            <transition-group tag="ol" name="zoom" v-if="isAdding || scoreAdded[0]" class="list-unstyled row mt-3">
                <li :key="implementationAdding.id" class="col-md-4 col-lg-6 mb-3" v-if="isAdding">
                    <b-card>
                        <h4 class="mb-3">{{implementationAdding.project.name}}</h4>
                         <b-form-group
                                label="Commentaire"
                                label-for="comment"
                                :invalid-feedback="errors.first('comment')"
                                :state="!errors.has('comment')"
                                >
                                <b-form-textarea :rows="5" :max-rows="6" id="comment" name="comment" v-validate="'required'" v-model="comment" :class="{'is-invalid': errors.has('comment')}"></b-form-textarea>
                        </b-form-group>

                        <b-form-group
                                label="Note"
                                label-for="score"
                                :invalid-feedback="errors.first('score')"
                                :state="!errors.has('score')"
                                >
                                <b-input-group right="/20">
                                    <b-form-input :rows="5" :max-rows="6" type="number" min="0" max="20" id="score" name="score" v-validate="'required|decimal:2|min_value:0|max_value:20'" v-model.number="score" :class="{'is-invalid': errors.has('score')}"></b-form-input>
                                </b-input-group>
                        </b-form-group>

                        <b-btn variant="primary" @click="addScore">Noter</b-btn>
                    </b-card>
                </li>
                <li class="col-md-4 col-lg-6 mb-3" v-for="score in scoreAdded" :key="score.id">
                    <b-card>
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h4>{{score.implementation.project.name}}</h4>
                            <b-dropdown right variant="light">
                                <b-dropdown-item @click="showEdit(score.id, score.comment, score.score)">Modifier</b-dropdown-item>
                            </b-dropdown>
                        </div>

                        <template v-if="editing !== score.id">
                            <p>{{score.comment}}</p>
                            <p class="display-4"><span class="badge badge-light">{{score.score}}/20</span></p>
                        </template>
                        <template v-else>
                            <b-form-group
                                label="Commentaire"
                                label-for="edit-comment"
                                :invalid-feedback="errors.first('edit-comment')"
                                :state="!errors.has('edit-comment')"
                                >
                                <b-form-textarea :rows="5" :max-rows="6" id="edit-comment" name="edit-comment" v-validate="'required'" v-model="edit.comment" :class="{'is-invalid': errors.has('edit-comment')}"></b-form-textarea>
                            </b-form-group>

                            <b-form-group
                                    label="Note"
                                    label-for="edit-score"
                                    :invalid-feedback="errors.first('edit-score')"
                                    :state="!errors.has('edit-score')"
                                    >
                                    <b-input-group right="/20">
                                        <b-form-input :rows="5" :max-rows="6" type="number" min="0" max="20" id="edit-score" name="edit-score" v-validate="'required|decimal:2|min_value:0|max_value:20'" v-model.number="edit.score" :class="{'is-invalid': errors.has('edit-score')}"></b-form-input>
                                    </b-input-group>
                            </b-form-group>

                            <b-btn variant="primary" @click="editScore(score.id)">Noter</b-btn>
                        </template>
                    </b-card>
                </li>
            </transition-group>
        </template>
        <edit-student v-if="editModal.show" @hidden="editModal.show = false" :visible="editModal.show" :studentId="student.id"></edit-student>
        <b-modal @ok="addGlobalComment" id="addGlobalComment" ref="addGlobalComment" title="Commentaire global" ok-title="Sauvegarder" ok-variant="primary" cancel-title="Annuler">
            <b-form-group
                label="Commentaire"
                label-for="global-comment"
                :invalid-feedback="errors.first('global-comment')"
                :state="!errors.has('global-comment')"
                >
                <b-form-textarea :rows="5" :max-rows="6" id="global-comment" name="global-comment" v-validate="'required'" v-model="edit.globalComment" :class="{'is-invalid': errors.has('global-comment')}"></b-form-textarea>
            </b-form-group>
        </b-modal>
  </b-card>
</template>

<script>
import {STUDENT, USER, GLOBAL_COMMENT} from '../../../constants'
import {Bus} from '../../../Bus'
import Spinner from '../../common/Spinner'
import _ from 'lodash'
import {mapGetters} from 'vuex'
import EditStudent from '../student/EditStudent'

export default {
    name: 'ChooseImplementationsForMeeting',
    data() {
        return {
            isLoading: 0,
            student: {},
            user: {},
            isAdding: false,
            editing: '',
            implementationAdding: {},
            comment: '',
            score: '',
            editModal: {
                show: false,
            },
            edit: {
                comment: "",
                score: "",
                globalComment: "",
            },
            studentIdToEdit: "",
            globalComment: {},
        }
    },
    components: {
        Spinner,
        EditStudent
    },
    computed: {
        ...mapGetters([
            'currentUserId',
            'isAdmin'
        ]),
        implementationsToShow() {
            return _.filter(this.student.implementations, implementation => {
                return  implementation.project.weight.event.id === this.student.event.id
            })
        },
        implementationNotAdded() {
            return _.filter(this.implementationsToShow, (implementation) => {
                if(implementation.scores[0]) {
                    return _.findIndex(implementation.scores, score => score.user.id === this.currentUserId)
                } else {
                    return implementation;
                }
            })
        },
        scoreAdded() {
            return _.filter(this.user.scores, (score) => {
                if(score.student && score.event) {
                    return score.student.id === this.$route.params.studentId && score.event.id === this.student.event.id;
                }
            })
        }
    },
    methods: {
        editStudent(id) {
            this.studentIdToEdit = id;
            this.editModal.show = true;
        },
        showScoreForm(implementation) {
            this.isAdding = true;
            this.implementationAdding = implementation;
        },
        addScore() {
            let payload = {
                eventId: this.student.event.id,
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
            this.edit.comment = comment;
            this.edit.score = score;
        },
        editScore(id) {
            let {comment, score} = this.edit;
            let payload = {
                id,
                comment,
                score,
                studentId: this.student.id,
            }
            Bus.$emit('updateScore', payload);
            this.editing= '';
            this.edit.score = '';
            this.edit.comment = '';
        },
        addGlobalComment() {
            let id = '';
            if(this.globalComment) {
                id = this.globalComment.id
            }
            let payload = {
                id,
                studentId: this.$route.params.studentId,
                userId: this.currentUserId,
                globalComment: this.edit.globalComment,
            }
            Bus.$emit('addGlobalComment', payload)
        }
    },
    apollo: {
        user: {
            query: USER,
            variables() {
                return {
                    id: this.currentUserId,
                }
            },
            loadingKey: 'isLoading',
            update(data) {
                return data.User
            },
        },
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
                if(!data.Student || data.Student.softDelete) {
                    this.$router.push({name: 'addMeeting'})
                } else {
                    return data.Student
                }
            }
        },
        globalComment: {
            query: GLOBAL_COMMENT,
            variables() {
                return {
                    studentId: this.$route.params.studentId,
                    userId: this.currentUserId,
                }
            },
            update(data) {
                if(data.allGlobalComments[0]) {
                    this.edit.globalComment = data.allGlobalComments[0].globalComment;
                }
                return data.allGlobalComments[0]
            }
        }
    },
}
</script>

<style>

</style>
