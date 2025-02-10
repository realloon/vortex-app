<script setup lang="ts">
const {
  label,
  mode = 'default',
  size = 'default',
  center = false,
  disabled = false,
} = defineProps<{
  label?: string | number
  mode?: 'default' | 'round' | 'text'
  size?: 'default' | 'huge'
  center?: boolean
  disabled?: boolean
}>()
</script>

<template>
  <button
    :class="[mode, size, center && 'is-center', disabled && 'is-disabled']"
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

  line-height: inherit;
  color: var(--color-font);
  background-color: var(--color-ctrl);

  height: 32px;
  padding-inline: 0.75rem;
  padding-block: 0;
  border: var(--border-base);
  border-radius: 16px;

  cursor: pointer;
  transition: 0.4s;

  &.is-disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:not(.is-disabled):hover {
    background-color: var(--color-ctrl-active);
  }
}

.is-center {
  justify-content: center;
}

.huge {
  height: 40px;
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
  border: none;
  &:hover {
    background-color: #e6ebee;
  }
}
</style>
