const merge = require('webpack-merge');

const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

const baseConfig = require('./webpack.base.config.js');

module.exports = merge(baseConfig, {
    entry: './src/ssrPage/entry-client.js',
    plugins: [
        // Important: this splits the webpack runtime into a leading chunk
        // so that async chunks can be injected right after it.
        // this also enables better caching for your app/vendor code.
        // This plugins generates `vue-ssr-client-manifest.json` in the
        // output directory.
        new VueSSRClientPlugin()
    ],
    optimization: {
        splitChunks: {
            name: 'manifest',
            minChunks: Infinity
        }
    }
});
