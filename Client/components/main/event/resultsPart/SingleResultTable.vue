<template>
    <div class="col col-lg-6 col-12 mb-3">
        <b-card :header="student.name">
            <table class="table table-hover">
                <caption class="sr-only">Résultats de {{student.name}}</caption>
                <thead>
                    <tr class="text-center">
                        <th scope="col">&nbsp;</th>
                        <th v-for="implementation in student.implementations" :key="implementation.id" scope="col">{{implementation.project.name}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.id">
                        <th v-b-tooltip.hover title="yo" scope="row">{{user.name}}</th>
                        <td v-b-tooltip.hover :title="score.comment" class="text-center" v-for="score in userScores(user.id)" :key="score.id">{{score.score}}</td>
                    </tr>
                    <tr class="table-info">
                        <th scope="row">Évaluations globales</th>
                        <td class="text-center" v-for="implementation in student.implementations" :key="implementation.id" scope="row">
                            <strong>{{implementationGlobalScore(implementation)}}</strong>
                        </td>
                    </tr>
                </tbody>
            </table>
            <b-badge class="mb-3">Moyenne calculée : {{studentGlobalScore}}</b-badge>
            <div v-if="manualScore === '' && !showForm" class="mt-3">
                <b-btn @click="showScoreForm" variant="primary">Ajouter la note finale</b-btn>
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
                        <b-btn variant="primary" @click="saveManualScore">
                            <Spinner v-if="isMutationLoading"></Spinner>
                            <template v-else>
                                Sauvegarder
                            </template>
                        </b-btn>
                    </div>
                </b-form-group>
            </div>
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
        }
    },
    computed: {
        ...mapGetters([
            'isMutationLoading'
        ]),
        users() {
            let users = [];
            this.student.implementations.forEach(implementation => {
                implementation.scores.forEach(score => {
                    users.push(score.user)
                })
            });
            return _.unionBy(users, user => user.id)
        },
        studentGlobalScore() {
            let allGlobalScores = [];
            this.student.implementations.forEach(implementation => {
                allGlobalScores.push(this.implementationGlobalScore(implementation)*implementation.project.weight.weight)
            })
            
            allGlobalScores = _.compact(allGlobalScores)

            if(!allGlobalScores[0]) {
                return "Aucun résultat"
            }

            return allGlobalScores.reduce(function(a,b){return a+b;}).toFixed(2);
        }
    },
    methods: {
        userScores(userId) {
            let userScores = [];
            this.student.implementations.forEach(implementation => {
                userScores.push(_.filter(implementation.scores, score => {
                    return score.user.id === userId;
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

<style>

</style>
