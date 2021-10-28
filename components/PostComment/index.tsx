import { useComments } from "../../lib/services/comment-service"
import React, { useState, useMemo, useEffect } from 'react';
import Comment from './Comment';
import { submitComment } from "../../lib/services/comment-service";
import styles from './post-comment.module.scss';
import { debounce } from 'lodash';

interface PostCommentProps {
  postTitle: string,
  postDate: string
}

/**
 * Comment section on a blog post.
 */
export default function PostComment({ postTitle, postDate }: PostCommentProps) {
  const { postComments, isLoading, isError } = useComments(postTitle, postDate)
  const [comments, setComments] = useState<JSX.Element[]>([])
  const [commentInput, setCommentInput] = useState<string>('');

  /**
   * Handle comment input change
   */
  const handleCommentChange = (e) => {
    setCommentInput(e.target.value)
  }

  const debouncedHandleCommentChange = useMemo(
    () => debounce(handleCommentChange, 300)
  , [])

  /**
   * Submits a new comment 
   */
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    const res = await submitComment(commentInput, postTitle, postDate);
    if (res.status === 200) {
      const { name: commentName, comment, date: commentDate } = res.data;
      const newComment = 
        <Comment 
          key={commentDate as string} 
          postTitle={postTitle} 
          postDate={postDate} 
          commentName={commentName} 
          commentDate={commentDate as string} 
          comment={comment} 
          isReply={false} 
        />
      setComments([newComment, ...comments])
      setCommentInput('')
    }
  }

  useMemo(() => { 
    if (postComments) {
      const commentsComponent = postComments.comments.map((comment) => {
        const { date: commentDate, comment: commentBody, name: commentName, replies } = comment;
        return (
          <Comment
            key={commentDate as string}
            postTitle={postTitle}
            postDate={postDate}
            commentName={commentName}
            commentDate={commentDate as string}
            comment={commentBody}
            isReply={false}
            replies={replies}
          />
        )})
      setComments(commentsComponent);
    }
  }, [postComments])
  

  /**
   * Clean up debounce
   */
  useEffect(() => {
    return () => {
      debouncedHandleCommentChange.cancel();
    }
  }, [])

  if (isError) return (<div>error</div>)
  if (isLoading) return (<div>loading</div>)

  return (
    <div>
      Comments
      <div className={styles.postCommentContainer}>
        <form onSubmit={handleSubmitComment}>
          <textarea onChange={debouncedHandleCommentChange}/>
          <input type="submit" value="Comment" />
        </form>
        { comments }
      </div>
    </div>
  )
}
