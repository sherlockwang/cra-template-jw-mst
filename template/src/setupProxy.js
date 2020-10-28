/* eslint-disable */
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://link.to.api.com',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    })
  )
}
