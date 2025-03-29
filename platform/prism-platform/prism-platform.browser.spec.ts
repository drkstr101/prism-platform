import { loadAspect } from '@bitdev/harmony.testing.load-aspect';
import type { PrismPlatformBrowser } from './prism-platform.browser.runtime.js';
import { PrismPlatformAspect } from './prism-platform.aspect.js';

it('should retrieve the aspect', async () => {
  const prismPlatform = await loadAspect<PrismPlatformBrowser>(PrismPlatformAspect, {
    runtime: 'browser',
  });

  expect(prismPlatform).toBeTruthy();
});    
