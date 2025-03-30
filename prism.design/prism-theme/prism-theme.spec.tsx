import React from 'react';

import { render } from '@testing-library/react';
import { PrismTheme } from './prism-theme.js';

it('renders with the correct text', () => {
  const { getByText } = render(<PrismTheme>hello world!</PrismTheme>);
  const rendered = getByText('hello world!');
  expect(rendered).toBeTruthy();
});
