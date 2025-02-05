<script setup lang="ts">
import type { GraphQLResponse } from '~/types'
import { gql } from 'nuxt-graphql-request/utils'
// Components
import PostPreview from './components/PostPreview.vue'
import Comment from './components/Comment.vue'
import { CommonSelect, CommonEditor, CommonButton } from '#components'

const route = useRoute()
const { $graphql } = useNuxtApp()

const { data, status, error } = await useAsyncData(
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
      const data = await $graphql.default.request<GraphQLResponse>(query)

      return { post: data.getPost, comments: data.getComments }
    } catch (err) {
      console.error('GraphQL Error:', err)
    }
  }
)

const post = computed(() => data.value?.post)
const comments = computed(() => data.value?.comments)

useSeoMeta({
  title: () => post.value?.title ?? 'Vortex',
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
    <PostPreview v-if="post" :post="post" mode="post" />

    <!-- <form>
      <CommonEditor v-model="comment" placeholder="添加一条评论" />
      <CommonButton label="发表" />
    </form> -->

    <menu type="toolbar">
      <CommonSelect
        style="margin-left: -0.75em"
        v-model="sortBy"
        :options="sortOptions"
      />
    </menu>

    <Comment v-for="comment in comments" :comment="comment" />
  </section>
</template>

<style scoped>
.view {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

form {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
}
</style>
