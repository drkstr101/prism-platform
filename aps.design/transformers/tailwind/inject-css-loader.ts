import { LoaderDefinitionFunction } from 'webpack';

interface LoaderOptions {
  cssFile: string;
  commonjs: boolean;
}

const customCssInjectorLoader: LoaderDefinitionFunction<LoaderOptions> =
  function (source) {
    const options = this.getOptions();
    const { cssFile, commonjs } = options;

    // Prepend the import statement for the CSS file
    if (!commonjs) {
      return `import '${cssFile}';\n${source}`;
    }

    return `require('${cssFile}');\n${source}`;
  };

export default customCssInjectorLoader;
