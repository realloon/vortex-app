<script setup lang="ts">
const { minHeight = 128 } = defineProps<{ minHeight?: number }>()

const model = defineModel<string>({ required: true })
const textarea = useTemplateRef('textarea')

function focus() {
  console.log('执行获取焦点')
  textarea.value?.focus()
}

defineExpose({ focus })

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
    v-model.trim="model"
    v-bind="$attrs"
    required
    :style="`height: ${minHeight}px`"
  ></textarea>
</template>

<style scoped>
textarea {
  border: none;
  /* padding */
  outline: none;

  color: var(--color-font);
  background-color: transparent;

  resize: none;
}
</style>
