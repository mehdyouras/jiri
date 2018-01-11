<template>
    <section>
        <pre></pre>
        <h2>Rencontres entre jurys et étudiants</h2>
        <ul v-for="(jury, index) in event.jurys" :key="jury.id">
            <li>
                {{jury.name}}
                <ul>
                    <li v-for="student in studentsToAssign(index)" :key="student.id">{{student.name}}</li>
                </ul>
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
        numberOfStudentsToAssign() {
            return parseInt((this.event.students.length / this.event.jurys.length).toFixed(0))
        }
    },
    methods: {
        studentsToAssign(index) {
            let allStudents = this.event.students;

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
