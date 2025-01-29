import type { Post } from '../../shared/types'

export interface Draft {
  title: string
  content: string
  date: number
}

export interface GraphQLResponse {
  getAllPosts: Post[]
  getPost: Post
  createPost: boolean
}
