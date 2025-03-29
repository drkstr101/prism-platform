import { render } from '@testing-library/react';
import { BasicPeopleLobby } from './people-lobby.composition.js';

it('should render the correct number of cards', async () => {
  const { findAllByText } = render(<BasicPeopleLobby />);
  const userPrefixes = await findAllByText('@');
  expect(userPrefixes.length).toBe(2);
});
