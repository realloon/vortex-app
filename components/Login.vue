<script setup lang="ts">
import type { GraphQLResponse } from '~/types'
import { useUserStore } from '~/store/userStore'
const userStore = useUserStore()

const dialog = useTemplateRef('dialog')

const minLength = 8

const email = ref('')
const password = ref('')

function showLogin() {
  dialog.value?.showModal()
}

defineExpose({ showLogin })

const { $graphql } = useNuxtApp()
async function submit(e: Event) {
  console.log('wanna login')

  if (email.value && password.value) {
    e.preventDefault() // keep login panel
    return
  }

  try {
    const { createUser: token } = await $graphql.default
      .request<GraphQLResponse>(`
      mutation {
        createUser(email: "${email.value}", password: "${password.value}") 
      }`)
    console.log(token)

    userStore.token = token
  } catch (err) {
    console.error(err)
  }
}
</script>

<template>
  <dialog ref="dialog">
    <h1>欢迎</h1>
    <p>加入边缘世界中文论坛，融入联系。</p>
    <p class="lighter">
      若继续，则表示您认可本网站的<span
        @click="navigateTo('policy', { open: { target: '_blank' } })"
        class="link"
        >隐私政策</span
      >。
    </p>

    <form method="dialog" @submit="submit">
      <CommonInput
        v-model="email"
        label="邮箱："
        placeholder="该邮箱将作为您的登陆凭证"
        required
        type="email"
        autocomplete="email"
        name="email"
      />

      <CommonInput
        v-model="password"
        label="密码："
        placeholder="请用系统或浏览器生成强密码"
        required
        :minlength="minLength"
        type="password"
        autocomplete="new-password"
        name="password"
      />

      <p class="note lighter">若账号不存在将自动创建</p>

      <CommonButton @click="submit" label="注册" size="huge" center>
        <IconSeed />
      </CommonButton>
    </form>
  </dialog>
</template>

<style scoped>
dialog {
  line-height: 1.5;

  color: var(--color-font);
  background-color: #ffffff;

  box-sizing: border-box;
  width: 100%;
  max-width: 520px;
  padding: 48px 32px;
  padding: 48px 32px;
  border: none;
  border-radius: 16px;
  box-shadow: #00000026 0px 1px 4px 0px, #00000026 0px 4px 4px 0px;

  &::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
  }

  @media (prefers-color-scheme: dark) {
    background-color: #191c1f;
  }

  @media screen and (min-width: 768px) {
    padding-inline: 80px;
  }
}

h1 {
  font-size: 1.5rem;
  margin-block-end: 0.5rem;
}

.lighter {
  color: var(--color-lighter);
}

form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-block-start: 16px;
}

/* tmp */
.link {
  color: var(--color-primary);
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
}
</style>
