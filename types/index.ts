import type { Post, Comment } from '../../shared/types'

export interface GraphQLResponse {
  getPosts: Post[]
  getPost: Post
  createPost: boolean
  getComments: Comment[]
  createComment: boolean
}
