<script setup lang="ts">
import type { Post } from '../../../../shared/types'
// Components
import { MarkDown, CommonButton, IconLike, IconChat } from '#components'
import FeedHead from './FeedHead.vue'

const { post } = defineProps<{
  post: Post
  mode: 'preview' | 'detail'
}>()
</script>

<template>
  <article
    @click="mode === 'preview' && $router.push(`/posts/${post.id}`)"
    class="post-preview"
    :class="mode === 'preview' && 'is-preview'"
  >
    <FeedHead :author="post.author_id" :updated="post.updated_at" />

    <h2 class="title-wrapper">
      <span class="tag">标签</span>
      <span>{{ post.title }}</span>
    </h2>

    <MarkDown class="content" :content="post.content" />

    <menu type="toolbar">
      <CommonButton :label="post.likes">
        <IconLike />
      </CommonButton>
      <CommonButton :label="post.replies">
        <IconChat />
      </CommonButton>
      <span>浏览：{{ post.views }}</span>
    </menu>
  </article>
</template>

<style scoped>
.post-preview {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  border-radius: 8px;
  transition: 0.2s;

  &.is-preview {
    padding: 0.5rem 1rem;
    cursor: pointer;
    &:hover {
      background-color: var(--color-preview-hover);
    }
  }
}

header {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  color: gray;
  .author {
    color: var(--color-font);
  }
}

.title-wrapper {
  font-weight: bold;
  line-height: 1.5;

  .tag {
    font-size: 0.75em;
    color: white;
    background-color: #20469b;
    vertical-align: text-bottom;

    padding: 0.25em 0.5em;
    margin-right: 0.25rem;
    border-radius: 4px;
  }
}

menu {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.img {
  width: 24px;
  height: 24px;
  background-color: brown;
  border-radius: 50%;
}
</style>
