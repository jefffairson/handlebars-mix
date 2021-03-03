// Used for path manipulations
const path = require("path");

// Laravel mix main dep
let mix = require('laravel-mix');

// Use browser sync
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

// Configure handlebars, project data are stored as json in the data folder
const HandlebarsPlugin = require("handlebars-webpack-plugin");
const mergeJSON = require('handlebars-webpack-plugin/utils/mergeJSON');
const projectData = mergeJSON(path.join(__dirname, "src/data/**/*.json"));

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
  .sass('src/assets/sass/app.scss', 'public/css')
  .setPublicPath('public');