const { when, whenDev, whenProd, whenTest, ESLINT_MODES, POSTCSS_MODES } = require('@craco/craco')
const path = require('path')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
// eslint-disable-next-line
const smp = new SpeedMeasurePlugin()

module.exports = {
  reactScriptsVersion: 'react-scripts' /* (default value) */,
  style: {
    modules: {
      localIdentName: '',
    },
    css: {
      loaderOptions: (cssLoaderOptions, { env, paths }) => {
        /* Any css-loader configuration options: https://github.com/webpack-contrib/css-loader. */
        return cssLoaderOptions
      },
    },
    sass: {
      loaderOptions: (sassLoaderOptions, { env, paths }) => {
        /* Any sass-loader configuration options: https://github.com/webpack-contrib/sass-loader. */
        return sassLoaderOptions
      },
    },
    postcss: {
      mode: 'extends' /* (default value) */ || 'file',
      plugins: plugins =>
        [
          /* require('plugin-to-prepend') */
        ].concat(plugins), // Or you may use the function variant.
      env: {
        autoprefixer: {
          /* Any autoprefixer options: https://github.com/postcss/autoprefixer#options */
        },
        stage: 3 /* Any valid stages: https://cssdb.org/#staging-process. */,
        features: {
          /* Any CSS features: https://preset-env.cssdb.org/features. */
        },
      },
      loaderOptions: (postcssLoaderOptions, { env, paths }) => {
        /* Any postcss-loader configuration options: https://github.com/postcss/postcss-loader. */
        return postcssLoaderOptions
      },
    },
  },
  eslint: {
    enable: false /* (default value) */,
    mode: 'extends' /* (default value) */ || 'file',

    configure: (eslintConfig, { env, paths }) => {
      /* Any eslint configuration options: https://eslint.org/docs/user-guide/configuring */
      return eslintConfig
    },

    pluginOptions: (eslintOptions, { env, paths }) => {
      /* Any eslint plugin configuration options: https://github.com/webpack-contrib/eslint-webpack-plugin#options. */

      return eslintOptions
    },
  },
  babel: {
    presets: [],
    plugins: [],
    loaderOptions: (babelLoaderOptions, { env, paths }) => {
      /* Any babel-loader configuration options: https://github.com/babel/babel-loader. */
      babelLoaderOptions.babelrc = true

      return babelLoaderOptions
    },
  },
  typescript: {
    enableTypeChecking: false /* (default value)  */,
  },
  webpack: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
    plugins: {
      add: [
        new ProgressBarPlugin({
          format: `build [:bar] [:percent] (:elapsed seconds)`,
          clear: false,
        }),
        ...whenProd(
          () => [
            new BundleAnalyzerPlugin({
              analyzerMode: 'static',
              reportFilename: 'report.html',
            }),
          ],
          []
        ),
      ] /* An array of plugins */,
      remove:
        [] /* An array of plugin constructor's names (i.e. "StyleLintPlugin", "ESLintWebpackPlugin" ) */,
    },
    configure: (webpackConfig, { env, paths }) => {
      /* Any webpack configuration options: https://webpack.js.org/configuration */
      if (env === 'production') {
        smp.wrap(webpackConfig)
      }

      return webpackConfig
    },
  },
  jest: {
    babel: {
      addPresets: true /* (default value) */,
      addPlugins: true /* (default value) */,
    },

    configure: (jestConfig, { env, paths, resolve, rootDir }) => {
      /* Any Jest configuration options: https://jestjs.io/docs/en/configuration. */

      return jestConfig
    },
  },
  devServer: (devServerConfig, { env, paths, proxy, allowedHost }) => {
    devServerConfig.quiet = false

    return devServerConfig
  },
  plugins: [
    {
      plugin: {
        overrideCracoConfig: ({ cracoConfig, pluginOptions, context: { env, paths } }) => {
          return cracoConfig
        },
        overrideWebpackConfig: ({
          webpackConfig,
          cracoConfig,
          pluginOptions,
          context: { env, paths },
        }) => {
          return webpackConfig
        },
        overrideDevServerConfig: ({
          devServerConfig,
          cracoConfig,
          pluginOptions,
          context: { env, paths, proxy, allowedHost },
        }) => {
          return devServerConfig
        },
        overrideJestConfig: ({
          jestConfig,
          cracoConfig,
          pluginOptions,
          context: { env, paths, resolve, rootDir },
        }) => {
          return jestConfig
        },
      },
      options: {},
    },
  ],
}
