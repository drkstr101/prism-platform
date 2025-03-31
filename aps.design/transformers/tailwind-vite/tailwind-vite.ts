import type { Context } from '@aps/design.utils.get-tailwind-content';
import type { ViteConfigTransformer } from '@teambit/vite.vite-utils';
import type { InlineConfig } from 'vite';

import { getTailwindContent } from '@aps/design.utils.get-tailwind-content';
import tailwindcss from 'tailwindcss';

export type { ViteConfigTransformer } from '@teambit/vite.vite-utils';

export function getViteTransformer(
  contentModuleList?: string[],
  theme?: any,
  plugins?: any[]
): ViteConfigTransformer {
  return async function viteTransformer(
    config: InlineConfig,
    vite: typeof import('vite'),
    context: Context
  ): Promise<InlineConfig> {
    return vite.mergeConfig(config, {
      css: {
        postcss: {
          plugins: [
            tailwindcss({
              content: await getTailwindContent(
                context,
                contentModuleList || []
              ),
              theme,
              plugins,
            }),
          ],
        },
      },
    });
  };
}
