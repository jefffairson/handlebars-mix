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
        new HandlebarsPlugin({
          entry: path.join(process.cwd(), "src", "*.hbs"),
          output: path.join(process.cwd(), "public", "[name].html"),
          data: path.join(__dirname, "src/data/project.json"),
        })
      ]
    };
  })
  .js('src/assets/js/app.js', 'assets/js')
