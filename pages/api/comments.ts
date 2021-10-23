import { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import initMiddleware from '../../lib/init-middleware';
import { connectToDatabase } from '../../lib/mongodb';
import type { PostComment } from './posts';
import type { Db } from 'mongodb';

const cors = initMiddleware(
  Cors({
    methods: ['POST', 'PUT', 'GET'],
  })
)
export interface Comment {
  name: string, 
  date: Date, 
  comment: string, 
  replies?: Comment[]
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);
  const { db } = await connectToDatabase();

  const { method } = req;
    switch(method) {
      case 'POST':
        return submitNewComment(req, res, db);
      case 'PUT':
        return replyToComment(req, res, db);
      case 'GET':
        return getComments(req, res, db);
      default: 
        res.setHeader('Allow', ['POST', 'PUT', 'GET'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
}

/**
 * Submit a new comment on a blog post
 * @param req.body: { 
 *  title: title of post, 
 *  date: date of post,
 *  comment: the comment body 
 * }
 * @returns the new comment
 */
export const submitNewComment = async (req: NextApiRequest, res: NextApiResponse, db: Db) => {
  const { title, date, comment } = req.body;

  if (!comment || !title || !comment) {
    return res.status(400).json({ error: "Missing body param" });
  } 

  const query = { "title": title, "date": new Date(date) }

  const commentDoc: Comment = { name: "poohead", comment: comment, date: new Date(), replies: [] }

  const updateDocument = {
    $push: { "comments": commentDoc }
  }

  try {
    const result = await db.collection<PostComment>('comments').updateOne(query, updateDocument)
    if (result.modifiedCount === 1) {
      return res.status(200).json(commentDoc);
    }
    return res.status(404).json({ error: "Could not find matching post" });
  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
}

/**
 * Submit a new reply to a comment
 * @param req.body: {
 *  postTitle: title of post,
 *  postDate: date of post, 
 *  commentName: name of person replying to,
 *  commentDate: date of comment replying to,
 *  comment: reply comment body
 * }
 * @returns the new reply comment
 */
export const replyToComment = async (req: NextApiRequest, res: NextApiResponse, db: Db) => {
  const { postTitle, postDate, commentName, commentDate, comment } = req.body; 

  if (!postTitle || !postDate || !commentName || !commentDate || !comment) {
    return res.status(400).json({ error: "Missing body param" });
  } 

  const query = { "title": postTitle, "date": new Date(postDate) }

  const replyDoc: Comment = { name: "peepeehead", comment: comment, date: new Date() }

  const updateDocument = {
    $push: { "comments.$[comment].replies": replyDoc }
  }

  const options = {
    arrayFilters: [
      {
        "comment.name": commentName,
        "comment.date": new Date(commentDate),
      },
    ]
  }

  try { 
    const result = await db.collection<PostComment>('comments').updateOne(query, updateDocument, options)
    if (result.modifiedCount === 1) {
      return res.status(200).json(replyDoc)
    }
    return res.status(404).json({ error: "Could not find matching post or comment" })
  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
}

/**
 * Gets the comments from a blog post
 * @param req.body: {
 *  title: title of post,
 *  date: date of post,
 * }
 * @returns the comments in the blog post
 */
export const getComments = async (req: NextApiRequest, res: NextApiResponse, db: Db) => {
  const { title, date } = req.body;

  if (!title || !date) {
    return res.status(400).json({ error: "Missing body param" })
  }

  try {
    const result = await db.collection<PostComment>('comments').findOne({ "title": title, "date": new Date(date) })
    if (result) {
      return res.status(200).json(result);
    }
    return res.status(404).json({ error: "Could not find matching post" })
  } catch(e) {
    return res.status(500).json({ error: e.message })
  }
}