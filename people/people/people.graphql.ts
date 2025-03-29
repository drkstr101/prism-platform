import { gql } from 'graphql-tag';
import { GqlSchema } from '@bitdev/symphony.backends.backend-server';
import { PeopleNode } from './people.node.runtime.js';

/**
 * Creates the GraphQL schema for the authentication API.
 */
export function createPeopleGqlSchema(
  people: PeopleNode
): GqlSchema {
  return {
    typeDefs: gql`
      type User {
        id: String!
        username: String!
        email: String!
        displayName: String
      }

      type Query {
        me: User
        listUsers: [User]
      }

      type Mutation {
        signup(username: String!, email: String!, password: String!): User
        login(email: String!, password: String!): User
      }
    `,
    resolvers: {
      Query: {
        me: async (req, args, context) => {
          return people.getCurrentUser(context.req);
        },
        listUsers: async () => {
          const users = await people.listUsers();
          return users.map((user) => {
            return user.toObject();
          });
        },
      },
      Mutation: {
        signup: async (req, { username, email, password }) => {
          const user = await people.signup(username, email, password);
          return user.toObject();
        },
        login: async (req, { email, password }) => {
          const user = await people.login(email, password);
          return user.toObject();
        },
      },
    },
  };
}
