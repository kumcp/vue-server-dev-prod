const express = require('express');
const fs = require('fs');
const { createBundleRenderer } = require('vue-server-renderer');
const serveStatic = require('serve-static');

const app = express();
app.use(serveStatic(`${__dirname}/dist`));

const port = process.env.PORT || 5000;
const hostname = '127.0.0.1';

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

// SSR implementation
const renderer = createBundleRenderer(require('./dist/vue-ssr-server-bundle.json'), {
    template: fs.readFileSync(`${__dirname}/public/ssr-page.html`, 'utf-8')
});

// specific which part will use ssr

app.use('/ssr', async (req, res) => {
    // chatbotBundleRenderer.renderToStream({ url: req.path }).pipe(res);
    renderer.renderToStream({ url: req.originalUrl }).pipe(res);
});
