import { SlotRegistry } from "@bitdev/harmony.harmony";

export type MenuListItem = {
  /**
   * name of the list item.
   */
  name: string;

  /**
   * link of the item.
   */
  href: string;
}

export type MenuListItemSlot = SlotRegistry<MenuListItem[]>;
