import React, { useState, useMemo, useEffect, useCallback } from 'react';

import Comment from './Comment';
import TextareaAutosize from 'react-textarea-autosize';

import { submitComment, submitReply, getComments } from "../../lib/services/comment-service";

import styles from './post-comment.module.scss';

import debounce from 'lodash.debounce';

interface PostCommentProps {
  postTitle: string, // title of the post
  postDate: string // date of the post
}

/**
 * Comment section on a blog post.
 */
export default function PostComment({ postTitle, postDate }: PostCommentProps) {
  const [commentInput, setCommentInput] = useState<string>('');
  const [activeReply, setActiveReply] = useState<number>(-1);
  const [replyInput, setReplyInput] = useState<string>('');
  const [postComments, setPostComments] = useState(null);

  /**
   * Get updated comments
   */
  const refreshComments = useCallback(async () => {
    const res = await getComments(postTitle, postDate); 
    if (res.status == 200) {
      setPostComments(res.data)
    }
  }, [postTitle, postDate])

  /**
   * Handle comment input change
   */
  const handleCommentChange = (e) => {
    setCommentInput(e.target.value)
  }

  const debouncedHandleCommentChange = useMemo(
    () => debounce(handleCommentChange, 200)
  , [])

  /**
   * Submits a new comment 
   */
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    const res = await submitComment(commentInput, postTitle, postDate);
    if (res.status === 200) {
      refreshComments();
      setCommentInput('');
      e.target.reset();
    }
  }

  /**
   * Clean up debounce
   */
  useEffect(() => {
    refreshComments();
    return () => {
      debouncedHandleCommentChange.cancel();
    }
  }, [debouncedHandleCommentChange, refreshComments])

  /**
   * Map the comments to a list of comment components
   */
  let comments = useMemo(() => {
    if (postComments?.comments) {
      /**
       * Handle reply input change
       */
      const debouncedHandleReplyChange = debounce((e) => {
        setReplyInput(e.target.value);
      }, 200)

      /**
       * Submit a new reply to a comment
       * @param commentName - name of commentor replying to
       * @param commentDate - date of comment replying to
       */
      const handleSubmitReply = async (e, commentName, commentDate) => {
        e.preventDefault(); 
        const res = await submitReply(postTitle, postDate, commentName, commentDate, replyInput)
        if (res.status === 200) {
          refreshComments();
          setActiveReply(-1);
          setReplyInput('');
          e.target.reset();
        }
        else {
          console.error(res)
        }
      }

      return postComments.comments.map((comment, index) => {
        const { date: commentDate, comment: commentBody, name: commentName, replies } = comment;
        return (
          <Comment
            key={index}
            postTitle={postTitle}
            postDate={postDate}
            commentName={commentName}
            commentDate={commentDate}
            comment={commentBody}
            isReply={false}
            replies={replies}
            isReplyActive={activeReply === index}
            handleReplyClick={() => { setActiveReply(index); setReplyInput('') }}
            handleReplyChange={debouncedHandleReplyChange}
            handleSubmitReply={(e) => { handleSubmitReply(e, commentName, commentDate) }}
            handleCancelClick={() => { setActiveReply(-1); setReplyInput(''); }}
          />
        )})
      }
    }
  , [postComments, activeReply, replyInput, postTitle, postDate, refreshComments])

  return (
    <div>
      <span className={styles.header}>Comments</span>
      <div className={styles.postCommentContainer}>
        <form onSubmit={handleSubmitComment}>
          <div>
            <TextareaAutosize
              placeholder="Leave a comment..."
              className={styles.commentBox} 
              onChange={debouncedHandleCommentChange} 
            />
          </div>
          <div className={styles.buttonContainer}><input className={styles.button} type="submit" value="Comment" /></div>
        </form>
        { comments }
      </div>
    </div>
  )
}
