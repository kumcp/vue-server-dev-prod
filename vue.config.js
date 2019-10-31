// const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

module.exports = {
    outputDir: '../alexa-skill/dist/chatbot',
    configureWebpack: {
        resolve: {
            alias: {
                '@': `${__dirname}/src`,
                '@ssrPage': `${__dirname}/src/ssrPage`,
                '@adminPage': `${__dirname}/src/adminPage`
            }
        }
        // plugins: [new VueSSRServerPlugin()]
    },
    pages: {
        // Guest page for all pages relate to Guest side
        guestPage: {
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
                target: 'http://localhost:8081/',
                changeOrigin: true
            },
            '^/static': {
                target: 'http://localhost:8081/',
                changeOrigin: true
            },
            '^/socket.io': {
                target: 'http://localhost:8081/',
                ws: true
            }
        },
        historyApiFallback: {
            rewrites: [
                { from: /\/ssr/, to: '/ssr-page.html' },
                { from: /\/test/, to: '/test-page.html' },
                { from: /\/admin/, to: '/admin-page.html' }
            ]
        }
    }
};
