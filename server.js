const express = require('express');
const serveStatic = require('serve-static');

// Attach implementation code
const SSRImplement = require('./server/ssrImplement');
const CSRImplement = require('./server/csrImplement');

const WebPushImplement = require('./server/webPushSWImplement');

const app = express();

app.use(serveStatic(`${__dirname}/dist`));
app.use(express.json());
const port = process.env.PORT || 8081;
const hostname = '127.0.0.1';

// Using server side render (SSR) for all URL start with /ssr
SSRImplement.attachBundleToURL(
    app,
    '/ssr',
    './dist/vue-ssr-server-bundle.json',
    `${__dirname}/public/ssr-page.html`
);

// Add service-worker Web Push support
WebPushImplement.attachWebPushURL(app);

// Add CSR
CSRImplement.attachServeURL(app);

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
