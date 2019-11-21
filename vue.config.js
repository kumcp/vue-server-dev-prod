// const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

module.exports = {
    outputDir: './dist',
    configureWebpack: {
        resolve: {
            alias: {
                '@': `${__dirname}/src`,
                '@ssrPage': `${__dirname}/src/ssrPage`,
                '@adminPage': `${__dirname}/src/adminPage`
            }
        },
        plugins: [
            // new VueSSRServerPlugin(),
        ]
    },
    pages: {
        // Guest page for all pages relate to Guest side
        ssrPage: {
            entry: 'src/ssrPage/entry-client.js',
            template: 'public/ssr-page-dev.html',
            filename: 'ssr-page.html'
        },
        // Test page for testing component (Components should be separated and independent)
        testPage: {
            entry: 'src/testPage/main.js',
            template: 'public/test-page.html',
            filename: 'test-page.html'
        },
        // Admin page for all pages relate to Admin side (Do nothing for now,)
        adminPage: {
            entry: 'src/adminPage/main.js',
            template: 'public/admin-page.html',
            filename: 'admin-page.html'
        }
    },
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://localhost:9090/',
                changeOrigin: true
            },
            '^/static': {
                target: 'http://localhost:9090/',
                changeOrigin: true
            },
            '^/socket.io': {
                target: 'http://localhost:9090/',
                ws: true
            },
            '^/(service-worker|precache-manifest)': {
                // Support Service worker. This is register URL + manifest file
                target: 'http://localhost:9090/'
            },
            '^/push/': {
                target: 'http://localhost:9090/'
            }
        },
        historyApiFallback: {
            rewrites: [
                { from: /\/ssr/, to: '/ssr-page.html' },
                { from: /\/test/, to: '/test-page.html' },
                { from: /\/admin/, to: '/admin-page.html' }
            ]
        }
    },
    pwa: {
        name: 'Dummy App',
        themeColor: '#4DBA87',
        msTileColor: '#000000',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',

        // configure the workbox plugin
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            // swSrc is required in InjectManifest mode.
            swSrc: './src/PWA/service-worker.js'
            // ...other Workbox options...
        }
    }
};
