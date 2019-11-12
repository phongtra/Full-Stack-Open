import React, { useState, useEffect } from 'react';

import blogsService from './services/blogs';
import loginService from './services/login';

import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs';
import { useField } from './hooks';

const App = () => {
  const username = useField('text');
  const password = useField('password');
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const title = useField('text');
  const author = useField('text');
  const url = useField('text');
  const [notification, setNotification] = useState('');

  const blogFormRef = React.createRef();
  useEffect(() => {
    const fetchBlogs = async () => {
      const blogsData = await blogsService.getAll();
      setBlogs(blogsData);
    };
    fetchBlogs();
  }, []);
  useEffect(() => {
    const userLoggedIn = window.localStorage.getItem('user');
    if (userLoggedIn) {
      const user = JSON.parse(userLoggedIn);
      setUser(user);
    }
  }, []);
  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      });
      window.localStorage.setItem('user', JSON.stringify(user));
      blogsService.setToken(user.token);
      setUser(user);
      username.onChange();
      password.onChange();
      setNotification(`${user.userCredential.username} has logged in`);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      username.onChange();
      password.onChange();
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  const createBlog = async event => {
    try {
      event.preventDefault();
      blogFormRef.current.toggleVisibility();
      blogsService.setToken(user.token);
      const blog = await blogsService.create({
        title: title.value,
        author: author.value,
        url: url.value
      });
      setBlogs(blogs.concat(blog));
      title.onChange();
      author.onChange();
      url.onChange();
      setNotification(`a new blog ${blog.title} by ${blog.author} added`);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (e) {
      setErrorMessage('require url and title');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  const updateBlog = async (updateBlog, id) => {
    blogsService.setToken(user.token);
    try {
      const update = await blogsService.update(updateBlog, id);
      setBlogs(
        blogs.map(blog => {
          if (blog.id === id) {
            return { ...blog, ...update };
          }
          return blog;
        })
      );
      setNotification(`like added`);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (e) {
      setErrorMessage('cannot add like');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  const deleteBlog = async (id, blog) => {
    try {
      blogsService.setToken(user.token);
      const result = window.confirm(
        `remove blog ${blog.title} by ${blog.author}`
      );
      if (result) {
        await blogsService.deleteBlog(id);
        setBlogs(blogs.filter(blog => blog.id !== id));
        setNotification(`blog removed`);
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      }
    } catch (e) {
      setErrorMessage('cannot delete blog');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  return (
    <div className="App">
      {errorMessage ? <h1 style={{ color: 'red' }}>{errorMessage}</h1> : ''}
      {notification ? <h1 style={{ color: 'green' }}>{notification}</h1> : ''}
      {!user ? (
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
        />
      ) : (
        <Blogs
          blogs={blogs}
          user={user}
          setUser={setUser}
          title={title}
          author={author}
          url={url}
          createBlog={createBlog}
          blogFormRef={blogFormRef}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
        />
      )}
    </div>
  );
};

export default App;
