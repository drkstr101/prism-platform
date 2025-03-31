/* eslint-disable global-require */
import { defineConfig } from '@aps/design.utils.define-config';
import type { Config } from 'tailwindcss';

export const tailwindConfig = defineConfig({
  theme: {
    extend: {
      colors: {
        primary: '#ff00ff',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}) as Config;
