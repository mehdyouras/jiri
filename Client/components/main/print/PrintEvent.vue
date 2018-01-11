<template>
    <section>
        <h2 class="mb-3">Rencontres entre jurys et étudiants</h2>
        <section>
            <h3>Jurys</h3>
            <ul class="list-unstyled" v-for="(jury, index) in jurys" :key="jury.id">
                <li>
                    {{jury.name}} - {{decrypt(jury.password)}}
                    <ol class="list-unstyled mt-3">
                        <li v-for="(student, i) in studentsToAssign()[index]" :key="student.id"><strong>{{time[i]}}</strong> {{student.name}}</li>
                    </ol>
                </li>
            </ul>
        </section>
        <section>
            <h3>Étudiants</h3>
            <ul v-for="student in event.students" :key="student.id">
                <li>
                    {{student.name}}
                    <ol>
                        <template v-for="(jury, i) in studentJurys(student.id)" >
                            <li v-if="jury[0]" :key="jury.id"><strong>{{time[i]}}</strong> {{jurys[i].name}}</li>
                        </template>
                    </ol>
                </li>
            </ul>
        </section>
    </section>
</template>

<script>
import {EVENT_PRINT} from '../../../constants'
import {decrypt} from '../../../crypto'
export default {
    name: 'PrintEvent',
    data() {
        return {
            eventId: this.$route.params.eventId,
            event: {},
            allStudents: {},
            jurys: {},
            time: ["8h45 - 9h30", "9h30 - 10h00", "10h00 - 11h00", "11h40 - 12h10", "13h50 - 14h50", "15h00 - 16h00", "16h10 - 17h15"],
        }
    },
    methods: {
        studentsToAssign() {
            let allStudents = this.allStudents;
            let studentsToAssign = [];

            if(this.allStudents.length % 7 === 0) {
                for (let index = 0; index < this.jurys.length; index++) {
                    let last = _.last(allStudents);
                    allStudents = _.dropRight(allStudents, 1)
                    allStudents.unshift(last);
                    studentsToAssign.push(allStudents)
                }
                return _.dropRight(studentsToAssign, studentsToAssign.length - this.jurys.length)
            }
            for (let index = 0; index < this.jurys.length; index++) {
                studentsToAssign = _.concat(studentsToAssign, allStudents)
            }

            studentsToAssign = _.chunk(studentsToAssign, 7);

            return _.dropRight(studentsToAssign, studentsToAssign.length - this.jurys.length)
        },
        studentJurys(id) {
            let studentJurys = [];
            let studentsToAssign = this.studentsToAssign();

            studentsToAssign.forEach((jury, index) => {
                studentJurys.push(_.filter(jury, (student) => {
                    return student.id === id
                }))
            });
            
            return studentJurys
        },
        decrypt(password) {
            return decrypt(password);
        }
    },
    apollo: {
        event: {
            query: EVENT_PRINT,
            variables() {
                return {
                    id: this.eventId,
                }
            },
            update(data) {
                this.allStudents = JSON.parse(JSON.stringify(data.Event.students));
                this.jurys = _.filter(data.Event.jurys, jury => {
                    return jury.softDelete === false;
                })
                return data.Event
            }
        }
    }
}
</script>

<style>

</style>
