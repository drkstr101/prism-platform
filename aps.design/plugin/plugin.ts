import type {
  RequiredConfig,
  OptionalConfig,
  Config,
} from 'tailwindcss/types/config.js';
import plugin from 'tailwindcss/plugin';
import { jsonc } from 'jsonc';
import { globSync } from 'glob';
import { minimatch } from 'minimatch';
import path from 'node:path';
import fs from 'node:fs';

/**
 * Tailwind configuration with Bit's plugin
 * Remove 'content' from your tailwind.config.js file to be able to use Bit's Tailwind plugin.
 */
export type TWConfig = Omit<RequiredConfig, 'content'> &
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

interface Component {
  name: string;
  scope: string | '';
  defaultScope?: string;
  version: string;
  mainFile: string;
  rootDir: string;
}

interface BitMap<T = Component> {
  [key: string]: T;
}

type WithPackage<T> = T & { package: string };

interface PluginOptions {
  components: string[];
  content: string[];
  cwd: string;
  debug?: boolean;
}

export class Plugin {
  private bitMap: BitMap<WithPackage<Component>> = {};

  private wsRoot: string | false = false;

  private capsuleRoot: string | false = false;

  constructor(readonly options: PluginOptions) {}

  private log(message: string, ...args: any[]) {
    if (this.options.debug) {
      // eslint-disable-next-line no-console
      console.log(message, ...args);
    }
  }

  merge(config: Config) {
    const content = this.getContent();

    return {
      ...config,
      content: [...(config.content as string[]), ...content],
    };
  }

  apply() {
    const content = this.getContent();
    this.log('Content:', content);
    return plugin(function BitPlugin() {}, { content });
  }

  private getContent() {
    const root = this.findWSRoot();
    let isWsRoot = false;
    if (!root) {
      this.log('No workspace root found');
      isWsRoot = false;
      this.capsuleRoot = this.findCapsuleRoot(this.options.cwd);

      this.log('Capsule root found:', this.capsuleRoot);
    } else {
      this.log('Workspace root found:', root);
      isWsRoot = true;
      this.wsRoot = root;

      const map = this.parseBitMap(root);

      this.bitMap = Object.entries(map).reduce((acc, [key, value]) => {
        const pkg = this.componentToPackage(value);
        return Object.assign(acc, { [key]: { ...value, package: pkg } });
      }, {});
    }

    const notLocallyAvailable: string[] = [];

    const localComponentsPaths = this.options.components.flatMap(
      (componentPattern) => {
        const matchingComponents = Object.values(this.bitMap || {}).filter(
          (c) => minimatch(c.package, componentPattern)
        );

        if (matchingComponents.length === 0) {
          this.log(
            `No components matching pattern ${componentPattern} found in the workspace, searching in node_modules`
          );
          notLocallyAvailable.push(componentPattern);
          return [];
        }

        return matchingComponents.map((component) => {
          const normalizedPath = path.normalize(
            path.join(this.wsRoot as string, component.rootDir)
          );

          this.log(`Component ${component.package} found at ${normalizedPath}`);

          return `${normalizedPath}${path.sep}**${path.sep}*.{js,jsx,ts,tsx}`;
        });
      }
    );

    const nmComponentsPaths = notLocallyAvailable.flatMap(
      (componentPattern) => {
        let componentGlobPattern = '**/*.{js,jsx,ts,tsx}';

        if (!componentPattern.endsWith('/')) {
          componentGlobPattern = `/${componentGlobPattern}`;
        }

        let nmPath = '';

        if (isWsRoot) {
          nmPath = path.join(
            this.wsRoot as string,
            'node_modules',
            componentPattern,
            componentGlobPattern
          );
        } else if (this.capsuleRoot) {
          nmPath = path.join(
            this.capsuleRoot as string,
            '**',
            'node_modules',
            componentPattern,
            componentGlobPattern
          );
        } else {
          nmPath = path.join(
            this.findPackageRoot(this.options.cwd) as string,
            'node_modules',
            componentPattern,
            componentGlobPattern
          );
        }

        // Normalize path separators
        nmPath = path.resolve(nmPath).replaceAll('\\', '/');

        this.log(`Searching for components in node_modules at ${nmPath}`);

        const res = globSync(nmPath, {
          absolute: true,
        });

        this.log(
          `List of components found in node_modules for ${componentPattern}:`,
          res
        );

        return res.length > 0 ? res : [nmPath];
      }
    );

    const contentPaths = globSync(this.options.content, {
      absolute: true,
      cwd: this.options.cwd,
      ignore: ['**/node_modules/**'],
    });

    const content = [
      ...contentPaths,
      ...localComponentsPaths,
      ...nmComponentsPaths,
    ];

    return content;
  }

  private findWSRoot() {
    let currentDir = this.options.cwd;

    // Continue climbing up the directory tree until the root is reached
    while (currentDir) {
      // Check if '.bitmap' file exists in the current directory
      if (fs.existsSync(path.join(currentDir, '.bitmap'))) {
        return currentDir;
      }

      // Move to the parent directory
      const parentDir = path.dirname(currentDir);
      if (parentDir === currentDir) {
        break; // Stop if the root directory has been reached
      }
      currentDir = parentDir;
    }

    // Return false if '.bitmap' was not found
    return false;
  }

  /**
   * Finds the `pnpm-lock.yaml` file closest to the app root in the capsule (up the directory tree)
   * @param app_root path to the app root in the capsule
   */
  private findCapsuleRoot(app_root: string) {
    let currentDir = app_root;

    // Continue climbing up the directory tree until the root is reached
    while (currentDir) {
      // Check if 'pnpm-lock.yaml' file exists in the current directory
      if (fs.existsSync(path.join(currentDir, 'pnpm-lock.yaml'))) {
        return currentDir;
      }

      // Move to the parent directory
      const parentDir = path.dirname(currentDir);
      if (parentDir === currentDir) {
        break; // Stop if the root directory has been reached
      }
      currentDir = parentDir;
    }

    // Return false if 'pnpm-lock.yaml' was not found
    return false;
  }

  private findPackageRoot(packagePath: string) {
    let currentDir = packagePath;

    // Continue climbing up the directory tree until the root is reached
    while (currentDir) {
      // Check if 'package.json' file exists in the current directory
      if (fs.existsSync(path.join(currentDir, 'package.json'))) {
        return currentDir;
      }

      // Move to the parent directory
      const parentDir = path.dirname(currentDir);
      if (parentDir === currentDir) {
        break; // Stop if the root directory has been reached
      }
      currentDir = parentDir;
    }

    // Return false if 'package.json' was not found
    return false;
  }

  private parseBitMap(wsRoot: string): BitMap {
    const bitMapPath = path.join(wsRoot, '.bitmap');
    const bitMap = jsonc.parse(fs.readFileSync(bitMapPath, 'utf-8'));
    return bitMap;
  }

  /**
   * Convert a component to a package name
   * @param component
   * @example
   * bitdesign.storybook/examples/storybook -> @bitdesign/storybook.examples.storybook
   * teambit.sample/scope/component -> @teambit/sample.scope.component
   */
  private componentToPackage(component: Component): string {
    if (!component.name) {
      return '';
    }
    const hasScope = component.scope !== '';
    const scope = hasScope
      ? component.scope
      : (component.defaultScope as string);
    const scopeHasOrg = scope.includes('.');
    const separator = !scopeHasOrg ? '/' : '.';
    const packageName = `${scope.replaceAll(
      '.',
      '/'
    )}${separator}${component.name.replaceAll('/', '.')}`;
    return `@${packageName}`;
  }
}
