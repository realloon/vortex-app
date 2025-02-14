<script setup lang="ts">
const dialog = useTemplateRef('dialog')

const minLength = 8

const email = ref('')
const password = ref('')

function showLogin() {
  dialog.value?.showModal()
}

defineExpose({ showLogin })

function submit(e: Event) {
  if (!email.value || password.value.length < minLength) {
    return e.preventDefault()
  }
}
</script>

<template>
  <dialog ref="dialog">
    <h1>注册</h1>
    <p>加入边缘世界中文论坛，融入联系。</p>
    <p class="lighter">
      若继续，则表示您认可本网站的<span class="link">隐私政策</span>。
    </p>

    <form method="dialog" @submit="submit">
      <CommonInput
        v-model="email"
        label="邮箱"
        placeholder="邮箱"
        required
        type="email"
        autocomplete="email"
        name="email"
      />
      <CommonInput
        v-model="password"
        label="密码"
        placeholder="密码"
        required
        :minlength="minLength"
        type="password"
        autocomplete="new-password"
        name="password"
      />
      <p class="lighter">已有账户了吗？<span class="link">登陆</span></p>
      <CommonButton label="注册" size="huge" center>
        <IconSeed />
      </CommonButton>
    </form>
  </dialog>
</template>

<style scoped>
dialog {
  line-height: 1.5;

  color: var(--color-font);
  background-color: #191c1f;

  box-sizing: border-box;
  width: 100%;
  max-width: 520px;
  padding: 48px 32px;
  padding: 48px 32px;
  border: none;
  border-radius: 16px;
  box-shadow: #00000026 0px 1px 4px 0px, #00000026 0px 4px 4px 0px;

  @media screen and (min-width: 768px) {
    padding-inline: 80px;
  }
}

::backdrop {
  background-color: rgba(0, 0, 0, 0.5);
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
  gap: 1rem;

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
