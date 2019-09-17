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
            // overwrite index entry for the page
            entry: 'client/main.js'
        }
    }
};
