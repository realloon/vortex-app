<script setup lang="ts">
import type { GraphQLResponse } from '~/types'
import { gql } from 'nuxt-graphql-request/utils'
// Components
import PostPreview from './components/PostPreview.vue'

const { $graphql } = useNuxtApp()
const {
  data: posts,
  status,
  error,
} = await useAsyncData('posts', async () => {
  try {
    const data = await $graphql.default.request<GraphQLResponse>(gql`
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
    `)
    return data.getPosts
  } catch (err) {
    console.error('GraphQL Error:', err)
    return []
  }
})
</script>

<template>
  <menu type="toolbar">
    <select class="select" name="date">
      <option value="today">今日</option>
    </select>
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
  font-family: inherit;
  font-size: 1rem;
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
  color: brown;
}
</style>
