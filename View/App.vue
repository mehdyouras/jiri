<template>
<div id="app">
  <Header></Header>
  <login-form></login-form>
</div>
</template>

<script>
import Navbar from './components/sidebar/Navbar.vue'
import Header from './components/sidebar/Header.vue'
import LoginForm from './components/login/LoginForm.vue'
export default {
  name: 'app',
  components: {
    Navbar,
    Header,
    LoginForm,
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>