<template>
<div id="app">
  <template v-if="isAppLoaded">
    <Bar v-if="route !== 'login'"></Bar>
    <transition name="zoom">
      <b-container :class="{'mb-0' : dismissCountDown}">
        <b-alert class="mb-0 w-100" :show="dismissCountDown"
                dismissible
                variant="success"
                @dismissed="dismissCountDown=0"
                @dismiss-count-down="countDownChanged">
                  <p class="mb-0 text-center">
                    {{success}}
                  </p>
        </b-alert>
      </b-container>
    </transition>
    <div class="container" :class="{'mt-5' : !dismissCountDown}">
      <transition 
          enter-active-class="fadeInRight"
          >
        <router-view></router-view>
      </transition>
    </div>
    <app-footer></app-footer>
  </template>
  <Spinner class="main-spinner" size="huge" v-if="!isAppLoaded"></Spinner>
</div>
</template>

<script>
import Bar from './components/navbar/Bar'
import {mapGetters} from 'vuex'
import Spinner from './components/common/Spinner'
import AppFooter from './components/footer/AppFooter'
import {Bus} from './Bus'

export default {
  name: 'app',
  data() {
    return {
      success: '',
      dismissCountDown: 0,
      dismissSecs: 6,
    }
  },
  components: {
    Bar,
    Spinner,
    AppFooter
  },
  computed: {
    ...mapGetters([
      'isAppLoaded',
    ]),
    route() {
      return this.$route.name;
    }
  },
  methods: {
    showAlert(payload) {
      this.dismissCountDown = this.dismissSecs;
      this.success = payload;
    },
    dismissAlert() {
      this.dismissCountDown = 0
    },
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
  },
  created() {
    Bus.$on('mutationSuccess', this.showAlert);
  }
}
</script>

<style lang="scss">
  #app {
    min-height: 100vh;
    padding-bottom: 10rem;
    position: relative;
  }
  .main-spinner {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
</style>
