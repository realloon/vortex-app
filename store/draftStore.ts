import { defineStore } from 'pinia'

type PostDraft = {
  title: string
  content: string
  date: number
}

type CommentDraft = Omit<PostDraft, 'title'>

export const useDraftStore = defineStore(
  'draft',
  () => {
    const postDraft = ref<PostDraft>({ title: '', content: '', date: 0 })
    const postDraftHistory = ref<PostDraft[]>([])

    const commentDraft = ref<CommentDraft>({ content: '', date: 0 })
    const commentDraftHistory = ref<CommentDraft[]>([])

    return {
      postDraft,
      postDraftHistory,
      commentDraft,
      commentDraftHistory,
    }
  },
  {
    persist: true,
  }
)
