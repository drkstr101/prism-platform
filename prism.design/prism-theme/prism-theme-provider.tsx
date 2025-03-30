import { createTheme } from '@bitdesign/sparks.sparks-theme';
import { PrismThemeSchema, prismThemeTokens } from './prism-theme-tokens.js';

/**
 * creating and declaring the prism-theme theme.
 * define the theme schema as a type variable for proper type completions.
 */
export const PrismThemeProvider = createTheme<PrismThemeSchema>({
  palette: {
    primary: {
      // choose your own color here to generate a color scheme!
      origin: '#048A1B',
    },
  },
  tokens: prismThemeTokens,
  // add the sparks tokens.
  includeSparksTokens: true,
});

/**
 * a react hook for contextual access to design token
 * from components.
 */
export const { useTheme } = PrismThemeProvider;
