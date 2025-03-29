import type { ReactNode } from 'react';
import { Heading } from '@bitdesign/sparks.typography.heading';
import { Flex } from '@bitdesign/sparks.layout.flex';
import { Panel } from './panel.js';
import styles from './dashboard.module.scss';

export type DashboardProps = {
  /**
   * sets the component children.
   */
  children?: ReactNode;
  
  /**
   * panels to render in the dashboard
   */
  panels?: Panel[];
};

export function Dashboard({ children, panels }: DashboardProps) {
  const categories = panels.map((panel) => {
    return panel.category;
  });

  return (
    <Flex className={styles.dashboard} direction='column' alignItems='start'>
      {categories.map((category, categoryKey) => {
        const categoryPanels = panels.filter((panel) => panel.category === category);
        return (
          <Flex key={categoryKey} direction='column' alignItems='start'>
            {category ? <Heading>{category}</Heading> : <></>}
            <Flex>
              {categoryPanels.map((panel, key) => {
                const PanelComponent = panel.component;
                return <PanelComponent key={key} />;
              })}
            </Flex>
          </Flex>
        );
      })}
      {children}
    </Flex>
  );
}
