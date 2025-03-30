import { User } from '@eop/accounts.entities.user';
import { createContext, useContext } from 'react';

export type AuthContextValue = {
  user?: User;
};

export const AuthContext = createContext<AuthContextValue>({});

/**
 * returns the current user.
 */
export function useMe() {
  const userContext = useContext(AuthContext);
  return userContext.user;
}
