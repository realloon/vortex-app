<script setup lang="ts">
function serach() {
  console.log('wanna search')
}
</script>

<template>
  <form @submit.prevent="serach" role="search">
    <input type="search" placeholder="搜索" name="search" />
    <button type="submit">🔍</button>
  </form>
</template>

<style scoped>
form {
  box-sizing: border-box;
  display: flex;

  height: 32px;
  padding-inline: 14px;
  margin-inline: auto;
  border: var(--border-base);
  border-radius: 16px;

  transition: 0.2s;
  background-color: var(--color-ctrl-active);
  &:hover {
    background-color: #353d41;
  }
}

input {
  border: none;
  padding: 0;
  outline: none;
  color: var(--color-font);
  background-color: transparent;
  flex-grow: 1;

  font-size: 1rem;
  font-family: inherit;
}

button {
  padding: 0;
  border: none;
  background-color: transparent;
}
</style>
