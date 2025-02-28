<script setup lang="ts">
import type { GraphQLResponse } from '~/types'
import { gql } from 'nuxt-graphql-request/utils'
// Components
import PostPreview from './components/PostPreview.vue'
import CommentCard from './components/CommentCard.vue'
import CommentEditor from './components/CommentEditor.vue'

const route = useRoute()
const { $graphql } = useNuxtApp()
const { data, status, error, refresh } = await useAsyncData(
  `post/${route.params.id}`,
  async () => {
    const query = gql`
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
        getComments(post_id: ${route.params.id}) {
          author_id
          content
          created_at
          updated_at
        }
      }
    `

    try {
      const res = await $graphql.default.request<GraphQLResponse>(query)
      return {
        post: res.getPost,
        comments: res.getComments,
      }
    } catch (err) {
      console.error('GraphQL Error:', err)
    }
  }
)

const post = computed(() => data.value!.post)
const comments = computed(() => data.value!.comments)

useSeoMeta({
  title: () => post.value.title,
})

const sortBy = ref('default')
const sortOptions = [
  { label: '默认', value: 'default' },
  { label: '最新', value: 'new' },
  { label: '最佳', value: 'best' },
]

const comment = ref('')
</script>

<template>
  <section class="view">
    <PostPreview v-if="post" :post="post" mode="detail" />

    <CommentEditor
      v-model="comment"
      :post-id="post.id"
      :refresh="refresh"
    />

    <menu type="toolbar">
      <CommonSelect v-model="sortBy" :options="sortOptions" mode="text" />
    </menu>

    <CommentCard
      v-for="comment in comments"
      :comment="comment"
      :key="comment.id"
    />
  </section>
</template>

<style scoped>
.view {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
