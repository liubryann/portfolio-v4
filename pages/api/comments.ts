import { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import initMiddleware from '../../lib/init-middleware';
import { connectToDatabase } from '../../lib/mongodb';
import type { PostComment } from './posts';

const cors = initMiddleware(
  Cors({
    methods: ['POST', 'PUT', 'GET'],
  })
)

export const config = {
  api: {
    externalResolver: true,
  },
}

export interface Comment {
  name: string, 
  date: Date, 
  comment: string, 
  replies?: Comment[]
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);

  const { method } = req;
    switch(method) {
      case 'POST':
        return submitNewComment(req, res);
      case 'PUT':
        return replyToComment(req, res);
      case 'GET':
        return getComments(req, res);
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
const submitNewComment = async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();
  const { title, date, comment } = req.body;

  if (!comment || !title || !comment) {
    return res.status(400).json({ error: "Missing body param" });
  } 

  const query = { "title": title, "date": new Date(date) }

  const commentDoc: Comment = { name: "poohead", comment: comment, date: new Date(), replies: [] }

  const updateDocument = {
    $push: { "comments": commentDoc }
  }
  
  db.collection<PostComment>('comments').updateOne(query, updateDocument, (error, result) => {
    if (!error) {
      if (result.modifiedCount === 1) {
        return res.status(200).json(commentDoc)
      }
      return res.status(404).json({ error: "Could not find matching post" })
    }
    return res.status(500).json({ error: error.message });
  });
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
const replyToComment = async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();
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

  db.collection<PostComment>('comments').updateOne(query, updateDocument, options, (error, result) => {
    if (!error) {
      if (result.modifiedCount === 1) {
        return res.status(200).json(replyDoc)
      }
      return res.status(404).json({ error: "Could not find matching post or comment" })
    }
    return res.status(500).json({ error: error.message });
  })
}

/**
 * Gets the comments from a blog post
 * @param req.body: {
 *  title: title of post,
 *  date: date of post,
 * }
 * @returns the comments in the blog post
 */
const getComments = async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();
  const { title, date } = req.body;

  if (!title || !date) {
    return res.status(400).json({ error: "Missing body param" })
  }
  db.collection<PostComment>('comments').findOne({ "title": title, "date": date }, (error, result) => {
    if (!error) {
      if (result){
        return res.status(200).json(result);
      }
      return res.status(404).json({ error: "Could not find matching post" })
    }
    return res.status(500).json({ error: error.message })
  })
}