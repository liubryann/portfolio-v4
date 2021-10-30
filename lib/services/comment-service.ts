import client from '../api'; 
import type { PostComment } from '../../pages/api/posts';
import type { Comment } from '../../pages/api/comments';

/**
 * Get comments on a post
 * @param title - title of the post
 * @param date - date of the post
 * @returns @type {PostComment}
 */
export const getComments = (title: string, date: string) => {
  return client.get<PostComment>('/api/comments', { params: { title, date }})
}

/**
 * Submits a new comment on a post
 * @param comment - the comment body
 * @param title - title of the post
 * @param date - date of the post
 * @returns @type {Comment}
 */
export const submitComment = (comment: string, title: string, date: string) => {
  return client.post<Comment>('/api/comments', { title, date, comment })
}

/**
 * Submits a reply to a comment on a post
 * @param postTitle - title of the post
 * @param postDate - date of the post
 * @param commentName - name of commentator replying to
 * @param commentDate - date of comment replying to
 * @param comment - the body of the reply
 * @returns @type {Comment}
 */
export const submitReply = (postTitle: string, postDate: string, commentName: string, commentDate: string, comment: string) => {
  return client.put<Comment>('/api/comments', { postTitle, postDate, commentName, commentDate, comment })
}

const commentService = {
  getComments,
  submitComment,
  submitReply,
}

export default commentService;