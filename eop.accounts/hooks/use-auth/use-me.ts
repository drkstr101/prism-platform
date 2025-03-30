import { gql, useQuery } from '@apollo/client';
import { User } from '@eop/accounts.entities.user';

const ME_QUERY = gql`
  query Me($username: String!, $password: String!) {
    me {
      id
      username
      email
      displayName
    }
  }
`;

export type MeQueryValue = [
  User | undefined,
  {
    loading?: boolean;
    error?: string;
  },
];

export function useMeQuery(skip?: boolean): MeQueryValue {
  const results = useQuery(ME_QUERY, {
    skip: !skip,
  });

  const user = results.data?.me ? User.from(results.data?.me) : undefined;

  return [
    user,
    {
      loading: results.loading,
      error: results.error?.message,
    },
  ];
}
