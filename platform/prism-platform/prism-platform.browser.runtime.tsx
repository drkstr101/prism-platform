import { SymphonyPlatformAspect, type SymphonyPlatformBrowser, type TopLevelComponent, type TopLevelSlot } from '@bitdev/symphony.symphony-platform';
import { Header, type HeaderLink } from '@pied/pied-piper.layout.header';
import type { Route } from '@bitdev/symphony.frontends.route';
import { Dashboard, Panel } from '@prism/platform.ui.dashboard';
import { PiedTheme } from '@pied/design.pied-theme';
import type { PrismPlatformConfig } from './prism-platform-config.js';
import { PanelSlot } from './panel.js';
import { WelcomeCard } from './welcome-card.js';
import { HeaderAction, HeaderActionSlot, HeaderLinkSlot } from './header.js';

export class PrismPlatformBrowser {
  constructor(
    private config: PrismPlatformConfig,
    private panelSlot: PanelSlot,
    private symphonyPlatform: SymphonyPlatformBrowser,
    private headerActionsSlot: HeaderActionSlot,
    private headerLinksSlot: HeaderLinkSlot,
    private topLevelComponentsSlot: TopLevelSlot
  ) {}

  /**
   * register a panel to the platform.
   */
  registerPanel(panels: Panel[]) {
    this.panelSlot.register(panels);
    return this;
  }

  /**
   * list the panels in the platform.
   */
  listPanels() {
    return this.panelSlot.flatValues();
  }

  /**
   * register new routes to the platform.
   */
  registerRoute(routes: Route[]) {
    this.symphonyPlatform.registerRoute(routes);
    return this;
  }

  /**
   * list the root routes of the platform.
   */
  listRoutes(): Route[] {
    return this.symphonyPlatform.listRoutes();
  }

  /**
   * register header links
   */
  registerHeaderLinks(headerLinks: HeaderLink[]) {
    this.headerLinksSlot.register(headerLinks);
    return this;
  }

  /**
   * list header links.
   */
  listHeaderItems(): HeaderLink[] {
    return this.headerLinksSlot.flatValues();
  }

  /**
   * register header actions.
   */
  registerHeaderActions(headerActions: HeaderAction[]) {
    this.headerActionsSlot.register(headerActions);
    return this;
  }

  /**
   * list header actions.
   */
  listHeaderActions() {
    this.symphonyPlatform.composeTopLevelComponent()
    return this.headerActionsSlot.flatValues();
  }

  /**
   * register components to wrap the enture 
   * platform component tree.
   */
  registerTopLevelComponents(topLevel: TopLevelComponent) {
    this.topLevelComponentsSlot.register(topLevel);
    return this;
  }

  /**
   * list all top level components.
   */
  listTopLevelComponents() {
    return this.topLevelComponentsSlot.values();
  }
  
  static dependencies = [SymphonyPlatformAspect];

  static defaultConfig: PrismPlatformConfig = {};

  static async provider(
    [symphonyPlatform]: [SymphonyPlatformBrowser],
    config: PrismPlatformConfig,
    [panelSlot, headerActions, headerLinks, topLevelComponentsSlot]: [PanelSlot, HeaderActionSlot, HeaderLinkSlot, TopLevelSlot]
  ) {
    const prismPlatform = new PrismPlatformBrowser(config, panelSlot, symphonyPlatform, headerActions, headerLinks, topLevelComponentsSlot);

    /**
     * register the app layout.
     */
    symphonyPlatform.registerLayoutEntry([
      {
        position: 'top',
        component: () => {
          const headerItems = prismPlatform.listHeaderItems();
          const actions = prismPlatform.listHeaderActions();
          const actionComponents = actions.map((action) => action.component);
          return (
            <Header 
              name={symphonyPlatform.config.name} 
              slogan={symphonyPlatform.config.slogan}
              logoImage={symphonyPlatform.config.logo}
              actions={actionComponents} 
              links={headerItems}
            />
          );
        }
      },
      // add entries to integrate to the left, right or bottom app layout.
      // {
      //   position: 'left',
      //   component: () => {
      //     const navItems = prismPlatform.listNavigationItems();
      //     return <div>Side navigation</div>;
      //   }
      // },
    ]);
  
    /**
     * register the platform routes.
     */
    prismPlatform.registerRoute([
      {
        path: '/',
        component: () => {
          const panels = prismPlatform.listPanels();
          return <Dashboard panels={panels} />;
        }
      }
    ]);

    prismPlatform.registerPanel([
      {
        component: () => {
          return <WelcomeCard />;
        }
      }
    ]);

    symphonyPlatform.registerPageNotFound(() => {
      return <>Page not found!</>;
    });

    symphonyPlatform.registerTopLevel({
      component: ({ children }) => {
        const topLevelComponents = prismPlatform.listTopLevelComponents();
        const TopLevelComposition = symphonyPlatform.composeTopLevelComponent(topLevelComponents);
        return <TopLevelComposition>{children}</TopLevelComposition>;
      }
    });

    symphonyPlatform.registerTheme((props) => {
      return <PiedTheme {...props} />;
    });

    return prismPlatform;
  }
}

export default PrismPlatformBrowser;
