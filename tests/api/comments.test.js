const { MongoClient } = require('mongodb');
const { submitNewPost } = require('../../pages/api/posts');
const { submitNewComment } = require('../../pages/api/comments');
const { createMocks } = require('node-mocks-http');

describe('', () => {
  let connection;
  let db; 

  const postBody = {
    title: "I love testing",
    date: new Date("2021-10-22")
  }

  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
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
    })

    await submitNewComment(req, res, db);
    expect(res._getStatusCode()).toEqual(200)
    const post = await getPost();
    expect(post.comments.length).toEqual(1)

    //TODO cleanup
  })
})