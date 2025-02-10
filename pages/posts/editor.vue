<script setup lang="ts">
// Utils
import debounce from '~/utils/debounce'
// Store
import { useDraftStore } from '~/store/draftStore'
const draftStore = useDraftStore()

// init for store
const title = ref(draftStore.draft.title)
const content = ref(draftStore.draft.content)

const isComplated = computed(() => title.value.length > 2 && content.value)

const { $graphql } = useNuxtApp()
const router = useRouter()
async function createPost() {
  const codedTitle = encodeURIComponent(title.value)
  const codedContent = encodeURIComponent(content.value)

  try {
    await $graphql.default.request(`
      mutation {
        createPost(author_id: 1, title: "${codedTitle}", content: "${codedContent}")
      }
    `)
    draftStore.draft = { title: '', content: '', date: 0 }
    router.push('/posts')
  } catch (err) {
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
  // TODO
  draftStore.draftHistory.push(draft.value)
}

const topic = ref('all')
const topicOptions = [
  { label: '综合', value: 'all' },
  { label: '模组', value: 'mod' },
  { label: '教程', value: 'tutorial' },
]
</script>

<template>
  <section class="post-editor">
    <header>
      <h1>新帖子</h1>
      <CommonButton label="草稿" mode="text" offset="right" />
    </header>

    <form @submit.prevent="createPost">
      <CommonSelect v-model="topic" :options="topicOptions" name="topic" />

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
          <span v-show="isSaved">已存草稿</span>
        </Transition>
        <CommonButton
          @click.prevent="addDraftHistory"
          label="另存草稿"
          :disabled="!isComplated"
          style="margin-left: auto"
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
}
</style>
