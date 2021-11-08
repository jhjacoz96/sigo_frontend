module.exports = {
  devServer: {
    disableHostCheck: true,
  },

  transpileDependencies: ['vuetify'],

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
  pwa: {
    name: 'Sigo',
    themeColor: '#1C3659',
    msTileColor: '#000',
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      skipWaiting: true,
    },
  },
}
