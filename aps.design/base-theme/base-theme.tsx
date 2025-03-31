import cn from 'clsx';
import { ReactNode } from 'react';
import { BaseThemeProvider } from './base-theme-provider.js';
import styles from './base-theme.module.scss';

export type BaseThemeProps = {
  /**
   * a root ReactNode for the component tree
   * applied with the theme.
   */
  children?: ReactNode;
  /**
   * inject a class name to override to the theme.
   * this allows people to affect your theme. remove to avoid.
   */
  className?: string;
};

/**
 * a theme for the Acme organization.
 * it provides tokens, fonts and general styling for all components.
 */
export function BaseTheme({ children, className, ...rest }: BaseThemeProps) {
  return (
    <BaseThemeProvider.ThemeProvider
      {...rest}
      className={cn(styles.baseTheme, className)}
    >
      {children}
    </BaseThemeProvider.ThemeProvider>
  );
}
