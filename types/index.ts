import type { User, Post, Comment } from '../../shared/types'

export interface GraphQLResponse {
  login: string
  getUserByAuth: User
  updateUser: boolean
  getPosts: Post[]
  getPost: Post
  createPost: boolean
  getComments: Comment[]
  createComment: boolean
}
