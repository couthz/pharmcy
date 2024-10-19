module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  devServer: {
    host: '0.0.0.0',
    port: 80,
    https: false,
    hotOnly: false,
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'https://pharmcyapi.couthz.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    },
    before: app => {}
  }
}
