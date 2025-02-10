<script setup lang="ts">
const { placeholder = '回复帖子' } = defineProps<{
  placeholder?: string
}>()

const comment = defineModel<string>({ required: true })

const isExpanded = ref(false)

const textarea = useTemplateRef('textarea')

function expand() {
  isExpanded.value = true
  textarea.value?.focus()
}

function createComment() {} // TODO
</script>

<template>
  <div class="comment-editor">
    <span @click="expand" class="placeholder" :hidden="isExpanded">
      {{ placeholder }}
    </span>
    <!-- :class="isExpanded && 'is-hidden'" -->
    <form
      @submit.prevent="createComment"
      :class="!isExpanded && 'is-hidden'"
    >
      <CommonTextarea
        ref="textarea"
        v-model="comment"
        :placeholder="placeholder"
        :min-height="48"
        name="comment"
      />

      <menu class="toolbar" type="toolbar">
        <CommonButton
          type="button"
          @click="isExpanded = false"
          label="收起"
        />
        <CommonButton label="发布" :disabled="comment === ''">
          <IconSeed />
        </CommonButton>
      </menu>
    </form>
  </div>
</template>

<style scoped>
.comment-editor {
  display: flex;
  flex-direction: column;

  border: var(--border-base);
  border-radius: 1.25rem; /* calced */

  outline: 2px solid transparent;
  outline-offset: -1px;
  transition: 0.2s;
  &:has(textarea:focus) {
    outline-color: var(--color-lighter);
  }
}

.placeholder {
  line-height: 1.5;
  color: var(--color-lighter);
  padding: 0.5rem 1rem;
  cursor: text;
}

form {
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0.5rem 0.5rem 1rem;

  &.is-hidden {
    height: 0;
    padding: 0;

    .toolbar {
      display: none;
    }
  }

  textarea {
    color: var(--color-font);
    background-color: transparent;
    padding: 0 0.5rem 0 0;
    border: none;
    outline: none;
    resize: none;
  }

  .toolbar {
    display: flex;
    gap: 0.5rem;

    & > *:first-child {
      margin-left: auto;
    }
  }
}
</style>
