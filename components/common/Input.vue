<script setup lang="ts">
const model = defineModel<string>()
</script>

<template>
  <input v-model="model" type="text" />
</template>

<style scoped>
input {
  font-size: inherit;
  font-family: inherit;
  line-height: 1.5;

  padding: 0.5rem 1rem;
  border: var(--border-base);
  border-radius: 4px;
  outline: 0 solid brown;

  color: var(--color-font);
  background-color: transparent;

  transition: 0.2s;
  &:focus {
    outline-width: 2px;
  }
}
</style>
