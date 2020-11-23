const path = require('path')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
// eslint-disable-next-line
const smp = new SpeedMeasurePlugin()

const getBabelLoader = (config, isOutsideOfApp) => {
  let babelLoaderFilter
  if (isOutsideOfApp) {
    babelLoaderFilter = rule => rule.loader && rule.loader.includes('babel') && rule.exclude
  } else {
    babelLoaderFilter = rule => rule.loader && rule.loader.includes('babel') && rule.include
  }

  // First, try to find the babel loader inside the oneOf array.
  // This is where we can find it when working with react-scripts@2.0.3.
  let loaders = config.module.rules.find(rule => Array.isArray(rule.oneOf)).oneOf

  let babelLoader = loaders.find(babelLoaderFilter)

  // If the loader was not found, try to find it inside of the "use" array, within the rules.
  // This should work when dealing with react-scripts@2.0.0.next.* versions.
  if (!babelLoader) {
    loaders = loaders.reduce((ldrs, rule) => ldrs.concat(rule.use || []), [])
    babelLoader = loaders.find(babelLoaderFilter)
  }
  return babelLoader
}

module.exports = {
  // eslint-disable-next-line
  webpack: (config, env) => {
    /**
     * use babelrc
     */
    getBabelLoader(config).options.babelrc = true

    /**
     * add webpack alias
     */
    const alias = {
      '~': path.resolve(__dirname, 'src'),
    }
    if (!config.resolve) {
      // eslint-disable-next-line
      config.resolve = {}
    }
    if (!config.resolve.alias) {
      // eslint-disable-next-line
      config.resolve.alias = {}
    }
    Object.assign(config.resolve.alias, alias)

    /**
     * remove webpack plugins
     */
    // remove eslint plugin for dev
    config.plugins.splice(config.plugins.length - 1, 1)

    /**
     * add webpack plugins
     */
    config.plugins.push(
      new ProgressBarPlugin({
        format: `build [:bar] [:percent] (:elapsed seconds)`,
        clear: false,
      })
    )

    /** preformance analysis */
    // add webpack bundle visualizer if BUNDLE_VISUALIZE flag is enabled
    if (process.env.BUNDLE_VISUALIZE) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: 'report.html',
        })
      )
    }

    // can be used for analysis but will cause %PUBLIC_URL% in index.html fail to compile
    // if (env === 'production') {
    //   return smp.wrap(config)
    // }

    return config
  },
  /**
   * dev server config
   */
  devServer: configFunction => {
    return (proxy, allowedHost) => {
      const config = configFunction(proxy, allowedHost)

      return {
        ...config,
        quiet: false,
      }
    }
  },
}
