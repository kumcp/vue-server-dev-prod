# vue-chat

This is the front-end page

## Project setup

Install npm module packages (NOTE: this function run in this folder will only install for this package)

```
npm install
```

### Compiles and hot-reloads for development

```
npm run dev
```

In package.json, `dev` is run in port 8082. Feel free to change to any port.

### Compiles and minifies for production

Please read more detail in the configuration part Section 2.3

```
npm run build
```

If you want to run in server side render mode, use:

```
npm run build:ssr
```

NOTE: in normal case you will not need ssr mode.
SSR build has been configured in `./build`. And a sample page `src/ssrPage` has been specific

### Run your tests

```
npm run test
```

#### Run your unit tests

```
npm run test:unit
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

# STRUCTURE

### Render flow (in client mode) as CSR (normal way)

```
                    URL
                     |
Server               V                                      Client (client render)
+--------------------------------------------+
|    Express -> Render following             |
|                       |            +--------------->  HTML + JS + CSS
|                       V           /        |            |
|                 entry-server.js  /         |            |        Render
|                       |         /          |            |
|                       |        /           |            V
|                       |       /            |         +------------------------+ (bundle file)
|                       |      /             |         |       .main.js         | (in dist/main.xxx.js)
|                       |     /              |         |      client logic      |
|                       |    /               |         |           |            |
|                       V   /                |         |           V            |
|             +-------------------+      (bundled)     |       (App.vue)        |
|             |                   |   ------------->   |           |            |
|             |   Server logic    |          |         |           V  ------------> Fallback in client
|             |  (client logic    |          |         |         router         |
|             |     fallback)     |          |         |           |            |
|             |                   |          |         |           |--------------> Components
|             |                   |          |         |           V            |
|             +-------------------+          |         |          ...           |
|                                            |         +------------------------+
+--------------------------------------------+

```

### Render flow (In server) in SSR (Server side renderer)

```
                    URL
                     |
Server               V                                               Client (client render)
+--------------------------------------------+
|    Express -> Render following             |
|                       |            +--------------->  HTML (have rendered)
|                       V           /        |          |         (entry-client.js)
|                 entry-server.js  /         |          |           Render (next render is
|                       |         /          |          |                    client render)
|                       |        /           |          V
|                       |       /            |         +------------------------+ (bundle file)
|                  +----+      /             |         |       .main.js         | (in dist/main.xxx.js)
|        Fallback  |    |     /              |         |      client logic      |
|                  |    +----/-----------------------> |           |            |
|                  V        /                |         |           V            |
|             +-------------------+          |         |       (App.vue)        |
|             |                   |          |         |           |            |
|             |   Server logic    |  <---------------- |           V            |
|             |  (client logic    |      Result HTML   |         router         |
|             |     fallback)     |          |         |           |            |
|             |                   |          |         |           |--------------> Components
|             |                   |          |         |           V            |
|             +-------------------+          |         |          ...           |
|                                            |         +------------------------+
+--------------------------------------------+

```

Build processs

```


```

# PROJECT CONFIGURATION

## 1. Output file

#### For running in CSR mode (normal way)

#### For running in SSR mode

There're no exactly file out put has been generated. The HTML file will be generated when there're requests

# DETAIL

## 1. Webpack

### 1.1 Webpack configuration

`webpack` in Vue now included in vue-config (section 1.2)

Vue has webpack default config. To see these current configurations, use:

```
$ vue inspect > vue.config.js
```

to export default config (note that for inspect only)

### 1.2 Vue-config

Vue config will lbe defined in `./vue.config.js`.

-   Webpack configure:

To change/override `webpack` default configuration, use the same position inside `configureWebpack`, like this:

```
module.export = {
    configureWebpack: {
        resolve: {
            alias: {
                '@': `${__dirname}/client`
            }
        }
    },
}
```

-   Entry definition:

Entry is a point to make a Single Page App (SPA), Each entry will load all components that it may have a chance to render. So, consider different purpose to use Multiple Page App (MPA) with multiple entries

```
module.export = {
    // ...
    pages: {
        index: {
            // entry for the page
            entry: 'src/index/main.js',
            // the source template
            template: 'public/index.html',
            // output as dist/index.html
            filename: 'index.html',
            // when using title option,
            // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'Index Page',
            // chunks to include on this page, by default includes
            // extracted common chunks and vendor chunks.
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        chat: {
            // another entry
            entry: 'client/chat.js',
            template: 'public/chat.html',
            filename: 'chat.html'
        },
    },
    // ...
}

```

After this one, there are 2 separate entries, but server will generate only 2 html file. The URL for accessing will be:

`http://localhost:8080/chat.html/new-page`

To change Vue-router for new entry, add this option in `vue.config.js`:

```
module.export = {
    devServer: {
        // ...
        historyApiFallback: {
            rewrites: [
                { from: /\/index/, to: '/index.html' },
                { from: /\/test-page/, to: '/test-page.html' }
            ]
        }
    }
}

// Remember to change vue-router inside entry.
```
