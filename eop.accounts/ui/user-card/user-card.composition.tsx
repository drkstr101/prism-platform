import { MockProvider } from '@aps/design.testing.mock-provider';
import { userMock } from '@eop/accounts.entities.user';
import { UserCard } from './user-card.js';

export const BasicUserCard = () => {
  const user = userMock.larry;

  return (
    <MockProvider>
      <UserCard user={user} />
    </MockProvider>
  );
};
