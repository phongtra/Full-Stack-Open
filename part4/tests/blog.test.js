const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/Blogs');

const api = supertest(app);

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
];

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObject = new Blog(blogs[0]);
  await blogObject.save();

  blogObject = new Blog(blogs[1]);
  await blogObject.save();
});

describe('blog route', () => {
  test('blogs are returned in json', async () => {
    await api.get('/api/blogs').expect('Content-Type', /application\/json/);
  });
  test('get 2 blogs', async () => {
    const res = await api.get('/api/blogs');
    expect(res.body.length).toEqual(blogs.length);
  });
  test('each blog has id', async () => {
    const res = await api.get('/api/blogs');
    res.body.forEach(blog => {
      expect(blog.id).toBeDefined();
    });
  });
  test('create a new blog', async () => {
    const newBlog = {
      title: 'Phong',
      author: 'Edsger W. Dijkstra',
      url:
        'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5
    };
    await api.post('/api/blogs').send(newBlog);
    const res = await api.get('/api/blogs');
    expect(res.body.length).toEqual(blogs.length + 1);
  });
  test('likes is 0 when likes is missing', async () => {
    const newBlog = {
      title: 'Phong',
      author: 'Edsger W. Dijkstra',
      url:
        'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
    };
    const blog = await api.post('/api/blogs').send(newBlog);
    expect(blog.body.likes).toEqual(0);
  });
  test('send 400 status code when there is no title and url', async () => {
    const newBlog = {
      author: 'Edsger W. Dijkstra'
    };
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400);
  });
  test('delete blog', async () => {
    await api.delete('/api/blogs/5a422aa71b54a676234d17f8');
    const res = await api.get('/api/blogs');
    expect(res.body.length).toEqual(blogs.length - 1);
  });
  test('update blog', async () => {
    const blog = await api
      .put('/api/blogs/5a422aa71b54a676234d17f8')
      .send({ likes: 100 })
      .expect(200);
    expect(blog.body._id).toEqual(
      blogs.find(blog => blog.id === '5a422aa71b54a676234d17f8')
    );
    expect(blog.body.likes).toEqual(100);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
