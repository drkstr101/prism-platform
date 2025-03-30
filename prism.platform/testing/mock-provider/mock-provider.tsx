import { MockedProvider } from '@apollo/client/testing/index.js';
import { PrismTheme } from '@prism/design.prism-theme';
import type { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { EmptyContainer } from './empty-container.js';
import { MockContext } from './mock-provider-context.js';

export type MockProviderProps = {
  /**
   * sets the component children.
   */
  children?: ReactNode;

  /**
   * do not use the memory router.
   */
  noRouter?: boolean;

  /**
   * do not use the theme.
   */
  noTheme?: boolean;
};

/**
 * a mock provider for testing and previewing components
 * in the Acme platform.
 */
export function MockProvider({
  children,
  noRouter,
  noTheme,
}: MockProviderProps) {
  const Theme = noTheme ? EmptyContainer : PrismTheme;
  const Router = noRouter ? EmptyContainer : MemoryRouter;

  return (
    <MockContext.Provider value>
      <Router>
        <Theme>
          <MockedProvider addTypename={false} showWarnings={false}>
            {children}
          </MockedProvider>
        </Theme>
      </Router>
    </MockContext.Provider>
  );
}
