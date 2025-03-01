<script setup lang="ts">
import NavSection from './NavSection.vue'

const topicNav = [
  {
    label: '全部',
    path: 'all',
  },
  {
    label: '模组',
    path: 'mod',
  },
  {
    label: '教程',
    path: 'learn',
  },
]
</script>

<template>
  <aside class="app-aside">
    <nav>
      <ul>
        <li>
          <NuxtLink to="/posts"><IconBBS />帖子</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/chat"><IconChatRoom />聊天室</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/about"><IconAbout />关于</NuxtLink>
        </li>
      </ul>
    </nav>

    <NavSection :items="topicNav" title="话题" mode="mitt" />

    <CommonSpacer />

    <NuxtLink to="/user"><IconUser />个人空间</NuxtLink>
  </aside>
</template>

<style scoped>
.app-aside {
  position: sticky;
  top: 49px;

  box-sizing: border-box;
  height: calc(100vh - 49px);
  padding: 16px;
  border-right: var(--border-base);

  background-color: var(--color-page);
  flex-basis: 240px;

  /* flex */
  flex-shrink: 0;
  flex-direction: column;
  gap: 32px;

  display: none;
  @media screen and (min-width: 768px) {
    display: flex;
  }
}

a {
  display: flex;
  align-items: center;
  gap: 1em;

  line-height: 1.5;
  padding: 0.5em 16px;
  border-radius: 8px;

  cursor: pointer;

  transition: 0.2s;
  &:hover {
    background-color: var(--color-ctrl-hover);
  }
  &.router-link-active {
    background-color: var(--color-ctrl-active);
  }
}
</style>
