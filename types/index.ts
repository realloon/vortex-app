import type { User, Post, Comment } from '../../shared/types'

export interface GraphQLResponse {
  createUser: string
  getUserWithAuth: User
  updateUser: boolean
  getPosts: Post[]
  getPost: Post
  createPost: boolean
  getComments: Comment[]
  createComment: boolean
}
