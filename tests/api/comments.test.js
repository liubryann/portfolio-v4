const { MongoClient } = require('mongodb');
const { submitNewPost } = require('../../pages/api/posts');
const { submitNewComment, replyToComment } = require('../../pages/api/comments');
const { createMocks } = require('node-mocks-http');
const { EventEmitter } = require('events');

describe('Test api/comments', () => {
  let connection;
  let db; 

  const postBody = {
    title: "I love testing",
    date: new Date("2021-10-22")
  }

  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db(global.__MONGO_DB_NAME__);

    const { req, res } = createMocks({
      method: 'POST',
      body: postBody,
    })

    await submitNewPost(req, res, db)
  })

  afterAll(async () => {
    await connection.close();
  })

  const getPost = async () => {
    return await db.collection('comments').findOne(postBody);
  }

  // it('POST api/posts should respond with 200', async () => {
  //   // const postBody = {
  //   //   title: "I love testing",
  //   //   date: new Date("2021-10-22")
  //   // }

  //   // const { req, res } = createMocks({
  //   //   method: 'POST',
  //   //   body: postBody,
  //   // })

  //   // await submitNewPost(req, res, db)

  //   // expect(res._getStatusCode()).toEqual(200)

  //   // const comments = db.collection('comments');
  //   // const insertedPost = await comments.findOne(postBody);
  //   // expect(insertedPost).toBeTruthy();
  // })

  it('POST api/comments should respond with 200', async () => {
    const commentBody = { ...postBody, comment: "I love testing too!" }

    const { req, res } = createMocks({
      method: 'POST',
      body: commentBody,
    },
    {
      eventEmitter: EventEmitter
    })

    await submitNewComment(req, res, db);

    return new Promise((resolve, reject) => {
      res.on('end', async () => {
        expect(res._getStatusCode()).toEqual(200);
        resolve();
      })
    })
  })

  it('POST api/comments should respond with 400 with invalid input', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: postBody, // missing the comment field
    },
    {
      eventEmitter: EventEmitter
    })

    await submitNewComment(req, res, db);

    return new Promise((resolve, reject) => {
      expect(res._getStatusCode()).toEqual(400)
      resolve();
    })
  })

  it('POST api/comments should respond with 404 for no matching post', async () => {
    const nonexistingPostBody = {
      title: "I hate testing",
      date: "2021-10-21",
      comment: "I hate testing too!"
    }

    const { req, res } = createMocks({
      method: 'POST',
      body: nonexistingPostBody,
    },
    {
      eventEmitter: EventEmitter
    })

    await submitNewComment(req, res, db);

    return new Promise((resolve, reject) => {
      res.on('end', () => {
        expect(res._getStatusCode()).toEqual(404);
        resolve();
      })
    })
  })

  it('PUT api/comments should respond with 200', async () => {
    const commentBody = { ...postBody, comment: "Reply to me!" }
    
    const { req: req1, res: res1 } = createMocks({
      method: 'POST',
      body: commentBody,
    },
    {
      eventEmitter: EventEmitter
    })

    // make a new comment
    await submitNewComment(req1, res1, db)

    let comment;
    
    await new Promise((resolve, reject) => {
      res1.on('end', () => {
        expect(res1._getStatusCode()).toEqual(200)
        comment = JSON.parse(res1._getData());
        resolve();
      })
    })
  
    const replyBody = {
      postTitle: "I love testing",
      postDate: new Date("2021-10-22"),
      commentName: comment.name,
      commentDate: new Date(comment.date),
      comment: "Hi! I'm replying to you!"
    }

    const { req: req2, res: res2 } = createMocks({
      method: 'PUT',
      body: replyBody
    },
    {
      eventEmitter: EventEmitter
    })
    
    // reply to the comment
    await replyToComment(req2, res2, db);

    return new Promise((resolve, reject) => {
      res2.on('end', () => {
        expect(res2._getStatusCode()).toEqual(200)
        resolve();
      })
    })
  })
})