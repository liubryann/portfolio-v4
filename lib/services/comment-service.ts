import client from '../api'; 
import useSWR from 'swr';
import type { PostComment } from '../../pages/api/posts';
import type { Comment } from '../../pages/api/comments';
import type { NextApiResponse } from 'next';
import axios from 'axios';

const fetcher = (url, params) => client.get(url, { params: params }).then(res => res.data)

export const useComments = (title, date): { postComments: PostComment, isLoading: boolean, isError: boolean } => {
  const { data, error } = useSWR(['/api/comments', title, date], (url, title, date) => fetcher(url, { title, date }))
  return {
    postComments: data as PostComment,
    isLoading: !error && !data,
    isError: error
  }
}

export const submitComment = (comment: string, title: string, date: string) => {
  return client.post<Comment>('/api/comments', { title, date, comment })
}

export const submitReply = (postTitle: string, postDate: string, commentName: string, commentDate: string, comment: string) => {
  return client.put<Comment>('/api/comments', { postTitle, postDate, commentName, commentDate, comment })
}

const commentService = {
  useComments,
  submitComment,
  submitReply,
}
export default commentService;