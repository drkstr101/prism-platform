import { User } from '@eop/accounts.entities.user';
import { ReactNode } from 'react';
import { AuthContext } from './auth-context.js';
import { useAuth } from './use-auth.js';

export type AuthProviderProps = {
  /**
   * children of the element.
   */
  children?: ReactNode;

  /**
   * render with in mock mode.
   */
  user?: User;
};

export function AuthProvider({
  children,
  user: targetUser,
}: AuthProviderProps) {
  const { user } = useAuth(targetUser);
  const me = user || undefined;

  return (
    <AuthContext.Provider value={{ user: me }}>{children}</AuthContext.Provider>
  );
}
