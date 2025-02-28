<script setup lang="ts">
import LoginClient from '~/components/Login.client.vue'
import SearchBox from './SearchBox.vue'
import { useUserStore } from '~/store/userStore'
const userStore = useUserStore()

const login = useTemplateRef('login')
function showLogin() {
  userStore.token ? navigateTo('/user') : login.value?.showLogin()
}
</script>

<template>
  <header>
    <h1>Vortex</h1>
    <SearchBox />
    <div @click="showLogin" class="avatar"></div>
  </header>
  <!-- model -->
  <LoginClient ref="login" />
</template>

<style scoped>
header {
  position: sticky;
  top: 0;

  color: var(--color-font);
  background-color: var(--color-page);

  display: flex;
  align-items: center;
  gap: 1rem;

  height: 48px;
  padding-inline: 16px;
  border-bottom: var(--border-base);
}

h1 {
  font-weight: bold;
  font-size: 1.25rem;
  font-style: italic;
}

.avatar {
  box-sizing: border-box;
  width: 32px;
  height: 32px;
  border: var(--border-base);
  border-radius: 50%;
  background-color: var(--color-primary);
  cursor: pointer;
}
</style>
