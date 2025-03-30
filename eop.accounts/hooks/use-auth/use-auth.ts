import { gql, useApolloClient, useMutation } from '@apollo/client';
import { User } from '@eop/accounts.entities.user';
import { useState } from 'react';
import { useMeQuery } from './use-me.js';

/**
 * The shape of the authentication context value.
 */
export type AuthContextValue = {
  /**
   * The currently logged-in user or null if no user is logged in.
   */
  user: User | null;

  /**
   * A function to log in a user.
   */
  login: (email: string, password: string) => Promise<void>;

  /**
   * A function to sign up a new user.
   */
  signup: (email: string, password: string, username: string) => Promise<void>;

  /**
   * A function to log out the current user.
   */
  logout: () => void;
};

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
      email
    }
  }
`;

const SIGNUP_MUTATION = gql`
  mutation Signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      id
      username
      email
    }
  }
`;

/**
 * A React Hook for managing authentication state.
 * @returns An object containing the current user, login, signup, and logout functions.
 */
export function useAuth(initialUser?: User): AuthContextValue {
  const client = useApolloClient();
  const [user, setUser] = useState<User | null>(initialUser);
  const [loginMutation] = useMutation(LOGIN_MUTATION);
  const [signupMutation] = useMutation(SIGNUP_MUTATION);
  const [me] = useMeQuery(Boolean(initialUser));

  const login = async (email: string, password: string) => {
    try {
      const result = await loginMutation({
        variables: {
          email,
          password,
        },
      });

      const loggedInUser = User.from(result.data.login);
      setUser(loggedInUser);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signup = async (email: string, password: string, username: string) => {
    try {
      const result = await signupMutation({
        variables: {
          username,
          email,
          password,
        },
      });

      const signedUpUser = User.from(result.data.signup);

      setUser(signedUpUser);
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  /**
   * Function to log out the current user. Clears the user from state and removes the user cookie.
   * @returns {void}
   */
  const logout = () => {
    setUser(null);
    client.resetStore(); // Clear cached data after logout
  };

  return {
    user: user || me,
    login,
    signup,
    logout,
  };
}
