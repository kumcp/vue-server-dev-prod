# vue-server-dev-prod

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Run your unit tests

```
npm run test:unit
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

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
