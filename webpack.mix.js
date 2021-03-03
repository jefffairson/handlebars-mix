let mix = require('laravel-mix');

require('laravel-mix-handlebars');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

mix
  .webpackConfig(() => {
    return {
      plugins: [
        new BrowserSyncPlugin({
          watch: true,
          server: { baseDir: ['public'] }
        }),
      ]
    };
  })
  .handlebars('src/', 'public/')
  .js('src/assets/js/app.js', 'public/assets/js')
  .setPublicPath('public');