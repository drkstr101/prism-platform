import React from 'react';
import { render } from '@testing-library/react';
import { BasicDashboard } from './dashboard.composition.js';

it('should render the people category', () => {
  const { getByText } = render(<BasicDashboard />);
  const rendered = getByText('People');
  expect(rendered).toBeTruthy();
});
