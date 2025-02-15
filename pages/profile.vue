<script setup lang="ts">
import type { GraphQLResponse } from '~/types'

const { $graphql } = useNuxtApp()
const {
  data: user,
  status,
  error,
} = await useAsyncData('profile', async () => {
  const res = await $graphql.default.request<GraphQLResponse>(`
    {
      test {
        id
        name
        email
        password
        created_at
        actived_at
      }
    }`)

  return res.test
})
</script>

<template>
  <h1>{{ user?.name }}</h1>
  <hr />
  <h2>data</h2>
  <pre>{{ user }}</pre>
</template>
