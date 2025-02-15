<script setup lang="ts">
import emitter from '~/utils/emitter'
import { IconArrow } from '#components'

const {
  title,
  items,
  mode = 'route',
} = defineProps<{
  title: string
  items: Array<{
    label: string
    path: string
  }>
  mode?: 'route' | 'mitt'
}>()

function to(path: string) {
  mode === 'route' ? navigateTo(path) : emitter.emit('route', path)
}

const isOpen = ref(true)
function handle(e: ToggleEvent) {
  isOpen.value = e.newState === 'open' ? true : false
}
</script>

<template>
  <details open @toggle="handle">
    <summary>
      <h2>{{ title }}</h2>
      <IconArrow class="arrow-icon" :class="isOpen && 'is-open'" />
    </summary>

    <nav>
      <ul>
        <li
          :class="$route.path === path && 'active'"
          v-for="{ label, path } in items"
          @click="to(path)"
        >
          <div class="color-icon"></div>
          <span>{{ label }}</span>
        </li>
      </ul>
    </nav>
  </details>
</template>

<style scoped>
summary,
li {
  line-height: 1.5;
  padding: 0.5em 16px;
  border-radius: 8px;
}

summary {
  display: flex;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;
  user-select: none;

  transition: 0.2s;
  &:hover {
    background-color: var(--color-ctrl-hover);
  }
}

li {
  display: flex;
  align-items: center;
  gap: 1em;

  cursor: pointer;

  transition: 0.2s;
  &:hover {
    background-color: var(--color-ctrl-hover);
  }
  &.active {
    background-color: var(--color-ctrl-active);
  }
}

.arrow-icon {
  transform: scale(1.2) rotate(90deg);

  transition: 0.2s;
  &.is-open {
    transform: scale(1.2);
  }
}

.color-icon {
  width: 16px;
  height: 16px;
  border-radius: 6px;
  background-color: brown;
}
</style>
