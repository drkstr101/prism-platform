import { globSync } from 'glob';
import type {
  RequiredConfig,
  OptionalConfig,
  Config as TailwindConfig,
} from 'tailwindcss/types/config';

function mergeArray<T>(a: T[], b: T[]): T[] {
  return [...new Set([...a, ...b])];
}

function extendConfigs(
  baseConfig: BaseConfig,
  extensions: (string | TWBitConfig)[],
  hasBitPlugin = false
): TailwindConfig {
  const configs = extensions.map((config) =>
    // eslint-disable-next-line
    typeof config === 'string' ? require(config).default : config
  );

  const extendedConfig = configs.reduce((acc, config) => {
    return {
      ...acc,
      ...config,
      content: mergeArray(acc.content ?? [], config.content ?? []),
    };
  }, baseConfig);

  if (hasBitPlugin && extendedConfig.plugins) {
    const bitPlugin = extendedConfig.plugins.find(
      (plugin: { handler: { name: string } }) => {
        return plugin.handler && plugin.handler.name === 'BitPlugin';
      }
    );

    if (bitPlugin) {
      extendedConfig.content = mergeArray(
        extendedConfig.content ?? [],
        bitPlugin.config?.content ?? []
      );

      bitPlugin.config = {
        ...bitPlugin.config,
        content: [],
      };
    }
  }

  return extendedConfig;
}

type TWBitConfig = Omit<RequiredConfig, 'content'> &
  Partial<
    Pick<
      OptionalConfig,
      | 'important'
      | 'prefix'
      | 'separator'
      | 'safelist'
      | 'blocklist'
      | 'presets'
      | 'future'
      | 'experimental'
      | 'darkMode'
      | 'theme'
      | 'corePlugins'
      | 'plugins'
    >
  >;

export type BaseConfig = TWBitConfig & {
  content?: string[];
  extends?: (string | TWBitConfig)[];
};

export const defineConfig = (
  config: BaseConfig,
  extensions?: string[]
): TailwindConfig => {
  // Get the TSX and JSX files from the project without using the built-in glob matcher of tailwind
  // to reduce the number of files Tailwind will try to scan
  const content = globSync(['**/*.{js,jsx,ts,tsx}', ...(extensions ?? [])], {
    ignore: ['**/node_modules/**'],
    cwd: process.cwd(),
  });

  // Check if there is any plugin that has a handler function called 'BitPlugin'
  // eslint-disable-next-line
  const bitPlugin = config.plugins?.find((plugin) => {
    // @ts-ignore
    if ('handler' in plugin) {
      return plugin.handler.name === 'BitPlugin';
    }
  });

  if (bitPlugin && 'config' in bitPlugin && bitPlugin?.config?.content) {
    content.push(...(bitPlugin?.config?.content as string[]));
  }

  const finalConfig = extendConfigs(
    { ...config, content: mergeArray(content, config.content ?? []) },
    config.extends ?? []
  );

  // For debug - see the final config
  // console.log(finalConfig);

  return finalConfig;
};
