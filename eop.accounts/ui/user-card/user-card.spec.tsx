import React from 'react';
import { render } from '@testing-library/react';
import { BasicUserCard } from './user-card.composition.js';

it('should render the correct text', () => {
  const { getByText } = render(<BasicUserCard />);
  const rendered = getByText('larry');
  expect(rendered).toBeTruthy();
});
