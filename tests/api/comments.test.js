const { MongoClient } = require('mongodb');
const { submitNewPost } = require('../../pages/api/posts');
const { submitNewComment, replyToComment, getComments } = require('../../pages/api/comments');
const { createMocks } = require('node-mocks-http');

describe('Test api/comments', () => {
  let connection;
  let db; 

  const postBody = {
    title: "I love testing",
    date: new Date("2021-10-22")
  }

  let comment; // Use for querying the inital comment

  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db(global.__MONGO_DB_NAME__);

    // Make an inital post
    const { req, res } = createMocks({
      method: 'POST',
      body: postBody,
    })
    await submitNewPost(req, res, db)

    // Make an inital comment
    const commentBody = { ...postBody, comment: "Reply to me!" }
    const { req: req2, res: res2 } = createMocks({
      method: 'POST',
      body: commentBody,
    })
    await submitNewComment(req2, res2, db)
    comment = JSON.parse(res2._getData());
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
    })

    await submitNewComment(req, res, db);
    expect(res._getStatusCode()).toEqual(200);
  })

  it('POST api/comments should respond with 400 with invalid input', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: postBody, // missing the comment field
    })

    await submitNewComment(req, res, db);
    expect(res._getStatusCode()).toEqual(400)
  })

  it('POST api/comments should respond with 404 for no matching post', async () => {
    const nonexistingPostBody = {
      title: "I hate testing", // non-existing post
      date: "2021-10-21",
      comment: "I hate testing too!"
    }

    const { req, res } = createMocks({
      method: 'POST',
      body: nonexistingPostBody,
    })

    await submitNewComment(req, res, db);
    expect(res._getStatusCode()).toEqual(404);
  })

  it('PUT api/comments should respond with 200', async () => {    
    const replyBody = {
      postTitle: "I love testing",
      postDate: new Date("2021-10-22"),
      commentName: comment.name,
      commentDate: new Date(comment.date),
      comment: "Hi! I'm replying to you!"
    }

    const { req, res } = createMocks({
      method: 'PUT',
      body: replyBody
    })
    
    await replyToComment(req, res, db);
    expect(res._getStatusCode()).toEqual(200)
  })

  it('PUT api/comments should respond with 400 with invalid input', async () => {
    const replyBody = {
      postTitle: "I love testing",
      postDate: new Date("2021-10-22"),
      commentName: comment.name,
      commentDate: new Date(comment.date),
      // missing the comment field
    }

    const { req, res } = createMocks({
      method: 'PUT',
      body: replyBody 
    })

    await replyToComment(req, res, db);
    expect(res._getStatusCode()).toEqual(400)
  })

  it('PUT api/comments should respond with 404 with no matching comment', async () => {
    const replyBody = {
      postTitle: "I love testing",
      postDate: new Date("2021-10-22"),
      commentName: "Mr. I don't exist", // non-existing comment
      commentDate: new Date(comment.date),
      comment: "Hi! I'm replying to you!"
    }

    const { req, res } = createMocks({
      method: 'PUT',
      body: replyBody 
    })

    await replyToComment(req, res, db);
    expect(res._getStatusCode()).toEqual(404)
  })

  it('GET api/comments should respond with 200', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      body: postBody
    })

    await getComments(req, res, db); 
    expect(res._getStatusCode()).toEqual(200)
  })

  it('GET api/comments should respond with 400 with invalid input', async () => {
    const invalidPostBody = {
      // missing title
      date: new Date("2021-10-22")
    }

    const { req, res } = createMocks({
      method: 'GET',
      body: invalidPostBody
    })

    await getComments(req, res, db);
    expect(res._getStatusCode()).toEqual(400)
  })

  it('GET api/comments should respond with 404 with no matching post', async () => {
    const nonExistingPostBody = {
      title: "I hate testing", // non-existing post
      date: new Date("2021-10-22")
    }

    const { req, res } = createMocks({
      method: 'GET',
      body: nonExistingPostBody
    })

    await getComments(req, res, db);
    expect(res._getStatusCode()).toEqual(404)
  })
})