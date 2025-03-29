import React from 'react';
import { gql, useQuery } from "@apollo/client";

const GET_USER = gql`
  query GET_USER($username: String) {
    getUser(username: $username) {
      username
    }
}
`;

export function UserProfile({ username }: { username: string }) {
  const result = useQuery(GET_USER, {
    variables: {
      username
    }
  });

  if (!result.data || result.loading) return <></>;
  return <>{result.data.getUser.username}</>;
}
