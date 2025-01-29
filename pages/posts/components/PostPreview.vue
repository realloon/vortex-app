<script setup lang="ts">
import type { Post } from '../../../../shared/types'
import { useDayjs } from '#dayjs'
import { CommonButton, IconLike, IconChat } from '#components'
import MarkDown from './MarkDown.vue'
const { post } = defineProps<{ post: Post }>()

const time = computed(() => {
  const dayjs = useDayjs()
  const updated = dayjs(post.updated_at)
  return updated.add(8, 'hour').fromNow() // UTC+08:00
})
</script>

<template>
  <article class="post-preview">
    <header>
      <div class="img"></div>
      <span class="author">{{ post.author_id }}</span
      ><span>•</span
      ><client-only
        ><time :datetime="post.updated_at">{{ time }}</time></client-only
      >
    </header>

    <h2 class="title-wrapper">
      <span class="tag">Tag</span>
      <span>{{ post.title }}</span>
    </h2>

    <MarkDown class="content" :markdown="post.content" />

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
