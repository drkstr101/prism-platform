import { gql, useQuery } from '@apollo/client';
import { User, userMock } from '@eop/accounts.entities.user';
import { useIsMock } from '@prism/platform.testing.mock-provider';

export const LIST_USERS = gql`
  query LIST_USERS {
    listUsers {
      username
      displayName
    }
  }
`;

export function useUserList(): undefined | null | User[] {
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
