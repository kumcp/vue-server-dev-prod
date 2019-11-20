let globalPusher;

class PushNotification {
    /**
     * Construct preinput Push Notification key
     * ```
     * // pushManager get from ServiceWorker registered:
     *
     * const sw = new ServiceWorker(navigator, { path: "/sw" })
     * const swRegistered = await sw.register()
     * try {
     *     await PushNotification.requestPermission();
     *     const pn = new PushNotification(
     *         swRegistered.pushManager,
     *         Notification,
     *         { applicationServerKey: <WEB_PUSHER_APP_KEY> }
     *     )
     * } catch (err) {
     *    console.log(err)
     * }
     *
     * ```
     * @param {*} pushManager (ServiceWorkerRegistration.pushManager)
     * @param {*} notification `Notification` global object from browser
     * @param {*} options.userVisibleOnly (default: `true`)
     */
    constructor(pushManager, notification = Notification, options = {}) {
        this.pushManager = pushManager;
        this.notification = notification;
        this.options = {
            userVisibleOnly: true,
            ...options
        };

        if (options.applicationServerKey) {
            this.options.applicationServerKey = PushNotification.urlB64ToUint8Array(
                options.applicationServerKey
            );
        }
    }

    /**
     * Set application server public key
     * @param {string} applicationServerKey
     */
    setPublicKey(applicationServerKey) {
        this.options.applicationServerKey = this.urlB64ToUint8Array(applicationServerKey);
    }

    /**
     * Subscribe with parameter has been parsed
     * You may need to use `.subscribeIfNotExist` to avoid some problems
     *
     * @returns {PushSubscription}
     */
    subscribe(options = this.options) {
        return this.pushManager.subscribe(options);
    }

    /**
     * Get the push subscription
     *
     * @returns {PushSubscription}
     */
    getSubscription() {
        console.log(this.pushManager);
        return this.pushManager.getSubscription();
    }

    async subscribeIfNotExist() {
        let subscription = await this.getSubscription();

        if (subscription) {
            return subscription;
        }

        subscription = await this.subscribe();

        return subscription;
    }

    async unsubscribeIfExist() {
        const subscription = await this.getSubscription();

        if (!subscription) {
            console.warn(
                'PushNotification.unsubscribeIfExist: Push notification has not been subscribed yet'
            );
            throw new Error('NOT_SUBSCRIBED_YET');
        }

        await subscription.unsubscribe();

        return subscription;
    }

    static setGlobal(pw) {
        globalPusher = pw;
    }

    static getGlobal() {
        return globalPusher;
    }

    static requestPermission(notification = Notification, afterRequestCb = () => {}) {
        return notification.requestPermission(afterRequestCb);
    }

    /**
     * Convert urlB64 to Uint8Array helper function for transform key
     * @param {*} base64String
     */
    static urlB64ToUint8Array(base64String) {
        console.log('UrlB64: ', base64String);
        const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
        const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; i += 1) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }
}

export default PushNotification;
