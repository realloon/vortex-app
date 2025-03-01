<script setup lang="ts">
import type { GraphQLResponse } from '~/types'

const { $graphql } = useNuxtApp()
const {
  data: user,
  status,
  error,
  refresh,
} = await useAsyncData('profile', async () => {
  const query = `
    {
      getUserByAuth {
        id
        name
        email
        password
        avatar
        created_at
        actived_at
      }
    }
  `
  const { getUserByAuth: user } =
    await $graphql.default.request<GraphQLResponse>(query)

  return user
})

const name = ref(user.value?.name)
const email = ref(user.value?.email)
const avatar = ref(user.value?.avatar)

async function submit() {
  // if (name.value === user.value?.name) return
  // TODP: verify

  const { updateUser: updated } = await $graphql.default
    .request<GraphQLResponse>(`
    mutation {
      updateUser(id: "${user.value?.id}", name: "${name.value}", avatar: "${avatar.value}")
    }`)

  if (updated) {
    await refresh()
  }
}
</script>

<template>
  <section class="user-card">
    <img class="avatar" src="https://picsum.photos/48" alt="" />
    <div>
      <h1 class="username">{{ user?.name }}</h1>
      <span>{{ user?.email }}</span>
    </div>
  </section>

  <form class="editor" @submit.prevent="submit">
    <CommonInput
      v-model="name"
      minlength="2"
      maxlength="20"
      label="昵称"
      placeholder="输入您的昵称"
    />
    <CommonInput v-model="email" label="邮箱" disabled />
    <CommonInput v-model="avatar" label="头像" />
    <CommonButton><IconSave />保存</CommonButton>
  </form>
</template>

<style scoped>
.user-card {
  display: flex;
  align-items: center;
  gap: 1rem;

  .username {
    font-size: 1.5rem;
  }

  .avatar {
    width: 48px;
    aspect-ratio: 1 / 1;

    border-radius: 50%;
    box-shadow: 1px 1px 1px 1px #00000032;
  }
}

.editor {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;

  margin-top: 24px;
}
</style>
