<template>
<div id="app">
  <Header></Header>
  <login-form></login-form>
  <signup-form></signup-form>
</div>
</template>

<script>
import Navbar from './components/sidebar/Navbar.vue'
import Header from './components/sidebar/Header.vue'
import LoginForm from './components/login/LoginForm.vue'
import SignupForm from './components/login/SignupForm.vue'

export default {
  name: 'app',
  components: {
    Navbar,
    Header,
    LoginForm,
    SignupForm,
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>