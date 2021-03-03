let mix = require('laravel-mix');

mix.js('src/assets/js/app.js', 'public/assets/js')
    .setPublicPath('public');