/* eslint-disable */

// A BUNDLE OF HELPER FUNCTION FOR PUSH NOTIFICATION
// These are common functions used in client side for subscribe user
// (register event listening on client side).

const { WEB_PUSHER_APP_KEY } = require('../../public/public-key.json');

// global registration
let registrationGlobal = {};

/**
 * Initialize Push notification
 * @param navigator
 * @param Notification
 */
const initSubscribeUser = async (navigator, Notification) => {
    if (!(navigator && 'serviceWorker' in navigator)) {
        console.warn('SW_NOT_SUPPORT: Service worker not supported');
        throw new Error('SW_NOT_SUPPORT');
    }

    try {
        const response = await Notification.requestPermission(status => {
            console.log('Notification permission status:', status);
        });
        console.log('Notify Request Permission: ', response);

        navigator.serviceWorker.register('/service-worker');

        const registration = await navigator.serviceWorker.ready;

        console.log('[Service Worker] activated');

        registrationGlobal = registration;
    } catch (error) {
        console.log(`SERVICE_WORKER_REGISTATION_FAILED: ${error}`);
        throw new Error(`SERVICE_WORKER_REGISTATION_FAILED`);
    }

    return await subscribeUser(registrationGlobal, WEB_PUSHER_APP_KEY);
};

/**
 * Subscribe client to the push service
 * @param swRegistration
 * @param applicationServerPublicKey
 *
 * @throws `SUBSCRIBE_USER_FAILED` if subsription failed
 * @throws `PERMISSION_DENIED` if user reject to give permission for push manager
 *
 */
const subscribeUser = async (swRegistration, applicationServerPublicKey) => {
    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
    try {
        // Get the current subscription data
        let subscription = await swRegistration.pushManager.getSubscription();

        if (!subscription) {
            subscription = await swRegistration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey
            });
        }

        return subscription;
    } catch (err) {
        if (Notification.permission === 'denied') {
            console.warn(`PERMISSION_DENIED: Permission for notifications was denied: ${err}`);
            throw new Error(`PERMISSION_DENIED`);
        }

        console.error('SUBSCRIBE_USER_FAILED: Failed to subscribe the user: ', err);
        throw new Error(`SUBSCRIBE_USER_FAILED`);
    }
};

/**
 * Unsubscribe from the push service
 * @param swRegistration
 */
const unsubscribeUser = async () => {
    if (!registrationGlobal) {
        console.warn('USER_NOT_SUBSCRIBED_YET');
        return;
    }
    const swRegistration = registrationGlobal;

    const subscription = await swRegistration.pushManager.getSubscription();

    try {
        if (subscription) {
            await subscription.unsubscribe();
            console.log('User is unsubscribed');
        }
        console.log('No subscription');
    } catch (error) {
        console.log('UNSUBSCRIPTION_FAILED: Error unsubscribing', error);
        throw new Error('UNSUBSCRIPTION_FAILED');
    }
};

/**
 * Convert URL in base64 to bits
 */
const urlB64ToUint8Array = base64String => {
    console.log('UrlB64: ', base64String);
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
};

export { initSubscribeUser, subscribeUser, unsubscribeUser };
