<template>
  <div>
    <label for="project-name">Nom du projet</label>
    <input type="text" id="project-name">
    <label for="project-description">Description</label>
    <input type="text">
    <label for="project-weight">Pondération</label>
    <input type="number" name="project-weight" id="project-weight">
  </div>
</template>

<script>
export default {
  name: 'ProjectForm'
}
</script>

