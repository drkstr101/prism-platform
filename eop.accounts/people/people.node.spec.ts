import { loadAspect } from '@bitdev/harmony.testing.load-aspect';
import { PeopleAspect } from './people.aspect.js';
import type { PeopleNode } from './people.node.runtime.js';

it('should do something', async () => {
  const peopleNode = await loadAspect<PeopleNode>(PeopleAspect, {
    runtime: 'node',
  });

  expect(peopleNode).toBeTruthy();
});
