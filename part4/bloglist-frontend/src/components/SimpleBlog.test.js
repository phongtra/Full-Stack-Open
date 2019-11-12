import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import SimpleBlog from './SimpleBlog';

test('render SimpleBlog', async () => {
  const blog = {
    author: 'phong',
    title: 'react',
    likes: 4
  };

  const component = render(<SimpleBlog blog={blog} />);
  const blogTitle = component.container.querySelector('.title-author');
  expect(blogTitle).toHaveTextContent(`${blog.title} ${blog.author}`);
});

test('press button', async () => {
  const blog = {
    author: 'phong',
    title: 'react',
    likes: 4
  };
  const mockHandler = jest.fn();
  const component = render(<SimpleBlog blog={blog} onClick={mockHandler} />);

  const button = component.getByText('like');
  fireEvent.click(button);
  fireEvent.click(button);
  expect(mockHandler.mock.calls.length).toBe(2);
});
