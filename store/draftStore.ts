import { defineStore } from 'pinia'

type PostDraft = {
  title: string
  content: string
  date: number
}

type CommentDraft = Omit<PostDraft, 'title'>

const initPostDraft = { title: '', content: '', date: 0 }
const initCommentDraft = { content: '', date: 0 }

export const useDraftStore = defineStore(
  'draft',
  () => {
    const postDraft = ref<PostDraft>(initPostDraft)
    function clearPostDraft() {
      postDraft.value = initPostDraft
    }
    const postDraftHistory = ref<PostDraft[]>([])

    const commentDraft = ref<CommentDraft>(initCommentDraft)
    function clearCommentDraft() {
      commentDraft.value = initCommentDraft
    }
    const commentDraftHistory = ref<CommentDraft[]>([])

    return {
      // post
      postDraft,
      clearPostDraft,
      postDraftHistory,
      // comment
      commentDraft,
      clearCommentDraft,
      commentDraftHistory,
    }
  },
  {
    persist: true,
  }
)
