import Vue from 'vue';
import Router from 'vue-router';

import About from './views/About.vue';
import Home from './views/Home.vue';

Vue.use(Router);

export default () => {
    return new Router({
        mode: 'history',
        routes: [
            {
                path: '/ssr/about',
                name: 'chatbot',
                component: About
            },
            {
                path: '/ssr/home',
                name: 'aboutPage',
                component: Home
            }
        ]
    });
};
