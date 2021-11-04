import { httpReq } from "../axios/axios";

export const getPosts = () => httpReq.get('/posts')
export const getPostsById = (id) => httpReq.get(`/posts/${id}`)
export const addPosts = (params) => httpReq.post('/posts', params)
export const editPosts = (id, params) => httpReq.put(`/posts/${id}`, params)
export const deletePosts = (id) => httpReq.delete(`/posts/${id}`)

export const getCommentsByPostId = (postId) => httpReq.get(`/comments`, postId)
export const addComment = (params) => httpReq.post(`/comments`, params)
export const deleteComments = (params) => httpReq.delete(`/comments`, params)