import React from 'react';

import { render } from '@testing-library/react';
import { BaseTheme } from './base-theme.js';

it('renders with the correct text', () => {
  const { getByText } = render(<BaseTheme>hello world!</BaseTheme>);
  const rendered = getByText('hello world!');
  expect(rendered).toBeTruthy();
});
