import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { BasicHeader } from './header.composition.js';

it('should render the correct text', () => {
  const { getByText } = render(<BasicHeader />, {
    wrapper: ({ children }) => {
      return <MemoryRouter>{children}</MemoryRouter>;
    },
  });
  const rendered = getByText('Prism');
  expect(rendered).toBeTruthy();
});
