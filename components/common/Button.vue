<script setup lang="ts">
const { label, mode = 'default' } = defineProps<{
  label?: string | number
  mode?: 'default' | 'round' | 'text'
}>()
</script>

<template>
  <button :class="mode">
    <slot></slot>
    <span v-if="label || label === 0">{{ label }}</span>
  </button>
</template>

<style scoped>
button {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 0.5em;

  line-height: inherit;
  color: var(--color-font);
  background-color: var(--color-ctrl);

  height: 32px;
  padding-inline: 0.75rem;
  padding-block: 0;
  border: none;
  border-radius: 16px;

  cursor: pointer;
  transition: 0.4s;

  &:not([disabled]):hover {
    background-color: var(--color-ctrl-active);
  }

  &[disabled] {
    color: var(--color-disabele-font);
    background-color: var(--color-disabele-back);
    cursor: not-allowed;
  }
}

.round {
  display: flex;
  justify-content: center;

  width: 32px;
  padding-inline: 0;
}

.text {
  color: var(--color-font);
  background-color: transparent;
  &:hover {
    background-color: #e6ebee;
  }
}
</style>
