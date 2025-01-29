<script setup lang="ts">
const minHeight = 128

const model = defineModel<string>({ required: true })
const textarea = useTemplateRef('textarea')

function resizeHeight() {
  if (textarea.value) {
    textarea.value.style.height = 'auto'

    const scrollHeight = textarea.value.scrollHeight
    const height = scrollHeight > minHeight ? scrollHeight : minHeight
    textarea.value.style.height = `${height}px`
  }
}

onMounted(() => {
  resizeHeight()
})
</script>

<template>
  <textarea
    @input="resizeHeight"
    ref="textarea"
    v-model="model"
    v-bind="$attrs"
    required
  ></textarea>
</template>

<style scoped>
textarea {
  border: none;
  /* padding */
  outline: none;

  font-size: 1rem;
  line-height: 1.5;
  font-family: inherit;
  color: var(--color-font);
  background-color: transparent;

  /* init height */
  height: 128px;

  resize: none;
}
</style>
