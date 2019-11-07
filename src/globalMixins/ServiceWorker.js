let globalServiceWorker;

class ServiceWorker {
    constructor(
        navigator,
        options = {
            path: '/service-worker'
        }
    ) {
        if (!ServiceWorker.checkSupport(navigator)) {
            console.warn('SW_NOT_SUPPORT: Service worker not supported');
            throw new Error('SW_NOT_SUPPORT');
        }

        this.sw = navigator.serviceWorker;
        this.options = options;
    }

    async register(path) {
        const serviceWorkerPath = path || this.options.path;

        if (!serviceWorkerPath) {
            console.error('ServiceWorker.register: service worker path has not been defined');
            throw new Error('PATH_NOT_DEFINED');
        }

        this.swRegistered = await this.sw.register(serviceWorkerPath);
        return this.swRegistered;
    }

    getRegistration() {
        if (!this.swRegistered) {
            console.error(
                'ServiceWorker.getRegistration: service worker path has not been registered'
            );
            throw new Error('NOT_REGISTERRD_YET');
        }
        return this.swRegistered;
    }

    getServiceWorker() {
        return this.sw;
    }

    static checkSupport(navigator) {
        return navigator && 'serviceWorker' in navigator;
    }

    static register(navigator, path) {
        const sw = new ServiceWorker(navigator);
        return sw.register(path);
    }

    static async registerGlobal(navigator, path) {
        try {
            globalServiceWorker = new ServiceWorker(navigator);
            await globalServiceWorker.register(path);
            return globalServiceWorker;
        } catch (error) {
            console.log(`SERVICE_WORKER_REGISTATION_FAILED: ${error}`);
            throw new Error(`SERVICE_WORKER_REGISTATION_FAILED`);
        }
    }

    static getGlobal() {
        return globalServiceWorker;
    }
}

export default ServiceWorker;
