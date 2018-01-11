<template>
    <section>
        <h2 class="mb-3">Rencontres entre jurys et étudiants</h2>
        <ul v-for="(jury, index) in event.jurys" :key="jury.id">
            <li>
                {{jury.name}}
                <ol>
                    <li v-for="student in studentsToAssign()[index]" :key="student.id">{{student.name}}</li>
                </ol>
            </li>
        </ul>
    </section>
</template>

<script>
import {EVENT} from '../../../constants'
export default {
    name: 'PrintEvent',
    data() {
        return {
            eventId: this.$route.params.eventId,
            event: {},
        }
    },
    computed: {
        // numberOfStudentsToAssign() {
        //     let number = this.event.students.length < 7 ? this.event.students.length : Math.ceil(this.event.students.length / this.event.jurys.length);
        //     return number
        // },
        allStudents() {
            return _.filter(this.event.students, student => true)
        },
    },
    methods: {
        studentsToAssign() {
            let allStudents = this.allStudents;
            let studentsToAssign = [];
            if(this.allStudents.length % 7 === 0) {
                for (let index = 0; index < this.event.jurys.length; index++) {
                    let last = _.last(allStudents);
                    allStudents = _.dropRight(allStudents, 1)
                    allStudents.unshift(last);
                    studentsToAssign.push(allStudents)
                }
                return studentsToAssign
            }
            for (let index = 0; index < this.event.jurys.length; index++) {
                studentsToAssign = _.concat(studentsToAssign, allStudents)
            }
            return _.chunk(studentsToAssign, 7)
        }
    },
    apollo: {
        event: {
            query: EVENT,
            variables() {
                return {
                    id: this.eventId,
                }
            },
            update(data) {
                return data.Event
            }
        }
    }
}
</script>

<style>

</style>
