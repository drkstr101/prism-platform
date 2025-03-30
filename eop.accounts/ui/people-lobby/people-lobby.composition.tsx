import { MockProvider } from '@prism/platform.testing.mock-provider';
import { PeopleLobby } from './people-lobby.js';

export const BasicPeopleLobby = () => {
  return (
    <MockProvider>
      <PeopleLobby />
    </MockProvider>
  );
};
