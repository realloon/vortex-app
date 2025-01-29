<script setup lang="ts"></script>

<template>
  <aside>
    <div class="card">
      <h2>边缘世界中文论坛</h2>
      <div class="stats">
        <div>
          <span>1</span>
          <span
            ><div class="green-round"></div>
            在线用户</span
          >
        </div>
        <div>
          <span>13</span>
          <span>帖子数</span>
        </div>
      </div>
    </div>

    <div class="card">
      <p style="color: brown">
        论坛正处于早期开发阶段，请不要发布任何正式内容！
      </p>
    </div>
  </aside>
</template>

<style scoped>
aside {
  position: sticky;
  top: calc(49px + 1rem);

  background-color: black;
  flex-basis: 320px;
  flex-shrink: 0;
  margin-right: 16px;
  border-radius: 8px;

  display: flex;
  flex-direction: column;

  & > .card:not(:last-child) {
    border-bottom: var(--border-base);
  }
}

.card {
  line-height: 1.5;
  padding: 1rem;
}

/* tmp */
.stats {
  margin-block-start: 0.5rem;

  display: flex;
  gap: 2rem;

  div {
    display: flex;
    flex-direction: column;

    :first-child {
      font-size: 1.25rem;
      font-weight: bold;
    }

    :last-child {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .green-round {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: green;
      }
    }
  }
}
</style>
