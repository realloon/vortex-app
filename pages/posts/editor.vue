<script setup lang="ts">
// Utils
import debounce from '~/utils/debounce'
// Components
import { CommonButton, CommonInput, CommonEditor } from '#components'
// Store
import { useDraftStore } from '~/store/draftStore'
const draftStore = useDraftStore()

const title = ref(draftStore.draft.title)
const content = ref(draftStore.draft.content)

const formatted = computed(() => content.value.replaceAll('\n', '\\n'))
const isComplated = computed(() => title.value.length > 2 && content.value)

const { $graphql } = useNuxtApp()

async function createPost() {
  try {
    await $graphql.default.request(`
      mutation {
        createPost(author_id: "0", title: "${title.value}", content: "${formatted.value}") {
          title
        }
      }
    `)

    console.log('发帖成功')
    const router = useRouter()
    router.push('/posts')
  } catch (err) {
    console.log('发帖失败')
    console.error(err)
  }
}

const draft = computed(() => ({
  title: title.value,
  content: content.value,
  date: Date.now(),
}))

const isSaved = ref(false)

const saveDraft = debounce(() => {
  draftStore.draft = draft.value
  isSaved.value = true
})

function handleInput() {
  isSaved.value = false
  saveDraft()
}

function addDraftHistory() {
  draftStore.draftHistory.push(draft.value)
}
</script>

<template>
  <section class="post-editor">
    <header>
      <h1>新帖子</h1>
      <CommonButton label="草稿" mode="text" offset="right" />
    </header>

    <form @submit.prevent="createPost">
      <select name="topic">
        <option value="all">综合</option>
        <option value="mod">模组</option>
        <option value="learn">教程</option>
      </select>

      <div class="title-wrapper">
        <CommonInput
          v-model="title"
          required
          minlength="2"
          maxlength="40"
          name="title"
          placeholder="帖子标题"
        />
        <span>{{ title.length }}/40</span>
      </div>

      <CommonEditor
        @input="handleInput"
        v-model="content"
        required
        name="content"
        placeholder="内容"
      />

      <footer>
        <Transition>
          <span :class="isSaved && 'is-saved'">已存草稿</span>
        </Transition>
        <CommonButton
          @click.prevent="addDraftHistory"
          label="另存草稿"
          :disabled="!isComplated"
        />
        <CommonButton
          label="发布"
          type="submit"
          :disabled="!isComplated"
        />
      </footer>
    </form>
  </section>
</template>

<style scoped>
.post-editor {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    color: (var(--color-lighter));
    font-size: 1.25rem;
  }
}

form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;

  .title-wrapper {
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    span {
      color: var(--color-lighter);
      align-self: flex-end;
    }
  }
}

footer {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;

  span {
    flex-grow: 1;

    transition: 0.4s;
    opacity: 0;
    &.is-saved {
      opacity: 1;
    }
  }
}
</style>
