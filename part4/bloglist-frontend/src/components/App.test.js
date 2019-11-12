import React from 'react';
import { render, waitForElement } from '@testing-library/react';

import App from '../App';
import LoginForm from './LoginForm';

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(<App />);
    component.rerender(<App />);

    await waitForElement(() => component.getByText('login'));
    expect(component.getByText('login')).toBeTruthy();
    expect(component.container.querySelector('.login')).toBeTruthy();
    expect(component.container.querySelector('.blogs-page')).toBeFalsy();
  });
  test('when user are logged in, the blogs are rendered to the page', async () => {});
});
