<script setup lang="ts">
import { useDayjs } from '#dayjs'
// Components
import { CommonButton, IconChat, IconLike } from '#components'
import MarkDown from './MarkDown.vue'

const { comment } = defineProps<{ comment: any }>()

const time = computed(() => {
  const dayjs = useDayjs()
  const updated = dayjs(comment.updated_at)
  return updated.add(8, 'hour').fromNow() // UTC+08:00
})
</script>

<template>
  <section class="comment">
    <header>
      <div class="img"></div>
      <span class="author">{{ comment.author_id }}</span
      ><span>•</span
      ><client-only
        ><time :datetime="comment.updated_at">{{
          time
        }}</time></client-only
      >
    </header>

    <MarkDown :markdown="comment.content" />

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

header {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  color: gray;

  .author {
    font-weight: bold;
    color: var(--color-font);
  }
}

footer {
  display: flex;
  gap: 0.25rem;

  button:first-child {
    margin-left: -0.75em;
  }
}

/* tmp */
.img {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: plum;
}
</style>
