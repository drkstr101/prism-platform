import { MockProvider } from '@pied/pied-piper.testing.mock-provider';
import { PeopleLobby } from './people-lobby.js';

export const BasicPeopleLobby = () => {
  return (
    <MockProvider>
      <PeopleLobby />
    </MockProvider>
  );
}
