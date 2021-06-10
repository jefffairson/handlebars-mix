// Used for path manipulations
const path = require("path");
const tailwindcss = require('tailwindcss');

// Laravel mix main dep
let mix = require('laravel-mix');

// Use browser sync
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

// Configure handlebars, project data are stored as json in the data folder
var Handlebars = require('handlebars');
const HandlebarsPlugin = require("handlebars-webpack-plugin");
const mergeJSON = require('handlebars-webpack-plugin/utils/mergeJSON');
const projectData = mergeJSON(path.join(__dirname, "src/data/*.json"));
projectData.allPaths = {
  imgPath: (process.env.NODE_ENV === 'production')
    ? process.env.MIX_URL_PICS
    : 'http://localhost:3000/'
}

mix
  .webpackConfig(() => {
    return {
      resolve: {
        alias: {
          '~': path.resolve(__dirname, 'node_modules/')
        }
      },
      plugins: [
        new BrowserSyncPlugin({
          watch: true,
          watchEvents: [
            'add',
            'change',
          ],
          files: [
            'src/*.hbs',
            'src/data/*.json',
          ],
          server: { baseDir: ['public'] }
        }),
        new HandlebarsPlugin({
          entry: path.join(process.cwd(), "src", "*.hbs"),
          output: path.join(process.cwd(), "public", "[name].html"),
          data: projectData,
          partials: [
            path.join(process.cwd(), "src", "partials", "*.hbs"),
            path.join(process.cwd(), "src", "partials", "*", "*.hbs"),
            path.join(process.cwd(), "src", "layouts", "*.hbs")
          ],
          helpers: {
            assetsManifest: function(value) {
              var manifestPath = path.join(process.cwd(), "public", "mix-manifest.json");
              manifest = require(manifestPath);
              return manifest[value];
            }
          },
          onBeforeSetup: function (Handlebars) {
            var layouts = require('handlebars-layouts');
            Handlebars.registerHelper(layouts(Handlebars));
          },
        })
      ]
    };
  })
  .js('src/assets/js/app.js', 'assets/js')
  .sass('src/assets/sass/app.scss', 'assets/css/app.css')
  .options({
    processCssUrls: false,
    postCss: [ tailwindcss('./tailwind.config.js') ],
  })
  .setPublicPath('public')
  .version();