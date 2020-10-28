const {
  override,
  addDecoratorsLegacy,
  disableEsLint,
  addWebpackAlias,
  useBabelRc,
  addWebpackPlugin,
  overrideDevServer,
} = require('customize-cra')
const path = require('path')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')

const smp = new SpeedMeasurePlugin()
const useSmp = () => config => smp.wrap(config)

const devServerConfigCustomize = () => config => {
  return {
    ...config,
    quiet: false,
  }
}

module.exports = {
  webpack: override(
    // enable legacy decorators babel plugin
    addDecoratorsLegacy(),

    // babel related
    useBabelRc(),

    // eslint custom
    disableEsLint(),

    // add an alias for "~" as src root for imports
    addWebpackAlias({
      '~': path.resolve(__dirname, 'src'),
    }),
    addWebpackPlugin(
      new ProgressBarPlugin({
        format: `build [:bar] [:percent] (:elapsed seconds)`,
        clear: false,
      })
    )

    /** preformance analysis */
    // use for measure packaging speed
    // useSmp()
    // add webpack bundle visualizer if BUNDLE_VISUALIZE flag is enabled
    // process.env.BUNDLE_VISUALIZE == 1 && addBundleVisualizer(),
  ),
  devServer: overrideDevServer(devServerConfigCustomize()),
}
