module.exports = {
  chainWebpack: (config) => {
    config.devServer.headers({
      'Access-Control-Allow-Origin': '*',
    });

    config.externals(['@Chef/utility', 'single-spa']);
  },
  transpileDependencies: true,
  configureWebpack: {
    output: {
      libraryTarget: 'system',
    },
  },
}