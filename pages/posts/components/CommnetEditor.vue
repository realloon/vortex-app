<script setup lang="ts">
const { placeholder = '回复帖子' } = defineProps<{
  placeholder?: string
}>()

const comment = defineModel<string>({ required: true })

const isExpanded = ref(false)

function createComment() {} // TODO
</script>

<template>
  <div class="comment-editor">
    <span
      @click="isExpanded = true"
      v-show="!isExpanded"
      class="placeholder"
    >
      {{ placeholder }}
    </span>

    <form @submit.prevent="createComment" v-show="isExpanded">
      <CommonTextarea
        v-model="comment"
        :placeholder="placeholder"
        :min-height="48"
        name="comment"
      />

      <menu class="toolbar" type="toolbar">
        <CommonButton
          type="button"
          @click="isExpanded = false"
          label="收起"
        />
        <CommonButton label="发布">
          <IconSeed />
        </CommonButton>
      </menu>
    </form>
  </div>
</template>

<style scoped>
.comment-editor {
  display: flex;
  flex-direction: column;

  outline: var(--border-base);
  border-radius: 1.25rem; /* calced */
}

.placeholder {
  line-height: 1.5;
  color: var(--color-lighter);
  padding: 0.5rem 1rem;
  cursor: text;
}

form {
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0.5rem 0.5rem 1rem;

  textarea {
    color: var(--color-font);
    background-color: transparent;
    padding: 0 0.5rem 0 0;
    border: none;
    outline: none;
    resize: none;
  }

  .toolbar {
    display: flex;
    gap: 0.5rem;

    & > *:first-child {
      margin-left: auto;
    }
  }
}
</style>
