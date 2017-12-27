<template>
    <div>
        <h2>Organiser une rencontre avec un étudiant</h2>
        <component :is="currentView"></component>
    </div>
</template>

<script>
import {ALL_STUDENTS} from '../../../constants'
import {STUDENT} from '../../../constants'
import ChooseStudent from './addParts/ChooseStudent'
import ChooseImplementations from './addParts/ChooseImplementations'

export default {
    name: 'AddMeeting',
    components: {
        ChooseStudent,
        ChooseImplementations
    },
    data() {
        return {
            allStudents: {},
            currentView: '',
        }
    },
    created() {
        // Choose the appropriate component depending on studentId in route
        if(this.$route.params.studentId) {
            this.$apollo.query({
                query: STUDENT,
                variables: {
                    id: this.$route.params.studentId
                }
            }).then(data => {
                if(data.data.Student === null) {
                    this.currentView = 'ChooseStudent'
                } else {
                    this.currentView = 'ChooseImplementations'
                }
            });
        } else {
            this.currentView = 'ChooseStudent'
        }
    },
    apollo: {
        allStudents: {
            query: ALL_STUDENTS,
            update(data) {
                return data;
            }
        }
    },
}
</script>

<style>

</style>
