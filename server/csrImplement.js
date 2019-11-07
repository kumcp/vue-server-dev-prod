const path = require('path');

/**
 * Generate a URL by sending HTML template + JS
 *
 * @param {*} app Express App
 * @param {String} url that application will render app
 * @param {String} serverBundleFile bundle file for rendering
 * @param {String} templateFile template html for attach bundle file
 */
const attachServeURL = app => {
    app.use('/admin', async (req, res) => {
        return res.sendFile(path.join(__dirname, '..', 'dist', 'admin-page.html'));
    });
};

module.exports = {
    attachServeURL
};
