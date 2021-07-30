const mix = require('laravel-mix');

class Critical {
    constructor() {
        this.criticals = [];
    }

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

        const critical = Object.assign({
            enabled: mix.inProduction(),
            paths: {},
            urls: [],
            options: {},
        }, config);

        if (critical.paths.suffix == null) critical.paths.suffix = '_critical.min';

        this.criticals.push(critical)
    }

    webpackPlugins() {
        if (this.criticals.map((e) => e.enabled).some(Boolean)) {
            const HtmlCritical = require('html-critical-webpack-plugin');
            const plugins = [];

            this.criticals.forEach((critical) => {

                critical.enabled && critical.urls.forEach((template) => {
                    const criticalSrc = critical.paths.base + template.url;
                    const criticalDest = `${critical.paths.templates + template.template + critical.paths.suffix  }.css`;

                    if (criticalSrc.indexOf('amp_') !== -1) {

                        critical.options.width = 600;
                        critical.options.height = 19200;

                    }

                    plugins.push(new HtmlCritical(Object.assign({
                        src: criticalSrc,
                        dest: criticalDest,
                    }, critical.options)));
                });

            })

            return plugins;
        }
    }

}

mix.extend('criticalCss', new Critical());