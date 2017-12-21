<template>
  <li>
      {{item.name}}
  </li>
</template>

<script>
export default {
    name: 'ListItem',
    props: [
        'item'
    ]
}
</script>
