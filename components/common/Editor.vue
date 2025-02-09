<script setup lang="ts">
import { MarkDown, CommonButton, CommonTextarea } from '#components'

const model = defineModel<string>({ required: true })

const isPreview = ref(false)
</script>

<template>
  <div class="editor">
    <header>
      <span>Markdown 编辑器</span>
      <CommonButton
        @click="isPreview = !isPreview"
        :label="isPreview ? '编辑' : '预览'"
        mode="text"
        type="button"
      />
    </header>

    <CommonTextarea v-bind="$attrs" v-if="!isPreview" v-model="model" />

    <MarkDown v-else class="preview" :content="model" />
  </div>
</template>

<style scoped>
.editor {
  box-sizing: border-box;
  width: 100%;

  display: flex;
  flex-direction: column;

  border: var(--border-base);
  border-radius: 4px;
  outline: 0 solid brown;

  transition: 0.1s;
  &:has(textarea:focus) {
    outline-width: 2px;
  }
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 4px 4px 0 1rem;

  color: var(--color-lighter);
}

textarea {
  border: none;
  /* padding */
  outline: none;

  line-height: 1.5;
  color: var(--color-font);
  background-color: transparent;

  /* init height */
  height: 128px;

  resize: none;
}

textarea,
.preview {
  padding: 0 1rem 0.5rem;
}
</style>
