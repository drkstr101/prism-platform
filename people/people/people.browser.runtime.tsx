import { Button } from '@bitdesign/sparks.actions.button';
import { AuthProvider } from '@pied/people.hooks.use-auth';
import { PeopleLobby } from '@prism/people.ui.people-lobby';
import type { PeopleConfig } from './people-config.js';
import { MenuListItem, MenuListItemSlot } from './menu-list-item.js';
import { SymphonyPlatformAspect, SymphonyPlatformBrowser } from '@bitdev/symphony.symphony-platform';
import { type HeaderBrowser, HeaderAspect } from '@bitdev/symphony.aspects.header';
import { PrismPlatformBrowser, PrismPlatformAspect } from '@prism/platform.prism-platform';
import { NewPeople } from './new-people.js';

export class PeopleBrowser {
  constructor(
    private config: PeopleConfig,
    private menuItemSlot: MenuListItemSlot
  ) {}
  
  /**
   * register a new menu item to the user bar.
   */
  registerMenuItem(menuItems: MenuListItem[]) {
    this.menuItemSlot.register(menuItems);
    return this;
  }

  /**
   * list all menu items.
   */
  listMenuItems() {
    return this.menuItemSlot.flatValues();
  }

  static dependencies = [SymphonyPlatformAspect, HeaderAspect, PrismPlatformAspect];

  static defaultConfig: PeopleConfig = {};

  static async provider(
    [symphonyPlatform, header, prismPlatform]: [SymphonyPlatformBrowser, HeaderBrowser|undefined, PrismPlatformBrowser],
    config: PeopleConfig,
    [menuItemSlot]: [MenuListItemSlot]
  ) {
    const people = new PeopleBrowser(config, menuItemSlot);
    prismPlatform.registerRoute([
      {
        path: 'people',
        component: () => {
          return <PeopleLobby />
        }
      },
    ]);

    prismPlatform?.registerHeaderActions([
      {
        name: 'user-bar',
        component: () => {
          // const menuItems = people.listMenuItems();
          return <Button href="/">Get started</Button>
        }
      }
    ]);

    prismPlatform?.registerPanel([
      {
        category: 'People',
        component: () => {
          return <NewPeople />;
        }
      }
    ]);

    prismPlatform?.registerHeaderLinks([
      {
        label: 'People',
        href: '/people',
      }
    ]);

    prismPlatform?.registerTopLevelComponents({
      component: ({ children }) => {
        return <AuthProvider>{children}</AuthProvider>;
      }
    });

    return people;
  }
}

export default PeopleBrowser;
