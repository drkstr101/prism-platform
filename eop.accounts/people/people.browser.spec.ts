import { loadAspect } from '@bitdev/harmony.testing.load-aspect';
import { PeopleAspect } from './people.aspect.js';
import type { PeopleBrowser } from './people.browser.runtime.js';

it('should do something', async () => {
  const people = await loadAspect<PeopleBrowser>(PeopleAspect, {
    runtime: 'browser',
  });

  const menuItems = people.listMenuItems();
  expect(menuItems.length).toEqual(0);
});
