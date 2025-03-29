import { ComponentType } from 'react';
import type { HeaderLink } from '@pied/pied-piper.layout.header';
import type { SlotRegistry } from '@bitdev/harmony.harmony';

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
