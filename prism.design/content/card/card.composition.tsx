import { MockProvider } from '@prism/platform.testing.mock-provider';
import { Card } from './card.js';

export const BasicCard = () => {
  return (
    <MockProvider>
      <Card>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry
      </Card>
    </MockProvider>
  );
};
