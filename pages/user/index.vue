<script setup lang="ts">
import type { GraphQLResponse } from '~/types'

const { $graphql } = useNuxtApp()
const {
  data: user,
  status,
  error,
  refresh,
} = await useAsyncData('profile', async () => {
  const res = await $graphql.default.request<GraphQLResponse>(`
    query {
      getUserByAuth {
        id
        name
        email
        password
        created_at
        actived_at
      }
    }
  `)

  return res.getUserByAuth
})

const name = ref('whh')
async function updateName() {
  const { updateUser: updated } = await $graphql.default
    .request<GraphQLResponse>(`
    mutation {
      updateUser(id: 4, name: "${name.value}")
    }`)

  if (updated) {
    await refresh()
  }
}
</script>

<template>
  <h1>User Space</h1>
  <hr />
  <p>User Name: {{ user?.name }}</p>

  <form @submit.prevent="updateName">
    <input type="text" v-model="name" />
    <button>更新用户名</button>
  </form>
</template>
