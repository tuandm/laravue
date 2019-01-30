const mix = require('laravel-mix');

function resolve(dir) {
   return path.join(__dirname, '/resources/js', dir);
}

Mix.listen('configReady', (webpackConfig) => {
   // Add "svg" to image loader test
   let imageLoaderConfig = webpackConfig.module.rules.find(rule => String(rule.test) === String(/(\.(png|jpe?g|gif|webp)$|^((?!font).)*\.svg$)/));
   imageLoaderConfig.exclude = resolve('icons');
})

mix.webpackConfig({
   resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
         'vue$': 'vue/dist/vue.esm.js',
         '@': __dirname + '/resources/js'
      },
   },
   module: {
      rules: [
         {
            test: /\.svg$/,
            loader: 'svg-sprite-loader',
            include: [resolve('icons')],
            options: {
               symbolId: 'icon-[name]'
            }
         },
      ]
   }
});

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css');
