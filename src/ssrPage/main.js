import Vue from 'vue';
import App from './App.vue';
import createRouter from './router';
// import store from './store';
// import './registerServiceWorker';

// Common functions
import globalMixins from '../globalMixins/mixins';

Vue.config.productionTip = false;
Vue.mixin({
    methods: globalMixins
});

export default function createApp() {
    const router = createRouter();
    const app = new Vue({
        router,
        // store,
        render: h => h(App)
    });
    return { app, router };
}
