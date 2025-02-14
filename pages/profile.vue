<script setup lang="ts">
import { useUserStore } from '~/store/userStore'
const userStore = useUserStore()

const { $graphql } = useNuxtApp()
const { data, status, error } = await useAsyncData('profile', async () => {
  // $graphql.default.setHeader('Authorization', `Bearer ${userStore.token}`)
  return $graphql.default.request(`
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
})
</script>

<template>
  <h1>Profile</h1>
  {{ `Bearer ${userStore.token}` }}
  <hr />
  <h2>data</h2>
  <pre>{{ data }}</pre>
  <hr />
  <h2>status</h2>
  <pre>{{ status }}</pre>
  <hr />
  <h2>error</h2>
  <pre>{{ error }}</pre>
</template>
