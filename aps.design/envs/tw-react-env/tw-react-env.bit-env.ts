import { tailwindConfig } from '@aps/design.config.tailwind';
import { TailwindWorkspaceStarter } from '@aps/design.generators.tailwind-starter';
import { tailwindTransformer } from '@aps/design.transformers.tailwind';
import { ReactEnv } from '@bitdev/react.react-env';
import type { EnvContext, EnvHandler } from '@teambit/envs';
import { StarterList } from '@teambit/generator';
import type { Preview } from '@teambit/preview';
import { ReactPreview } from '@teambit/preview.react-preview';
import { NativeCompileCache } from '@teambit/toolbox.performance.v8-cache';
import { createRequire } from 'node:module';

// Disable v8-caching because it breaks ESM loaders
NativeCompileCache.uninstall();

const cjsRequire = createRequire(import.meta.url);

export class TwReactEnv extends ReactEnv {
  name = 'react';

  icon = 'https://static.bit.dev/extensions-icons/react.svg';

  preview(): EnvHandler<Preview> {
    return ReactPreview.from({
      mounter: this.previewMounter,
      transformers: [
        tailwindTransformer({
          config: tailwindConfig,
          cdn: true,
          tailwindStylesCssFile: cjsRequire.resolve(
            '@aps/design.config.tailwind/dist/globals.tailwind.css'
          ),
        }),
      ],
    });
  }

  starters(): (context: EnvContext) => StarterList {
    return StarterList.from([TailwindWorkspaceStarter.from()]);
  }

  protected previewMounter = cjsRequire.resolve('./preview/mounter.js');
}

export default new TwReactEnv();
