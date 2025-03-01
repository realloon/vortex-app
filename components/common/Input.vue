<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})
defineProps<{ label?: string }>()

const model = defineModel<string>()
</script>

<template>
  <label>
    <span v-if="label">{{ label }}</span>
    <input
      v-model.trim="model"
      v-bind="$attrs"
      :style="`border-radius: ${label ? 4 : 16}px`"
    />
  </label>
</template>

<style scoped>
label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

span {
  font-size: 1rem;
}

input {
  padding: calc(0.5rem - 2px) 1rem;
  border: 2px solid #bbc9d3;
  outline: none;

  color: var(--color-font);
  background-color: var(--color-ctrl);

  transition: 0.2s;
  &:focus {
    border-color: var(--color-primary);
  }

  &:hover,
  &:focus {
    background-color: var(--color-ctrl-hover);
  }

  &[disabled] {
    opacity: 0.4;
    cursor: not-allowed;
  }
}
</style>
