import { GqlSchema } from '@bitdev/symphony.backends.backend-server';
import { gql } from 'graphql-tag';
import type { PrismPlatformNode } from './prism-platform.node.runtime.js';

export function prismPlatformGqlSchema(
  prismPlatform: PrismPlatformNode
): GqlSchema {
  return {
    typeDefs: gql`
      type PlatformManifest {
        name: String
        slogan: String
      }

      type Query {
        manifest: PlatformManifest
      }
    `,
    resolvers: {
      Query: {
        manifest: async (req, { id }: { id: string }) => {
          const manifest = prismPlatform.getPlatformManifest();
          return manifest;
        },
      },
    },
  };
}
