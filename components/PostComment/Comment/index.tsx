import { useState, useMemo } from 'react';

import styles from './comment.module.scss';

import type { Comment as CommentType } from '../../../pages/api/comments';

import { relativeTimeFromDates } from '../../../lib/relative-time';

import TextareaAutosize from 'react-textarea-autosize';

interface CommentProps {
  postTitle: string, // title of post
  postDate: string, // date of post
  commentName: string, // name of commentator
  comment: string, // body of comment
  commentDate: Date, // date of comment
  replies?: CommentType[], // list of replies to comment
  isReply: boolean, // true if the comment is a reply to another comment
  isReplyActive?, // if the reply box is open
  handleReplyClick?: () => void, // toggle which reply box is active
  handleReplyChange?: (e) => void, // on change handler for reply box
  handleSubmitReply?: (e) => void, // handler to submit reply
  handleCancelClick?: () => void, // handler to cancel reply
}

/**
 * A commment or reply to a comment
 */
export default function Comment({ 
  postTitle, 
  postDate, 
  commentName, 
  comment, 
  commentDate, 
  replies, 
  isReply, 
  isReplyActive, 
  handleReplyClick,
  handleReplyChange,
  handleSubmitReply,
  handleCancelClick,
}: CommentProps) {
  const [expandReplies, setExpandReplies] = useState<boolean>(false);
  const [repliesComponent, setRepliesComponent] = useState<JSX.Element[]>([])

  /**
   * Toggle replies visibility
   */
  const handleExpandRepliesClick = () => {
    setExpandReplies(!expandReplies);
  }

  /**
   * Maps replies to a list comment components
   */
  useMemo(() => {
    if (replies) {
      const repliesList = replies.map((reply, index) => {
        const { name: replyName, comment: replyBody, date: replyDate } = reply;
        return (
          <Comment
            key={index}
            postTitle={postTitle}
            postDate={postDate}
            commentName={replyName}
            commentDate={replyDate}
            comment={replyBody}
            isReply={true}
          />
        )
      })
      setRepliesComponent(repliesList);
    }
  }, [replies, postTitle, postDate])

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
          <span className={styles.name}>{commentName}</span>
          <span>{' '}</span>
          <span className={styles.date}>{relativeTimeFromDates(new Date(commentDate))}</span>
        </div>
        <div className={styles.commentBody}>
          {comment}
        </div>
        <div className={styles.footer}>
          { !isReply && replies && replies.length > 0 && <button className={styles.button} onClick={handleExpandRepliesClick}>{expandButtonText()}</button> }
          { !isReply && !isReplyActive && <button className={styles.button} onClick={handleReplyClick}>Reply</button> }
        </div>
        { !isReply && isReplyActive && 
          <div className={styles.reply}>
            <form onSubmit={async (e) => { await handleSubmitReply(e); setExpandReplies(true); }}>
              <div><TextareaAutosize placeholder="Leave a reply..." className={styles.replyBox} onChange={handleReplyChange} /></div>
              <div className={styles.container}>
                <button className={styles.button} onClick={handleCancelClick}>Cancel</button>
                <input className={styles.button} type="submit" value="Reply" />
              </div>
            </form>
          </div>
        }
        {
          expandReplies && (
            <div className={styles.replies}>
              {repliesComponent}
            </div>
          )
        }
        
      </div>
    </div>
  )
}
