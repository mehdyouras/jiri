<template>
  <div>
    <label for="student-email">Adresse email</label>
    <input type="email" id="student-email">
    <label for="student-name">Nom</label>
    <input type="text" id="student-name">
  </div>
</template>

<script>
export default {
    name:'StudentForm',
    created() {
        this.$emit('formHasChanged')
    }
}
</script>

<style>

</style>
