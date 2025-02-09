<script setup lang="ts">
import type { Comment } from '../../../../shared/types'
// Components
import { MarkDown, CommonButton, IconChat, IconLike } from '#components'
import FeedHead from './FeedHead.vue'

const { comment } = defineProps<{ comment: Comment }>()
</script>

<template>
  <section class="comment">
    <FeedHead :author="comment.author_id" :updated="comment.updated_at" />

    <MarkDown :content="comment.content" />

    <footer>
      <CommonButton label="喜欢" mode="text"><IconLike /></CommonButton>
      <CommonButton label="回复" mode="text"><IconChat /></CommonButton>
    </footer>
  </section>
</template>

<style scoped>
.comment {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

footer {
  display: flex;
  gap: 0.25rem;

  button:first-child {
    margin-left: -0.75em;
  }
}
</style>
