<script setup lang="ts">
import { useDayjs } from '#dayjs'

const { author, updated } = defineProps<{
  author: string
  updated: string
}>()

const time = computed(() => {
  const dayjs = useDayjs()
  const date = dayjs(updated)
  return date.add(8, 'hour').fromNow() // UTC+08:00
})
</script>

<template>
  <header class="feed-head">
    <div class="img"></div>
    <span class="author">{{ author }}</span
    ><span>•</span
    ><client-only
      ><time :datetime="updated">{{ time }}</time></client-only
    >
  </header>
</template>

<style scoped>
.feed-head {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  color: gray;

  .author {
    font-weight: bold;
    color: var(--color-font);
  }
}

/* tmp */
.img {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: brown;
}
</style>
