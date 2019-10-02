module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                '@': `${__dirname}/client`
            }
        }
    },
    pages: {
        index: {
            entry: 'client/pages/index/main.js',
            template: 'public/index.html',
            filename: 'index.html'
        },
        testPage: {
            entry: 'client/pages/test-page/main.js',
            template: 'public/test-page.html',
            filename: 'test-page.html'
        }
    },
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://localhost:5000/api',
                ws: true,
                changeOrigin: true
            },
            '^/static': {
                target: 'http://http://localhost:5000/static'
            }
        },
        historyApiFallback: {
            rewrites: [
                { from: /\/index/, to: '/index.html' },
                { from: /\/test-page/, to: '/test-page.html' }
            ]
        }
    }
};
