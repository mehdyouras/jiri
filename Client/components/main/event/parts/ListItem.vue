<template>
  <li>
      {{item.name}}
      <button @click="deleteItem">Supprimer</button>
  </li>
</template>

<script>
import {Bus} from '../../../../Bus'

export default {
    name: 'ListItem',
    props: [
        'item',
        'currentStep'
    ],
    methods: {
        deleteItem() {
            let type = [false, 'student', 'user', 'project']
            Bus.$emit('removeItem', {id: this.item.id, type: type[this.currentStep]})
        }
    }
}
</script>
