<template>
  <b-card>
      <h2 class="mb-3">Organiser une rencontre avec {{student.name}}</h2>
      <b-btn :to="{name: 'addMeeting'}" variant="primary mb-3">Séléctionner un autre étudiant</b-btn>
      <p>Séléctionnez un projet pour le commenter et le noter.</p>
        <Spinner v-if="isLoading"></Spinner>
        <template v-else>
            <template v-if="!student.implementations[0]">
                <b-alert show variant="warning">
                    <p>Cet étudiant ne possède aucune implémentation.</p>
                    <b-btn variant="primary" v-if="isAdmin" @click="editStudent(student.id)">Lui ajouter des implémentations</b-btn>
                </b-alert>
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
                                    <b-form-input :rows="5" :max-rows="6" type="number" id="score" name="score" v-validate="'required|decimal:2'" v-model.number="score" :class="{'is-invalid': errors.has('score')}"></b-form-input>
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
                            <b-form-group
                                label="Commentaire"
                                label-for="comment"
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
                                    <b-form-input :rows="5" :max-rows="6" type="number" id="edit-score" name="edit-score" v-validate="'required|decimal:2'" v-model.number="edit.score" :class="{'is-invalid': errors.has('edit-score')}"></b-form-input>
                                </b-input-group>
                        </b-form-group>

                        <b-btn variant="primary" @click="editScore(implementation.score.id)">Noter</b-btn>
                        </template>
                    </b-card>
                </li>
            </ol>
        </template>
        <edit-student v-if="editModal.show" @hidden="editModal.show = false" :visible="editModal.show" :studentId="student.id"></edit-student>
  </b-card>
</template>

<script>
import {STUDENT} from '../../../constants'
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
            },
            studentIdToEdit: "",
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
        implementationNotAdded() {
            return _.filter(this.student.implementations, (implementation) => {
                if(implementation.scores[0]) {
                    return _.findIndex(implementation.scores, score => score.user.id === this.currentUserId)
                } else {
                    return implementation;
                }
            })
        },
        implementationAdded() {
            return _.filter(this.student.implementations, (implementation) => {
                if(implementation.scores[0]) {
                    return _.findIndex(implementation.scores, score => score.user.id !== this.currentUserId)
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
