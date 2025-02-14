<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import AppAside from './components/AppAside.vue'
import AppRight from './components/AppRight.vue'
// Store
import { useUserStore } from '~/store/userStore'

useSeoMeta({
  title: 'Vortex - 边缘世界中文论坛',
})

const { $graphql } = useNuxtApp()
$graphql.default.setHeader(
  'Authorization',
  `Bearer ${useUserStore().token}`
)
</script>

<template>
  <AppHeader />
  <div class="main-view">
    <AppAside />
    <main><slot></slot></main>
    <AppRight />
  </div>
</template>

<style scoped>
.main-view {
  max-width: 1440px;

  display: flex;
  align-items: flex-start;
  background-color: var(--color-page);
}

main {
  flex-grow: 1;
  margin-block: 16px 48px;

  margin-inline: 16px;
  @media screen and (min-width: 768px) {
    margin-inline: 48px;
  }
}
</style>
