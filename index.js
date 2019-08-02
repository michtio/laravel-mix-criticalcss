const mix = require('laravel-mix');

class Critical {
    dependencies() {
        this.requiresReload = `
            HTML Webpack critical has been installed. Please run "npm run dev" again.
        `;

        return ['html-critical-webpack-plugin'];
    }

    register(config) {
        if (!config.urls || config.urls.length <= 0) {
            throw new Error(
                'You need to provide at least 1 valid url object containing both url and template keys.'
            );
        }

        this.config = Object.assign({
            enabled: mix.inProduction(),
            paths: {},
            urls: [],
            options: {},
        }, config);

        if (this.config.paths.suffix == null) this.config.paths.suffix = '_critical.min';
    }

    webpackPlugins() {
        if (this.config.enabled) {
            const HtmlCritical = require('html-critical-webpack-plugin');
            const plugins = [];

            this.config.urls.forEach((template) => {

                const criticalSrc = this.config.paths.base + template.url;
                const criticalDest = this.config.paths.templates + template.template + this.config.paths.suffix + '.css';

                if (criticalSrc.indexOf('amp_') !== -1) {

                    this.config.options.width = 600;
                    this.config.options.height = 19200;

                }

                plugins.push(new HtmlCritical(Object.assign({
                    src: criticalSrc,
                    dest: criticalDest,
                }, this.config.options)));

            });

            return plugins;

        }

    }

}

mix.extend('criticalCss', new Critical());