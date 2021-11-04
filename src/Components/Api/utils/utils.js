import { httpReq } from "../axios/axios";

export const getPosts = () => httpReq.get('/posts')
export const getPostsById = (id) => httpReq.get(`/posts/${id}`)

export const getCommentsByPostId = (postId) => httpReq.get(`/comments`, postId)