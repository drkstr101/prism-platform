import { createTheme } from '@bitdesign/sparks.sparks-theme';
import { BaseThemeSchema, baseThemeTokens } from './base-theme-tokens.js';

/**
 * creating and declaring the base-theme theme.
 * define the theme schema as a type variable for proper type completions.
 */
export const BaseThemeProvider = createTheme<BaseThemeSchema>({
  palette: {
    primary: {
      // choose your own color here to generate a color scheme!
      origin: '#048A1B',
    },
  },
  tokens: baseThemeTokens,
  // add the sparks tokens.
  includeSparksTokens: true,
});

/**
 * a react hook for contextual access to design token
 * from components.
 */
export const { useTheme } = BaseThemeProvider;
