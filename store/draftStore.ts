import type { Draft } from '~/types'
import { defineStore } from 'pinia'

export const useDraftStore = defineStore(
  'draft',
  () => {
    const draft = ref<Draft>({
      title: '',
      content: '',
      date: 0,
    })
    const draftHistory = ref<Array<Draft>>([])

    return { draft, draftHistory }
  },
  {
    persist: true,
  }
)
