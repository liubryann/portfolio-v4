import { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import initMiddleware from '../../lib/init-middleware';
import { connectToDatabase } from '../../lib/mongodb';

const cors = initMiddleware(
  Cors({
    methods: ['POST', 'PUT', 'GET'],
  })
)

export interface Comment {
  name: string, 
  date: Date, 
  comment: string, 
  replies: Comment[]
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);

  const { method } = req;

  switch(method) {
    case 'POST':
      submitNewComment(req, res);
      break;
    default: 
      res.setHeader('Allow', ['POST', 'PUT', 'GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

/**
 * Submit a new comment on a blog post
 * @param req.body: { 
 *  title: title of the blod post, 
 *  date: date of the blog post,
 *  comment: the comment body 
 * }
 * @returns the new comment
 */
const submitNewComment = async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();
  const { title, date, comment } = req.body;

  if (!comment) {
    return res.status(400).json({ error: "Missing comment body param" });
  } 

  const query = { "title": title, "date": date }

  const commentDoc: Comment = { name: "poohead", comment: comment, date: new Date(), replies: [] }

  const updateDocument = {
    $push: { "comments": commentDoc }
  }
  
  try {
    db.collection('comments').updateOne(query, updateDocument);
    return res.status(200).json( commentDoc )
  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
}