let mix = require('laravel-mix');

require('laravel-mix-handlebars');

mix
  .js('src/assets/js/app.js', 'public/assets/js')
  .handlebars('src/', 'public/')
  .setPublicPath('public');