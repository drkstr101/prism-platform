import { Plugin } from './plugin';

describe('Plugin', () => {
  test('merge', () => {
    const plugin = new Plugin({
      components: [],
      content: [],
      cwd: __dirname,
    });

    const config = plugin.merge({
      content: ['./src/**/*.html'],
      theme: {
        extend: {
          colors: {
            primary: '#333',
          },
        },
      },
    });

    expect(config).toEqual({
      content: ['./src/**/*.html'],
      theme: {
        extend: {
          colors: {
            primary: '#333',
          },
        },
      },
    });
  });

  test('apply', () => {
    const plugin = new Plugin({
      components: ['@myorg/my-scope.my-component'],
      content: [],
      cwd: __dirname,
    });

    const config = {
      plugins: [plugin.apply()],
    };

    expect((config.plugins[0].config?.content as any).length ?? 0).toBe(1);
  });
});
