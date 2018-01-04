<template>
  <b-card class="text-truncate">
    <stepper class="mb-5" :currentStep="currentStepToSend" :steps="steps"></stepper>
    <h2 class="mb-3">Ajouter un événement</h2>
    <transition
        :duration="{ enter: 500, leave: 800 }"
        :enter-active-class="enterAnimation"
        :leave-active-class="leaveAnimation"
        mode="out-in">
        <keep-alive>
            <component :enterAnimation="enterAnimation" :leaveAnimation="leaveAnimation" @handleStep="handleStep" :is="currentView" :currentStep="currentStep" :viewCount="viewCount"></component>
        </keep-alive>
    </transition>
  </b-card>
</template>

<script>
import AddInfos from './addParts/AddInfos'
import AddItemsToEvent from './addParts/AddItemsToEvent'
import {mapGetters} from 'vuex'
import Stepper from '../../common/Stepper';

import {Bus} from '../../../Bus'

export default {
  name: 'AddEvent',
  components: {
      AddInfos,
      AddItemsToEvent,
      Stepper
  },
  data() {
      return {
        views: [
            'AddInfos',
            'AddItemsToEvent',
            'AddItemsToEvent',
            'AddItemsToEvent',
        ],
        steps: [
            {
                icon: 'information',
                name: 'infos',
                title: 'Informations',
                component: 'AddInfos',
                completed: false,
            },
            {
                icon: 'school',
                name: 'students',
                title: 'Étudiants',
                component: 'AddItemsToEvent',
                completed: false,
            },
            {
                icon: 'account',
                name: 'users',
                title: 'Jurys',
                component: 'AddItemsToEvent',
                completed: false,
            },
            {
                icon: 'application',
                name: 'projects',
                title: 'Projets',
                component: 'AddItemsToEvent',
                completed: false,
            },
        ],
        currentStep: 0,
        previousStep: 0,
      }
  },
  methods: {
      handleStep(action) {
          switch (action) {
              case 'nextStep':
                this.steps[this.currentStep].completed = true;
                this.previousStep = this.currentStep;
                this.currentStep++
                break;
            case 'previousStep':
                this.steps[this.currentStep - 1].completed = false;
                this.previousStep = this.currentStep;
                this.currentStep--
                break;
            case 'complete':
                Bus.$emit('createEvent', this.getCurrentAddedEvent)
                this.$router.push({name: 'dashboard'});
                break;
          }
      },
  },
  computed: {
        ...mapGetters([
            'getCurrentAddedEvent',
        ]),
        currentView() {
            return this.views[this.currentStep];
        },
        currentStepToSend() {
            let step = 
                {
                    name: this.steps[this.currentStep].name,
                    index: this.currentStep,
                };
            return step;
        },
        viewCount() {
            return this.views.length;
        },
        enterAnimation() {
            if (this.currentStep < this.previousStep) {
                return 'fadeInLeft'
            } else {
                return 'fadeInRight'
            }
        },
        leaveAnimation() {
            if (this.currentStep > this.previousStep) {
                return 'fadeOutLeft'
            } else {
                return 'fadeOutRight'
            }
        }
  }
}
</script>
