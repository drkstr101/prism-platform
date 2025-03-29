import { useQuery, gql } from '@apollo/client';
import { useIsMock } from '@pied/pied-piper.testing.mock-provider';
import { User, userMock } from '@prism/people.entities.user';

export const LIST_USERS = gql`
query LIST_USERS {
  listUsers {
    username
    displayName
  }
}
`;

export function useUserList(): undefined|null|User[] {
  const results = useQuery(LIST_USERS);
  // check if apollo is mocked and if so, return mock data.
  const isMock = useIsMock();
  if (isMock) return Object.values(userMock);

  if (results.loading) return undefined;
  if (!results.data?.listUsers) return null;

  return results.data?.listUsers.map((user) => {
    return User.from(user);
  });
}
