import { MockProvider } from '@aps/design.testing.mock-provider';
import { PeopleLobby } from './people-lobby.js';

export const BasicPeopleLobby = () => {
  return (
    <MockProvider>
      <PeopleLobby />
    </MockProvider>
  );
};
