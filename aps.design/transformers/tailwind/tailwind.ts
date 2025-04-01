/* eslint-disable global-require, import/no-dynamic-require */
import { tailwindConfig } from '@aps/design.config.tailwind';
import type { Component } from '@teambit/component';
import type {
  WebpackConfigMutator,
  WebpackConfigTransformContext,
} from '@teambit/webpack';
import { glob } from 'glob';
import { readFileSync } from 'node:fs';
import path, { join } from 'node:path';
import tailwindcss, { type Config } from 'tailwindcss';

type TailwindOptions = {
  /**
   * apply the Tailwind CDN to the HTML template
   * @default false
   * @see https://tailwindcss.com/docs/installation/play-cdn
   */
  cdn?: boolean;
  /**
   * Custom Tailwind config
   * If a string is provided, it will be used as the path to the config file
   * @default tailwind.config.js
   */
  config?: Config | string;
  /**
   * path to your tailwind styles file, e.g. "@org/scope.component.name/my-styles.css".
   * the transformer will run require.resolve to resolve the path from the transformer itself
   */
  tailwindStylesCssFile?: string;
  /**
   * use `require` instead of `import` for the CSS file.
   * Use this option if the code of the components is generated as CommonJS.
   */
  commonjs?: boolean;
};

function getCss(importPath: string) {
  const pathToCss = require.resolve(importPath);
  return readFileSync(pathToCss, 'utf8');
}

function sanitizeConfig(config: Config | string): string {
  let usedConfig: Config;
  if (typeof config === 'string') {
    // eslint-disable-next-line
    usedConfig = require(config);
  } else {
    usedConfig = config;
  }

  return JSON.stringify(
    {
      ...usedConfig,
      content: undefined,
      plugins: undefined,
    },
    null,
    2
  );
}

/**
 * Webpack transformer for Tailwind CSS
 */
export function tailwindTransformer({
  cdn = true,
  config,
  tailwindStylesCssFile,
  commonjs,
}: TailwindOptions = {}) {
  const usedConfig = config || tailwindConfig;
  const styles = tailwindStylesCssFile
    ? getCss(tailwindStylesCssFile)
    : undefined;

  return (
    configMutator: WebpackConfigMutator,
    context: WebpackConfigTransformContext
  ) => {
    if (cdn) {
      configMutator.addElementToHtmlTemplate({
        parent: 'head',
        position: 'append',
        tag: 'script',
        attributes: {
          src: 'https://cdn.tailwindcss.com/',
        },
      });

      configMutator.addElementToHtmlTemplate({
        parent: 'head',
        position: 'append',
        tag: 'script',
        content: `tailwind.config = ${sanitizeConfig(usedConfig)}`,
      });

      if (styles)
        configMutator.addElementToHtmlTemplate({
          parent: 'head',
          position: 'append',
          tag: 'style',
          attributes: {
            type: 'text/tailwindcss',
          },
          content: styles,
        });
    }

    const parsedConfig =
      typeof usedConfig === 'string'
        ? (require(usedConfig) as Config)
        : usedConfig;

    if (tailwindStylesCssFile && !context.isEnvTemplate) {
      const capsulePath = path.resolve(
        join(context.target?.outputPath ?? process.cwd(), '..', '..')
      );

      const finalConfig = {
        config: {
          ...parsedConfig,
          content: [
            ...((parsedConfig.content as Array<string>) || []),
            ...(context.target?.components ?? ([] as Component[])).flatMap(
              (component) => {
                const componentPath =
                  // @ts-ignore - componentDirectoryMap is not available in all Bit versions (<1.8.100)
                  context.target.componentDirectoryMap?.[
                    component.id.toString()
                  ] ??
                  join(
                    capsulePath,
                    // org.scope_[name-replacing-slashes-with-underscore]@version
                    `${component.id.scope.replaceAll(
                      '/',
                      '.'
                    )}_${component.id.namespace.replaceAll('/', '_')}_${
                      component.id.name
                    }@${component.id.version}`
                  );

                const filesForComponent = glob.sync('./*.{js,jsx,ts,tsx}', {
                  cwd: componentPath,
                  absolute: true,
                });

                return filesForComponent;
              }
            ),
          ],
        },
      };

      configMutator.addPostCssPlugins([tailwindcss(finalConfig.config)]);

      configMutator.addModuleRule({
        test: /\.composition.(js|ts|tsx)$/,
        use: [
          {
            loader: path.resolve(__dirname, 'inject-css-loader.js'),
            options: {
              cssFile: tailwindStylesCssFile,
              commonjs: commonjs ?? false,
            },
          },
        ],
      });
    }

    return configMutator;
  };
}
