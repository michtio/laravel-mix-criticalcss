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
npm install laravel-mix-critical --save-dev
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
            templates: './where-critical-css-file-needs-to-be-written/'
        },
        urls: [
            { url: 'blog', template: 'blog_critical.min.css' },
        ],
        options: {
            minify: true,
        },
    });
```

And you're done! Compile everything down with `npm run dev`.

## Options
Only `urls` is required - all other options are optional. If you don't want to use the paths object you can simply define your base and templates in the url and template options from `urls`

| Name             | Type               | Default              | Description   |
| ---------------- | ------------------ | -------------------- |-------------  |
| enabled          | `boolean`          | `mix.inProduction()` | If generating Critical CSS should be enabled |
| paths            | `object`           | `{}`                 | Takes 2 arguments `base` ( src-url ) and `templates` ( folder where critical css files should be written )
| urls             | `array`            | `[]`                 | An array of url objects, each with a src and dest: `{ src: 'http://example.com', dest: 'index_critical.min.css' }` |
| options          | `object`           | `{}`                 | An object of [Critical](https://github.com/addyosmani/critical#options) options |
