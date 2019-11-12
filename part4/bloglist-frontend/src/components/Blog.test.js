import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import Blog from './Blog';

test('only see author and title', async () => {
  const blog = {
    author: 'phong',
    title: 'react',
    url: 'google.com',
    likes: 4
  };
  const component = render(<Blog blog={blog} />);
  const div = component.container.querySelector('.blog-detail');
  expect(div).toHaveTextContent(`${blog.title} ${blog.author}`);
});

test('see the details when click', async () => {
  const blog = {
    author: 'phong',
    title: 'react',
    url: 'google.com',
    likes: 4
  };
  const component = render(<Blog blog={blog} />);
  const div = component.container.querySelector('.blog-detail');
  fireEvent.click(div);
  const button = component.container.querySelector('.like');
  expect(button).toBeTruthy();
});
