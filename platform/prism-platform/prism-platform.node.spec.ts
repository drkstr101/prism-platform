import { loadAspect } from '@bitdev/harmony.testing.load-aspect';
import type { PrismPlatformNode } from './prism-platform.node.runtime.js';
import { PrismPlatformAspect } from './prism-platform.aspect.js';

it('should retrieve the aspect', async () => {
  const prismPlatform = await loadAspect<PrismPlatformNode>(PrismPlatformAspect, {
    runtime: 'node',
  });

  expect(prismPlatform).toBeTruthy();
});    
