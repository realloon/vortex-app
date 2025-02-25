<script setup lang="ts">
import type { GraphQLResponse } from '~/types'

const comment = defineModel<string>({ required: true })

const {
  postId,
  placeholder = '回复帖子',
  refresh,
} = defineProps<{
  postId: string
  placeholder?: string
  refresh: () => Promise<void>
}>()

const isExpanded = ref(false)

const textarea = useTemplateRef('textarea')

function expand() {
  isExpanded.value = true
  textarea.value?.focus()
}

const { $graphql } = useNuxtApp()
async function submit() {
  try {
    const { createComment } = await $graphql.default
      .request<GraphQLResponse>(`
        mutation {
        createComment(post_id: ${postId}, author_id: 1, content: "${comment.value}")
      }`)

    if (!createComment) return console.error('发表评论失败')

    comment.value = ''
    isExpanded.value = false

    refresh && refresh()
  } catch (err) {
    console.error(err)
  }
}
</script>

<template>
  <div class="comment-editor">
    <span @click="expand" class="placeholder" :hidden="isExpanded">
      {{ placeholder }}
    </span>

    <form
      @click.stop="textarea?.focus()"
      @submit.prevent="submit"
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
          @click.stop="isExpanded = false"
          label="收起"
        />
        <CommonButton @click.stop label="发布" :disabled="comment === ''">
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
  outline-offset: -2px;
  transition: 0.2s;
  &:has(textarea:focus) {
    outline-color: var(--color-primary);
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
