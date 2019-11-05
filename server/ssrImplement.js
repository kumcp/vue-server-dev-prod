const fs = require('fs');
const { createBundleRenderer } = require('vue-server-renderer');

/**
 * Generate a URL using SSR bundle from specific bundleFile and templateFile
 *
 * @param {*} app Express App
 * @param {String} url that application will render app
 * @param {String} serverBundleFile bundle file for rendering
 * @param {String} templateFile template html for attach bundle file
 */
const attachBundleToURL = (app, url, serverBundleFile, templateFile) => {
    try {
        // eslint-disable-next-line import/no-dynamic-require, global-require
        const jsonBundle = require(serverBundleFile);

        const renderer = createBundleRenderer(jsonBundle, {
            template: fs.readFileSync(templateFile, 'utf-8')
        });

        // specific which part will use ssr
        app.use(url, async (req, res) => {
            // chatbotBundleRenderer.renderToStream({ url: req.path }).pipe(res);
            renderer.renderToStream({ url: req.originalUrl }).pipe(res);
        });
    } catch (err) {
        console.log('attachBundleToURL: serverBundleFile has not been found. Ignore SSR');
    }
};

module.exports = {
    attachBundleToURL
};
