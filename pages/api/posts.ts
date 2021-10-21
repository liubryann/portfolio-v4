import { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import initMiddleware from '../../lib/init-middleware';
import { connectToDatabase } from '../../lib/mongodb';
import type { Comment } from './comments';

const cors = initMiddleware(
  Cors({
    methods: ['POST'],
  })
)

interface PostComment {
  title: string,
  date: Date, 
  comments: Comment[]
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);

  const { method } = req;

  switch(method) {
    case 'POST':
      submitNewPost(req, res);
      break;
    default: 
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

/**
 * Submits a new blog post
 * @param req.body: {
 *  title: title of the blog post,
 *  date: date of the blog post,
 * }
 * @returns the new blog post 
 */
const submitNewPost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();

  const { title, date } = req.body;

  if (!title || !date) {
    return res.status(400).json({ error: "Missing body param" });
  }

  const postCommentDoc: PostComment = { title: title, date: date, comments: [] }

  try {
    db.collection("comments").insertOne(postCommentDoc);
    return res.status(200).json(postCommentDoc);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
