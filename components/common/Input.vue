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
      :style="`border-radius: ${label ? 8 : 16}px`"
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
  font-size: 0.875rem;
}

input {
  padding: 0.5rem 1rem;
  border: var(--border-base);

  color: var(--color-font);
  background-color: var(--color-ctrl);

  outline: 2px solid transparent;
  outline-offset: -1px;
  transition: 0.2s;
  &:focus {
    outline-color: var(--color-primary);
  }

  &:hover {
    background-color: var(--color-ctrl-hover);
  }
}
</style>
