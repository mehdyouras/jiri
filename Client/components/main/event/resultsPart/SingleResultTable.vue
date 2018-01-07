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
                        <th scope="row">{{user.name}}</th>
                        <td class="text-center" v-for="score in userScores(user.id, user.name)" :key="score.id">{{score.score}}</td>
                    </tr>
                </tbody>
            </table>
            <b-badge></b-badge>
        </b-card>
    </div>
</template>

<script>
import _ from 'lodash'
import nanoid from 'nanoid'

export default {
    name: 'SingleResultTable',
    props: {
        'student': {
            default: [],
        }
    },
    computed: {
        users() {
            let users = [];
            this.student.implementations.forEach(implementation => {
                implementation.scores.forEach(score => {
                    users.push(score.user)
                })
            });
            return _.unionBy(users, user => user.id)
        }
    },
    methods: {
        userScores(userId, name) {
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
        }
    },
}
</script>

<style>

</style>
