<script setup lang="ts">
import type { GraphQLResponse } from '~/types'
import { gql } from 'nuxt-graphql-request/utils'
// Components
import PostPreview from './components/PostPreview.vue'

const route = useRoute()
const { $graphql } = useNuxtApp()

const {
  data: post,
  status,
  error,
} = await useAsyncData(`post/${route.params.id}`, async () => {
  try {
    const data = await $graphql.default.request<GraphQLResponse>(gql`
      {
        getPost(id: ${route.params.id}) {
          id
          author_id
          title
          content
          views
          replies
          likes
          created_at
          updated_at
        }
      }
    `)
    return data.getPost
  } catch (err) {
    console.error('GraphQL Error:', err)
  }
})
</script>

<template>
  <section v-if="post">
    <PostPreview :post="post" mode="post" />
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  /* gap: 1rem; */
}
</style>
