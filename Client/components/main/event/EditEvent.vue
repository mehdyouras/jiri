<template>
  <b-card class="text-truncate">
    <stepper class="mb-5" :currentStep="currentStepToSend" :steps="steps"></stepper>
    <h2 class="mb-3">Modifier {{event.courseName}} - {{event.academicYear}} - {{event.examSession}}</h2>
    <transition
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
import EditInfos from './editParts/EditInfos'
import EditItemsToEvent from './editParts/EditItemsToEvent'
import {mapGetters} from 'vuex'
import {EVENT} from '../../../constants'
import Stepper from '../../common/Stepper'

import {Bus} from '../../../Bus'

export default {
  name: 'AddEvent',
  components: {
      EditInfos,
      EditItemsToEvent,
      Stepper
  },
  data() {
      return {
        event: {},
        views: [
            'EditInfos',
            'EditItemsToEvent',
            'EditItemsToEvent',
            'EditItemsToEvent',
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
                Bus.$emit('updateEvent', {...this.getCurrentAddedEvent, eventId: this.$route.params.eventId})
                this.$router.push({name: 'indexEvents'});
                break;
          }
      },
  },
  apollo: {
      event : {
          query: EVENT,
          variables() {
              return {
                  id: this.$route.params.eventId,
              }
          },
          update(data) {
              return data.Event
          }
      }
  },
  computed: {
        ...mapGetters([
            'getCurrentAddedEvent',
        ]),
        currentStepToSend() {
            let step = 
                {
                    name: this.steps[this.currentStep].name,
                    index: this.currentStep,
                };
            return step;
        },
        currentView() {
            return this.views[this.currentStep];
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
