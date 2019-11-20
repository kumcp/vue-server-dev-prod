let globalServiceWorker;

class ServiceWorker {
    /**
     * Create a ServiceWorker preinput
     *
     * @param {*} navigator object from browser
     * @param {*} options.path path to register service worker with server (default: `'/service-worker'`)
     */
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

    /**
     * Register a worker with the path has been defined or a specific path
     *
     * @param {string} path service worker path (default = this.options.path)
     *
     * @returns {Promise<ServiceWorkerRegistration>}
     *
     * @throws {Error('PATH_NOT_DEFINED')} if none path has been declare
     *
     */
    async register(path) {
        const serviceWorkerPath = path || this.options.path;

        if (!serviceWorkerPath) {
            console.error('ServiceWorker.register: service worker path has not been defined');
            throw new Error('PATH_NOT_DEFINED');
        }
        this.swRegistered = await this.sw.register(serviceWorkerPath);
        return this.swRegistered;
    }

    /**
     * Return registered service worker
     * @returns {ServiceWorkerRegistration}
     * @throws {Error('NOT_REGISTERED_YET')} if service worker has not been registered
     */
    getRegistration() {
        if (!this.swRegistered) {
            console.error(
                'ServiceWorker.getRegistration: service worker path has not been registered'
            );
            throw new Error('NOT_REGISTERED_YET');
        }
        return this.swRegistered;
    }

    /**
     * Return the actual Service Worker object in browser `navigator.serviceWorker`
     *
     * @return {ServiceWorkerContainer}
     */
    getServiceWorker() {
        return this.sw;
    }

    /**
     * Check if serviceWorker is support or not
     * @param {*} navigator parsed navigator
     * @returns {Boolean} serviceWorker support in navigator or not
     */
    static checkSupport(navigator) {
        return navigator && 'serviceWorker' in navigator;
    }

    /**
     * Register service worker directly from navigator
     * @param {*} navigator parsed navigator
     * @param {string} path service worker path (default = "/service-worker")
     *
     * @returns {Promise<ServiceWorkerRegistration>}
     */
    static register(navigator, path) {
        const sw = new ServiceWorker(navigator);
        return sw.register(path);
    }

    /**
     * Register service worker as a global. You can get the global service worker using:
     * ```
     * ServiceWorker.getGlobal()
     * ```
     * @param {*} navigator
     * @param {*} path
     *
     * @returns {Promise<ServiceWorkerContainer>}
     */
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

    /**
     * Return global service worker if you have registered a global. `undefined` otherwise
     *
     * @returns {Promise<ServiceWorkerContainer>}
     */
    static getGlobal() {
        return globalServiceWorker;
    }
}

export default ServiceWorker;
