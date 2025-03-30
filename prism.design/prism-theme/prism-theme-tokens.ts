/**
 * PrismTheme tokens.
 * Include your custom tokens in this file (on top of the sparks tokens).
 */
export function prismThemeTokens() {
  const tokens = {
    /**
     * Background color. Use for primary surfaces across your design.
     */
    backgroundColor: '#ffffff',

    /**
     * Typography tokens
     */
    typography: {
      /**
       * Font family to use.
       */
      fontFamily: "'Inter', sans-serif",

      /**
       * Large sizes for display purposes.
       */
      display: {
        large: '48px',
        medium: '36px',
        small: '24px',
      },

      /**
       * Headline sizes.
       */
      headline: {
        large: '32px',
        medium: '24px',
        small: '18px',
      },

      /**
       * Subtitle sizes.
       */
      subtitle: {
        large: '16px',
        medium: '14px',
        small: '12px',
      },

      /**
       * Content body sizes.
       */
      body: {
        large: '16px',
        medium: '14px',
        small: '12px',
      },

      /**
       * Caption sizes.
       */
      captionSize: {
        large: '12px',
        medium: '10px',
      },
    },

    /**
     * Primary fill colors.
     */
    primaryColor: {
      /**
       * Default primary color.
       */
      default: '#007bff',

      /**
       * Primary color for hover surfaces.
       */
      hover: '#0056b3',
    },

    /**
     * Secondary fill colors.
     */
    secondaryColor: {
      /**
       * Default color for secondary fills.
       */
      default: '#6c757d',

      /**
       * Hover color for secondary fills.
       */
      hover: '#5a6268',
    },

    /**
     * Surface colors.
     */
    surfaceColor: {
      /**
       * Color for surfaces
       */
      default: '#f8f9fa',

      /**
       * Color for primary surfaces
       */
      primary: '#ffffff',
    },

    /**
     * Positive color
     */
    positiveColor: {
      default: '#28a745',
      subtle: '#d4edda',
    },

    /**
     * Negative color
     */
    negativeColor: {
      default: '#dc3545',
      subtle: '#f8d7da',
    },

    /**
     * Warning color
     */
    warningColor: {
      default: '#ffc107',
      subtle: '#fff3cd',
    },

    /**
     * Info color
     */
    infoColor: {
      default: '#17a2b8',
      subtle: '#d1ecf1',
    },

    /**
     * Default content color.
     */
    contentColor: {
      default: '#212529',
      inverse: '#ffffff',
      primary: '#007bff',
    },

    /**
     * Border tokens.
     */
    border: {
      color: '#ced4da',
      focusColor: '#80bdff',
      radiusSize: '4px',
    },

    /**
     * Spacing tokens.
     */
    spacing: {
      default: '8px',
      half: '4px',
      double: '16px',
      triple: '24px',
      x4: '4rem',
      x6: '6rem',
    },

    /**
     * Transition ease in.
     */
    transitionEaseIn: '0.3s ease-in',

    /**
     * Transition ease out.
     */
    transitionEaseOut: '0.3s ease-out',
  };

  return tokens;
}

// create a theme type schema to allow new theme to override
// or implement a different theme variation like dark theme.
// in case tokens are dynamically loaded from a json file, please declare this variable an an interface.
export type PrismThemeSchema = ReturnType<typeof prismThemeTokens>;
