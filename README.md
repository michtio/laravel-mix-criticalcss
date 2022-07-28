<p align="center">
<a href="https://www.npmjs.com/package/laravel-mix-criticalcss"><img src="https://img.shields.io/npm/v/laravel-mix-criticalcss.svg" alt="NPM"></a>
<a href="https://npmcharts.com/compare/laravel-mix-criticalcss?minimal=true"><img src="https://img.shields.io/npm/dt/laravel-mix-criticalcss.svg" alt="NPM"></a>
<a href="https://www.npmjs.com/package/laravel-mix-criticalcss"><img src="https://img.shields.io/npm/l/laravel-mix-criticalcss.svg" alt="NPM"></a>
</p>

# Laravel Mix Critical

This extension provides instant Critical support to your Mix (v2.1 and up) builds.

## Usage

First, install the extension.

```
npm install laravel-mix-criticalcss --save-dev
```

Then, require it within your `webpack.mix.js` file, like so:

```js
let mix = require('laravel-mix');

require('laravel-mix-criticalcss');

mix
    .js('resources/assets/js/app.js', 'public/js')
    .less('resources/assets/less/app.less', 'public/css')
    .criticalCss({
        enabled: mix.inProduction(),
        paths: {
            base: 'https://url-of-where-criticalcss-is-extracted.com/',
            templates: './css/critical', //Where css files need to be written, all these paths are relative to /public
                                         //So the example path here will be public/css/critical       
            suffix: '_critical.min'
        },
        urls: [
            { url: 'blog', template: 'blog' },
        ],
        //Now using https://github.com/addyosmani/critical v4.0.1
        options: {
            //It's important to note here you should NOT set inline:true, this will break the whole system.
            width:411,
            height:823,
            penthouse:{
                timeout:1200000
            }
        },
    });

// generates `./where-critical-css-file-needs-to-be-written/blog_critical.min.css`
```

And you're done! Compile everything down with `npm run prod`. `npm run dev` will not generate any critical css! Also make sure that your paths are correct and point to valid urls / segments of your website, whenever criticalcss has issues detecting the url, it might throw a console error!

## Options
Only `urls` is required - all other options are optional. If you don't want to use the paths object you can simply define your base and templates in the url and template options from `urls`

| Name             | Type               | Default              | Description   |
| ---------------- | ------------------ | -------------------- |-------------  |
| enabled          | `boolean`          | `mix.inProduction()` | If generating Critical CSS should be enabled |
| paths            | `object`           | `{}`                 | Takes 3 arguments `base` ( src-url ), `templates` ( folder where critical css files should be written ) and `suffix` ( filename pattern )
| urls             | `array`            | `[]`                 | An array of url objects, each with a url and template key: `{ url: 'http://example.com', template: 'index' }` |
| options          | `object`           | `{}`                 | An object of [Critical](https://github.com/addyosmani/critical#options) options |
