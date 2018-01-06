<template>
  <footer class="footer">
    <div class="container">
      <p class="mb-0 align-items-center d-flex justify-content-center">
        <a class="mdi mdi-github-circle mdi-24px mr-2" href="http://github.com/mehdyouras/jiri">
          <span class="sr-only">Github</span>
        </a>
        <span>
          © <a href="http://mehdy.ouras.be">Mehdy Ouras</a> 2018
        </span>
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style lang="scss">
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background-color: #f5f5f5;
}
</style>
