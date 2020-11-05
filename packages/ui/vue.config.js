const path = require('path');

module.exports = {
  devServer: {
    public: 'http://localhost:8080',
    disableHostCheck: true,
    contentBase: path.join(__dirname, 'public'),
    watchOptions: {
      poll: 250,
    },
  },
  transpileDependencies: ['vuetify'],
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  },
};
