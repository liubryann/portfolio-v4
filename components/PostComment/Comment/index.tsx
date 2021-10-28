import React from 'react'
import { useState, useMemo, useEffect } from 'react';
import styles from './comment.module.scss';

import type { Comment as CommentType } from '../../../pages/api/comments';
import { submitReply } from '../../../lib/services/comment-service';
import { debounce } from 'lodash';

interface CommentProps {
  postTitle: string,
  postDate: string,
  commentName: string,
  comment: string,
  commentDate: string,
  replies?: CommentType[],
  isReply: boolean,
}

export default function Comment({ postTitle, postDate, commentName, comment, commentDate, replies, isReply }: CommentProps) {
  const [expandReplies, setExpandReplies] = useState<boolean>(false);
  const [openReply, setOpenReply] = useState<boolean>(false);
  const [replyInput, setReplyInput] = useState<string>('');
  const [repliesComponent, setRepliesComponent] = useState<JSX.Element[]>([])

  /**
   * Toggle reply box visibility
   */
  const handleReplyClick = () => {
    setOpenReply(!openReply)
  }

  /**
   * Toggle replies visibility
   */
  const handleExpandRepliesClick = () => {
    setExpandReplies(!expandReplies);
  }

  /**
   * Handle reply input change
   */
   const handleReplyChange = (e) => {
    setReplyInput(e.target.value);
  }  

  const debouncedHandleReplyChange = useMemo(
    () => debounce(handleReplyChange, 300)
  , [])

  /**
   * Submit a new reply to a comment
   * @param commentName - name of commentor replying to
   * @param commentDate - date of comment replying to
   */
  const handleSubmitReply = async (e) => {
    e.preventDefault(); 
    const res = await submitReply(postTitle, postDate, commentName, commentDate, replyInput)
    if (res.status === 200) {
      const { name: replyName, comment: replyBody, date: replyDate } = res.data;
      const newReply = 
        <Comment 
          postTitle={postTitle}
          postDate={postDate}
          commentName={replyName}
          commentDate={replyDate as string}
          comment={replyBody}
          isReply={true}
        />
      setRepliesComponent([...repliesComponent, newReply])
      setOpenReply(!openReply)
      setReplyInput('');
    }
  }

  /**
   * Clean up debounce
   */
  useEffect(() => {
    return () => {
      debouncedHandleReplyChange.cancel();
    }
  }, [])

  useMemo(() => {
    if (replies) {
      const repliesList = replies.map((reply) => {
        const { name: replyName, comment: replyBody, date: replyDate } = reply;
        return (
          <Comment
            key={replyDate as string}
            postTitle={postTitle}
            postDate={postDate}
            commentName={replyName}
            commentDate={replyDate as string}
            comment={replyBody}
            isReply={true}
          />
        )
      })
      setRepliesComponent(repliesList);
    }
  }, [replies])

  /**
   * Toggles the expand button text
   * @returns the button text
   */
  const expandButtonText = (): string => {
    if (expandReplies) {
      return 'Hide replies'
    }
    return `View ${replies.length} ${replies.length === 1 ? 'reply' : 'replies'}`
  }

  return (
    <div>
      <div className={styles.commentContainer}>
        <div className={styles.header}>
          <div>{commentName}</div>
          <div>{commentDate}</div>
        </div>
        <div>
          {comment}
        </div>
        <div className={styles.footer}>
          { !isReply && replies && replies.length > 0 && <button onClick={handleExpandRepliesClick}>{expandButtonText()}</button> }
          { !isReply && <button onClick={handleReplyClick}>{openReply ? 'Cancel' : 'Reply'}</button> }
        </div>
        { !isReply && openReply && 
          <div>
            <form onSubmit={handleSubmitReply}>
              <textarea onChange={handleReplyChange}/>
              <input type="submit" value="Reply" />
            </form>
          </div>
        }
        {
          expandReplies && repliesComponent
        }
        
      </div>
    </div>
  )
}
