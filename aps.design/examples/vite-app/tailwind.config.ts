import tailwindConfig from '@aps/design.config.tailwind';
import { Plugin } from '@aps/design.plugin';
import { defineConfig } from '@aps/design.utils.define-config';
import flowbite from 'flowbite-react/tailwind';
import type { Config } from 'tailwindcss';

const bitPlugin = new Plugin({
  components: ['@aps/design.examples.button'],
  content: ['./**/*.{js,jsx,ts,tsx,mdx}'],
  cwd: __dirname,
  debug: true,
});

const config = defineConfig({
  extends: [tailwindConfig],
  content: [flowbite.content()],
  theme: {
    extend: {},
  },
  plugins: [flowbite.plugin(), bitPlugin.apply()],
}) as Config;

console.log('Tailwind config', JSON.stringify(config.content, null, 2));

export default config;
