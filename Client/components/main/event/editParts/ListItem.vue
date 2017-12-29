<template>
  <li>
      <div @click="addItemToEvent" :class="{active : isActive}">
        {{item.name}}
      </div>
      <button @click="deleteItem">Supprimer</button>
  </li>
</template>

<script>
import {Bus} from '../../../../Bus'
import {mapGetters} from 'vuex'
import _ from 'lodash'

export default {
    name: 'ListItem',
    data() {
        return {
            isActive: false,
        }
    },
    computed: {
        ...mapGetters([
            'getItemsAddedToEvent'
        ]),
    },
    props: [
        'item',
        'currentStep'
    ],
    methods: {
        deleteItem() {
            let type = ['student', 'user', 'project']
            Bus.$emit('removeItem', {id: this.item.id, type: type[this.currentStep - 1]})
        },
        addItemToEvent() {
            let idToUse = this.currentStep === 3 ? this.item.weight.id : this.item.id;

            if(!this.isActive) {
                let mutations = ['addStudentToEvent', 'addUserToEvent', 'addProjectToEvent']
                this.$store.commit(mutations[this.currentStep - 1], idToUse)

                this.isActive = true;
            } else if(this.isActive) {
                let mutations = ['deleteStudentFromEvent', 'deleteUserFromEvent', 'deleteProjectFromEvent']
                this.$store.commit(mutations[this.currentStep - 1], idToUse)

                this.isActive = false;
            }
        }
    },
    created() {


        let idToCheck = this.currentStep === 3 ? this.item.weight.id : this.item.id;
        let isActive = _.find(this.getItemsAddedToEvent[this.currentStep - 1], (id) => id === idToCheck);
        this.isActive = !!isActive;
    }
}
</script>

<style>
    .active {
        color: red;
    }
</style>
