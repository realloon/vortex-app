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
  --bgc: #ffffff;
  --hover: #e6ebee;
  --shadow: ;

  @media (prefers-color-scheme: dark) {
    --bgc: #16181a;
    --hover: #242629;
  }
}

ul {
  position: absolute;
  top: 36px;
  left: 0;

  width: fit-content;
  background-color: var(--bgc);
  border-radius: 8px;
  box-shadow: 0px 4px 12px 1px #00000032;

  li {
    padding: 0.75rem 1rem;
    cursor: pointer;
    transition: 0.2s;

    &:first-child {
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }
    &:last-child {
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }
    &:hover {
      background-color: var(--hover);
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
