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
    <div class="center-view">
      <main><slot /></main>
      <AppRight />
    </div>
  </div>
</template>

<style scoped>
.main-view {
  display: flex;
  align-items: flex-start;
  background-color: var(--color-page);
}

.center-view {
  width: 100%;
  max-width: 1080px;

  display: flex;
  align-items: flex-start;
  gap: 32px;

  margin-top: 1rem;
  margin-inline: auto;
}

main {
  flex-grow: 1;
  margin-left: 16px;

  @media screen and (min-width: 768px) {
    margin-left: 24px;
  }
}
</style>
