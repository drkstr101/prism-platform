import { userMock } from '@eop/accounts.entities.user';
import { MockProvider } from '@prism/platform.testing.mock-provider';
import { UserCard } from './user-card.js';

export const BasicUserCard = () => {
  const user = userMock.larry;

  return (
    <MockProvider>
      <UserCard user={user} />
    </MockProvider>
  );
};
