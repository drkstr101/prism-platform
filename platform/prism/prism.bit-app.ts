import { HarmonyPlatform } from '@bitdev/harmony.harmony-platform';
import { BrowserRuntime } from '@bitdev/harmony.runtimes.browser-runtime';
import { NodeJSRuntime } from '@bitdev/harmony.runtimes.nodejs-runtime';
import { KubernetesAspect } from '@bitdev/symphony.deployers.kubernetes';
import { SymphonyPlatformAspect } from '@bitdev/symphony.symphony-platform';
import { PeopleAspect } from '@prism/people.people';
import { PrismPlatformAspect } from '@prism/platform.prism-platform';

/**
 * compose the prism platform.
 */
export const Prism = HarmonyPlatform.from({
  name: 'prism',
  platform: [
    SymphonyPlatformAspect,
    {
      name: 'Prism',
      slogan: 'Cloud',
      domain: 'prism.teambit.games',
      logo: 'https://www.aps.org/_ipx/w_640/https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fi2z87pbo%2Fproduction%2Fb461fd045ddb6246e387fd4c0601120798023272-241x70.svg',
    },
  ],

  runtimes: [new BrowserRuntime(), new NodeJSRuntime()],

  aspects: [
    // feature to compose into the platofrm.
    PeopleAspect,
    PrismPlatformAspect,

    // To deploy the platform on a Kubernetes cluster, use the official Kubernetes deployer
    // for Harmony. @see https://bit.cloud/bitdev/symphony/deployers/kubernetes
    [
      KubernetesAspect,
      {
        /**
         * kubernetes auth
         */
        auth: {
          basic: {
            /**
             * certificate
             */
            certificate: process.env.KUBE_CERTIFICATE_AUTHORITY_DATA,

            /**
             * server
             */
            server: process.env.KUBE_SERVER,

            /**
             * token
             */
            token: process.env.KUBE_USER_TOKEN,
          },
        },

        /**
         * docker config for creating and pushing
         * images from the build pipeline.
         */
        docker: {
          /**
           * prefix to use for docker images.
           */
          imagePrefix: 'piedpiperapp',

          /**
           * docker auth
           */
          auth: {
            username: process.env.DOCKERHUB_USERNAME,
            password: process.env.DOCKERHUB_TOKEN,
          },
        },
      },
    ],
  ],
});

export default Prism;
