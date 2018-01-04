<template>
    <div class="stepper-box">
        <div class="top">
            <div class="divider-line"
                 :style="{width: `${(100/(steps.length) * (steps.length - 1)) - 10}%`}"
            ></div>
            <div class="steps-wrapper">
                <template v-if="topButtons">
                    <div v-if="currentStep.index > 0" class="stepper-button-top previous" @click="backStep()">
                        <i class="material-icons">keyboard_arrow_left</i>
                    </div>
                </template>
                <template v-for="(step, index) in steps">
                    <div :class="['step', isStepActive(index, step)]"
                         :style="{width: `${100 / steps.length}%`}"
                    >
                        <div class="circle">
                            <span class="mdi" :class="(step.completed) ? 'mdi-check' : 'mdi-' + step.icon"></span>
                        </div>
                        <div class="step-title">
                            <h4>{{step.title}}</h4>
                            <h5 class="step-subtitle">{{step.subtitle}}</h5>
                        </div>
                    </div>
                </template>
                <div v-if="topButtons" :class="['stepper-button-top next', !canContinue ? 'deactivated' : '']" @click="nextStep()">
                    <i class="material-icons">keyboard_arrow_right</i>
                </div>
            </div>
        </div>
        <!-- <div class="content">
            <transition
                    :enter-active-class="enterAnimation"
                    :leave-active-class="leaveAnimation"
                    mode="out-in"
            >
                
                <keep-alive v-if="keepAlive">
                    <component :is="steps[currentStep.index].component" :clickedNext="nextButton[currentStep.name]"
                               @can-continue="proceed" @change-next="changeNextBtnValue" :current-step="currentStep"></component>
                </keep-alive>
                
                <component v-else :is="steps[currentStep.index].component" :clickedNext="nextButton[currentStep.name]"
                           @can-continue="proceed"  @change-next="changeNextBtnValue" :current-step="currentStep"></component>
            </transition>
        </div> -->
    
    </div>
</template>

<script>
    export default {

        props: {
            locale: {
                type: String,
                default: 'en'
            },
            topButtons: {
                type: Boolean,
                default: false
            },
            currentStep: {
                type: Object,
            },
            steps: {
                type: Array,
                default: function () {
                    return [
                        {
                            icon: 'mail',
                            name: 'first',
                            title: 'Sample title 1',
                            subtitle: 'Subtitle sample'

                        },
                        {
                            icon: 'report_problem',
                            name: 'second',
                            title: 'Sample title 2',
                            subtitle: 'Subtitle sample'
                        }
                    ]
                }
            },
            keepAlive: {
                type: Boolean,
                default: true
            }
        },

        data() {
            return {
                previousStep: {},
                nextButton: {},
                canContinue: false,
                finalStep: false
            }
        },

        computed: {
            enterAnimation() {
                if (this.currentStep.index < this.previousStep.index) {
                    return 'animated quick fadeInLeft'
                } else {
                    return 'animated quick fadeInRight'
                }
            },
            leaveAnimation() {
                if (this.currentStep.index > this.previousStep.index) {
                    return 'animated quick fadeOutLeft'
                } else {
                    return 'animated quick fadeOutRight'
                }
            }
        },

        methods: {
            isStepActive(index, step) {
                if (this.currentStep.index === index) {
                    return 'activated'
                } else {
                    return 'deactivated'
                }
            },

            activateStep(index, back = false) {
                if (this.steps[index]) {
                    this.previousStep = this.currentStep;

                    if (index + 1 === this.steps.length) {
                        this.finalStep = true;
                    } else {
                        this.finalStep = false;
                    }

                    if (!back) {
                        this.$emit('completed-step', this.previousStep);
                    }
                }
                this.$emit('active-step', this.currentStep);
            },


            proceed(payload) {
                this.canContinue = payload.value;
            },

            changeNextBtnValue(payload) {
                this.nextButton[this.currentStep.name] = payload.nextBtnValue;
                this.$forceUpdate();
            }
        },

        created() {
            // Initiate stepper
            this.activateStep(0);
            this.steps.forEach((step) => {
                this.nextButton[step.name] = false;
            });
        }
    }
</script>

<style lang="scss">
    @mixin shadow($level: 1) {
  @if $level == 1 {box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);}
  @else if $level == 2 {box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);}
  @else if $level == 3 {box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);}
  @else if $level == 4 {box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);}
  @else if $level == 5 {box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);}
}

@mixin breakpoint($class) {
  @if $class == xs {
    @media (max-width: 767px) { @content; }
  }

  @else if $class == sm {
    @media (min-width: 768px) { @content; }
  }

  @else if $class == md {
    @media (min-width: 992px) { @content; }
  }

  @else if $class == lg {
    @media (min-width: 1200px) { @content; }
  }

  @else {
    @warn "Breakpoint mixin supports: xs, sm, md, lg";
  }
}

.stepper-box {
  .top {
    display: flex;
    align-items: center;
    position: relative;
    justify-content: center;
    .divider-line {
      border-bottom: 1px solid #cccccc;
      height: 2px;
      position: absolute;
      @include breakpoint(xs) {
        width: 90%;
      }
    }
    .steps-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      width: 95%;
      left: 0;
      padding: 2% 4%;
      @include breakpoint(xs) {
        width: 90%;
        justify-content: center;
      }
      .step {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        @include breakpoint(xs) {
          width: 100% !important;
        }
        &.deactivated {
          @include breakpoint(xs) {
            display: none;
          }
          .circle {
            span {
              background-color: #bbbbbb !important;
            }
          }
          .step-title {
            opacity: .35;
          }
        }
        .circle {
          margin-bottom: 1rem;
          padding: 0 1rem;
          background-color: white;
          span {
            background-color: #007bff;
            color: #fff;
            border-radius: 100rem;
            padding: 1rem;
          }
        }
        .step-title {
          position: absolute;
          top: 90%;
          width: 100%;
          h1, h2, h3, h4, h5 {
            margin: 0 0 .2rem 0;
            color: #333333;
            font-weight: bold;
          }
          .step-subtitle {
            font-weight: lighter;
            margin: 0;
            color: #555555;
          }
        }
      }
    }
  }

}
</style>