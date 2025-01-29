<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <h1>/posts/[id].vue</h1>
  <p>{{ route.params.id }}</p>
</template>
