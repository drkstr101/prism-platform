import { MockProvider } from '@pied/pied-piper.testing.mock-provider';
import { userMock } from '@prism/people.entities.user';
import { UserCard } from './user-card.js';

export const BasicUserCard = () => {
  const user = userMock.larry;

  return (
    <MockProvider>
      <UserCard user={user} />
    </MockProvider>
  );
}
