import type { SlotRegistry } from '@bitdev/harmony.harmony';
import type { HeaderLink } from '@prism/platform.layout.header';
import { ComponentType } from 'react';

export type HeaderAction = {
  /**
   * name of the action.
   */
  name: string;

  /**
   * component type to render.
   */
  component?: ComponentType;
};

export type HeaderLinkSlot = SlotRegistry<HeaderLink[]>;
export type HeaderActionSlot = SlotRegistry<HeaderAction[]>;
