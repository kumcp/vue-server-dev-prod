const express = require('express');

const serveStatic = require('serve-static');

const app = express();
app.use(serveStatic(`${__dirname}/dist`));

const port = process.env.PORT || 5000;
const hostname = '127.0.0.1';

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
