<script setup lang="ts">
import { CommonButton, IconArrow } from '#components'

interface Option {
  label: string
  value: string
}

const { options } = defineProps<{
  options: Option[]
}>()

const model = defineModel<string>({ required: true })

const isOpen = ref(false)

const label = computed(
  () => options.find(option => option.value === model.value)?.label
)

function change(value: string) {
  model.value = value
  isOpen.value = false
}
</script>

<template>
  <div class="select">
    <CommonButton
      class="arrow"
      @click="isOpen = !isOpen"
      mode="text"
      :label="label"
    >
      <IconArrow />
    </CommonButton>

    <ul v-show="isOpen">
      <li
        v-for="{ label, value } in options"
        @click="change(value)"
        role="option"
        :aria-selected="value === model"
      >
        {{ label }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.select {
  position: relative;
}

ul {
  position: absolute;
  top: 36px;
  left: 0;

  width: fit-content;
  background-color: #16181a;
  border-radius: 8px;

  li {
    padding: 0.75rem 1rem;
    cursor: pointer;

    &:first-child {
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }
    &:last-child {
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }
    &:hover {
      background-color: #242629;
    }
  }
}

/* tmp */
.arrow {
  flex-direction: row-reverse;

  svg {
    transform: scale(1.2) translateY(0.1em);
  }
}
</style>
