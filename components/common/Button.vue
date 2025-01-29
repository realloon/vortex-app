<script setup lang="ts">
const {
  label,
  mode = 'normal',
  offset = 'left',
} = defineProps<{
  label?: string | number
  mode?: 'normal' | 'round' | 'text'
  offset?: 'left' | 'right'
}>()
</script>

<template>
  <button
    :class="mode"
    :style="mode === 'text' && `margin-${offset}: -0.75em`"
  >
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

  font-size: inherit;
  line-height: inherit;
  font-family: inherit;
  color: var(--color-font);
  background-color: var(--color-ctrl);

  height: 32px;
  padding-inline: 0.75em;
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

.text {
  color: var(--color-font);
  background-color: transparent;
  &:hover {
    background-color: #e6ebee;
  }
}
</style>
