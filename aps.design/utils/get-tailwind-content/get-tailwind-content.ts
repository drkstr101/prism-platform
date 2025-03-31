import type { DevServerContext, BundlerContext } from '@teambit/bundler';
import type { Workspace } from '@teambit/workspace';

import { globSync } from 'glob';

export type Context =
  | {
      mode: 'development';
      devServerContext: DevServerContext;
      devServerAspectsContext: {
        workspace: Workspace;
      };
    }
  | {
      mode: 'production';
      bundlerContext: BundlerContext;
    };

// https://bit.cloud/teambit/vite/vite-utils/~code/get-watch-list.ts
async function getPackageNameListFromWorkspace(
  workspace: Workspace,
  relatedContexts: string[]
): Promise<string[]> {
  const envList = new Set(relatedContexts);
  const envMain = workspace.envs;
  const components = await workspace.list();
  const packageNameList = components
    .filter((c) => {
      const env = envMain.getEnvId(c);
      return envList.has(env);
    })
    .map((c) => workspace.componentPackageName(c))
    .filter(Boolean);
  return packageNameList;
}

export async function getTailwindContent(
  context: Context,
  contentModuleList: string[]
): Promise<string[]> {
  if (context.mode === 'development') {
    const {
      devServerContext: { relatedContexts },
      devServerAspectsContext: { workspace },
    } = context;

    // all of those content is filtered from node_modules,
    // including the target packages and its dependencies
    const filter = [
      ...contentModuleList,
      ...(await getPackageNameListFromWorkspace(workspace, relatedContexts)),
    ].map((dir) => `${workspace.path}/node_modules/**/${dir}/**.{vue,html}`);

    const content = globSync(filter);

    return content;
  }

  if (context.mode === 'production') {
    const componentDirList =
      context.bundlerContext.capsuleNetwork.originalSeedersCapsules.map(
        (c) => c.path
      );

    // content in source code
    const content = globSync(
      componentDirList.map((dir) => `${dir}/**/*.{vue,html}`),
      {
        ignore: ['**/node_modules/**'],
      }
    );

    // content in deps
    componentDirList.forEach((root) => {
      const depsContent = globSync(
        contentModuleList.map(
          (dir) => `${root}/node_modules/**/${dir}/**.{vue,html}`
        )
      );
      content.push(...depsContent);
    });

    return content;
  }

  return [];
}
