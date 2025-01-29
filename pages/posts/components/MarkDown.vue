<script setup lang="ts">
import { marked } from 'marked'
// import DOMPurify from 'isomorphic-dompurify'

const { markdown } = defineProps<{ markdown: string }>()

const clean = ref('')
watchEffect(() => {
  const html = marked.parse(markdown)
  if (typeof html === 'string') {
    // clean.value = DOMPurify.sanitize(html)
    clean.value = html
  } else {
    // html.then(result => (clean.value = DOMPurify.sanitize(result)))
    html.then(r => (clean.value = r))
  }
})
</script>

<template>
  <div class="md-article" v-html="clean"></div>
</template>

<style scoped>
.md-article {
  line-height: 1.5;
}

.md-article :deep(p):not(:last-child) {
  margin-block-end: 0.5rem;
}
</style>
