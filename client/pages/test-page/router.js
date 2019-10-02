import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import ComponentTest from './views/ComponentTest.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: '/test-page',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/component-test',
            name: 'component-test',
            component: ComponentTest
        }
    ]
});
