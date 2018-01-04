<template>
  <li class="col-md-4 col-lg-3">
      <b-card @click="addItemToEvent" no-body show variant="secondary" :class="{'bg-primary': isActive, 'mb-3': true}">
          <b-card-body class="card-text d-flex justify-content-between align-items-center">
            <div>
                <span :class="{'text-white': isActive}">
                    {{item.name}}
                </span>
            </div>
            <b-dropdown variant="light">
                <b-dropdown-item @click="editItem">Modifier</b-dropdown-item>
                <b-dropdown-item @click="deleteItem">Supprimer</b-dropdown-item>
            </b-dropdown>
          </b-card-body>
      </b-card>
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
        editItem() {
            let type = ['students', 'users', 'projects']
            this.$router.push(`/${type[this.currentStep - 1]}/${this.item.id}`)
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
