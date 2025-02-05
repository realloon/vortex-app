import type { Post } from '../../shared/types'

export interface Draft {
  title: string
  content: string
  date: number
}

export interface GraphQLResponse {
  getPosts: Post[]
  getPost: Post
  createPost: boolean
  getComments: any[]
}
