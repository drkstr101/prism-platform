import { ComponentType} from 'react';

export type Panel = {
  /**
   * component to render.
   */
  component: ComponentType,

  /**
   * category of the panel.
   */
  category?: string;
};
