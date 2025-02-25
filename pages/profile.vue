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
      getUserWithAuth {
        id
        name
        email
        password
        created_at
        actived_at
      }
    }
  `)

  return res.getUserWithAuth
})

const name = ref('李真')
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
  <h1>{{ user?.name }}</h1>
  <hr />
  <h2>data</h2>
  <pre>{{ user }}</pre>

  <input type="text" v-model="name" />
  <button @click="updateName">更新用户名</button>
</template>
