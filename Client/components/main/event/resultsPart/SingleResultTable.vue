<template>
    <div class="col col-12 mb-3">
        <b-card :header="student.name">
            <template v-if="studentImplementations[0]">
                <table class="table table-hover">
                    <caption class="sr-only">Résultats de {{student.name}}</caption>
                    <thead>
                        <tr class="text-center">
                            <th scope="col">&nbsp;</th>
                            <th v-for="implementation in studentImplementations" :key="implementation.id" scope="col">{{implementation.project.name}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" :key="user.id">
                            <th v-b-tooltip.hover :title="globalComment(user.id)" scope="row">{{user.name}}</th>
                            <td v-b-tooltip.hover :title="score.comment" class="text-center" v-for="score in userScores(user.id)" :key="score.id">
                                <transition enter-active-class="fadeIn">
                                    <span v-if="score.score">
                                        {{score.score}}
                                    </span>
                                </transition>
                            </td>
                        </tr>
                        <tr class="table-info">
                            <th key="globalScore" scope="row">Évaluations globales</th>
                            <td class="text-center" v-for="implementation in studentImplementations" :key="implementation.id" scope="row">
                                <transition enter-active-class="fadeIn">
                                    <strong v-if="implementationGlobalScore(implementation)">{{implementationGlobalScore(implementation)}}</strong>
                                </transition>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <b-badge class="mb-3">Moyenne calculée : {{studentGlobalScore}}</b-badge>
                <div v-if="manualScore === '' && !showForm" class="mt-3">
                    <b-btn v-if="!printable" @click="showScoreForm" variant="primary">Ajouter la note finale</b-btn>
                </div>
                <b-badge @dblclick="showScoreForm" v-else variant="primary">Moyenne finale : {{manualScore}}</b-badge>
                <div v-if="showForm">
                    <b-form-group
                        label="Note finale"
                        label-for="manualScore"
                        :invalid-feedback="this.errors.first('manualScore')"
                        :state="!this.errors.has('manualScore')"
                        >
                        <div class="row">
                            <b-input-group class="col-6" right="/20">
                                <b-form-input type="number" min="0" max="20" id="manualScore" name="manualScore" v-validate="'required|decimal:2|min_value:0|max_value:20'" v-model.number="manualScore" :class="{'is-invalid': errors.has('manualScore')}"></b-form-input>
                            </b-input-group>
                            <b-btn v-if="!printable" variant="primary" @click="saveManualScore">
                                <Spinner v-if="isMutationLoading"></Spinner>
                                <template v-else>
                                    Sauvegarder
                                </template>
                            </b-btn>
                        </div>
                    </b-form-group>
                </div>
            </template>
            <b-alert v-else show variant="warning">Aucune implémentation disponible.</b-alert>
        </b-card>
    </div>
</template>

<script>
import _ from 'lodash'
import nanoid from 'nanoid'
import {Bus} from '../../../../Bus'
import {mapGetters} from 'vuex'
import Spinner from '../../../common/Spinner'

export default {
    name: 'SingleResultTable',
    components: {
        Spinner
    },
    data() {
        return {
            showForm: false,
            manualScore: '',
        }
    },
    props: {
        'student': {
            default: [],
        },
        'globalComments': {
            default: [],
        },
        'printable': {
            default: false,
        }
    },
    computed: {
        ...mapGetters([
            'isMutationLoading'
        ]),
        users() {
            let users = [];
            this.studentImplementations.forEach(implementation => {
                implementation.scores.forEach(score => {
                    users.push(score.user)
                })
            });
            return _.unionBy(users, user => user.id)
        },
        studentGlobalScore() {
            let allGlobalScores = [];
            let allWeights = [];
            this.studentImplementations.forEach(implementation => {
                allGlobalScores.push(this.implementationGlobalScore(implementation)*implementation.project.weight.weight)
                if(this.implementationGlobalScore(implementation) !== undefined) {
                    allWeights.push(implementation.project.weight.weight)
                }
            })
            
            allGlobalScores = _.compact(allGlobalScores)

            if(!allGlobalScores[0]) {
                return "Aucun résultat"
            }

            // Permet d'avoir les résultats sur 20 malgré que tous les projets ne soit pas cotés
            allWeights = allWeights.reduce(function(a, b){return a+b});
            return (allGlobalScores.reduce(function(a,b){return a+b;})/allWeights).toFixed(2);
        },
        studentImplementations() {
            return _.filter(this.student.implementations, implementation => {
                return implementation.project.weight.event.id === this.$route.params.eventId;
            })
        }
    },
    methods: {
        globalComment(userId) {
            let globalComment = _.filter(this.globalComments, globalComment => {
                return globalComment.user.id === userId && globalComment.student.id === this.student.id
            })
            if(globalComment[0]) {
                globalComment = globalComment[0].globalComment
                return globalComment
            }
        },
        userScores(userId) {
            let userScores = [];
            this.studentImplementations.forEach(implementation => {
                userScores.push(_.filter(implementation.scores, score => {
                    if(score.user && score.event) {
                        return score.user.id === userId && score.event.id === this.$route.params.eventId;
                    }
                }))
            })
            userScores.forEach(score => {
                if(score.length === 0) {
                    score[0] = {
                        id: nanoid(),
                        score: "",
                    }
                }
            })
            return _.flatten(userScores);
        },
        implementationGlobalScore(implementation) {
            if(implementation.scores[0]) {
                let globalScore = implementation.scores[0].score;
                let denominator = 1;
                for (let index = 1; index < implementation.scores.length; index++) {
                    if(implementation.scores[index].score) {
                        globalScore = globalScore+implementation.scores[index].score;
                        denominator++
                    }
                }
                return globalScore/denominator
            }
        },
        showScoreForm(action) {
            this.showForm = true;
        },
        saveManualScore() {
            let payload = {
                studentId: this.student.id,
                manualScore: this.manualScore,
            }
            this.$validator.validateAll().then((result) => {
                if (result) {
                    Bus.$emit('addManualScore', payload)
                    this.showForm = false;
                    return;
                }
            });
        }
    },
    created() {
        if(this.student.performance) {
            this.manualScore = this.student.performance.manualScore;
        }
    }
}
</script>
