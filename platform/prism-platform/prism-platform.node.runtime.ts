import {
  SymphonyPlatformAspect,
  type SymphonyPlatformNode,
} from '@bitdev/symphony.symphony-platform';
import { BackendServerDefinition } from '@bitdev/symphony.backends.backend-server';
import type { PrismPlatformConfig } from './prism-platform-config.js';
import { prismPlatformGqlSchema } from './prism-platform.graphql.js';

export class PrismPlatformNode {
  constructor(
    private config: PrismPlatformConfig,
    private symphonyPlatform: SymphonyPlatformNode,
  ) {}

  /**
   * register a backend service to the pied platform.
   */
  registerBackendServer(backendServers: BackendServerDefinition[]) {
    this.symphonyPlatform.registerBackendServer(backendServers);
    return this;
  }

  /**
   * get the manifest of the platform.
   */
  getPlatformManifest() {
    return {
      name: this.symphonyPlatform.config.name,
      slogan: this.symphonyPlatform.config.slogan
    };
  }

  static dependencies = [SymphonyPlatformAspect];

  static defaultConfig: PrismPlatformConfig = {};

  static async provider(
    [symphonyPlatform]: [SymphonyPlatformNode],
    config: PrismPlatformConfig
  ) {
    const prismPlatform = new PrismPlatformNode(config, symphonyPlatform);
    const gqlSchema = prismPlatformGqlSchema(prismPlatform);

    /**
     * register the graohql backend server.
     */
    symphonyPlatform.registerBackendServer([
      {
        routes: [],
        gql: gqlSchema,
      },
    ]);

    return prismPlatform;
  }
}

export default PrismPlatformNode;
