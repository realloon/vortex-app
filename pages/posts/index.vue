<script setup lang="ts">
import type { GraphQLResponse } from '~/types'
// Components
import PostPreview from './components/PostPreview.vue'
// GraphQL
import { gql } from 'nuxt-graphql-request/utils'
const { $graphql } = useNuxtApp()

const {
  data: posts,
  status,
  error,
} = await useAsyncData('posts', async () => {
  const doc = gql`
    {
      getPosts {
        id
        author_id
        title
        content
        views
        replies
        likes
        updated_at
      }
    }
  `
  try {
    const data = await $graphql.default.request<GraphQLResponse>(doc)
    return data.getPosts
  } catch (err) {
    console.error('GraphQL Error:', err)
    return []
  }
})

const sortBy = ref('today')
const sortOptions = [{ label: '今日', value: 'today' }]
</script>

<template>
  <menu type="toolbar">
    <CommonSelect v-model="sortBy" :options="sortOptions" mode="text" />

    <CommonButton
      @click="$router.push('/posts/editor')"
      class="create-btn"
      label="发帖"
    >
      <IconAdd />
    </CommonButton>
  </menu>

  <section>
    <ul class="posts-list">
      <li v-for="post in posts">
        <PostPreview :post="post" mode="preview" :key="post.id" />
      </li>
    </ul>
  </section>

</template>

<style scoped>
/* tmp */
.select {
  padding-inline: 1rem;
  outline: none;
  font-size: inherit;
  border: 0;
}

select {
  color: var(--color-font);
  background-color: transparent;
}

menu {
  margin-block-end: 16px;
  display: flex;
  gap: 1em;

  ul {
    display: flex;
    gap: 1em;
  }
}

.create-btn {
  margin-left: auto;
  /* tmp */
  background-color: transparent;
  outline: 1px solid gray;
  outline-offset: -1px;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.active {
  font-weight: bold;
  color: var(--color-primary);
}
</style>
