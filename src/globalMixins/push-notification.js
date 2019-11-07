/* eslint-disable */

import ServiceWorker from './ServiceWorker';
import PushNotification from './PushNotification';

// A BUNDLE OF HELPER FUNCTION FOR PUSH NOTIFICATION
// These are common functions used in client side for subscribe user
// (register event listening on client side).

const { WEB_PUSHER_APP_KEY } = require('../../server/config.example/public-key.json');

/**
 * Initialize Push notification
 * @param navigator
 * @param Notification
 */
const initSubscribeUser = async (navigator, Notification) => {
    await ServiceWorker.registerGlobal(navigator);

    console.log('[Service Worker] registered');

    const response = await PushNotification.requestPermission();
    console.log('Notify Request Permission: ', response);

    const globalPusher = new PushNotification(
        ServiceWorker.getGlobal().getRegistration().pushManager,
        Notification,
        { applicationServerKey: WEB_PUSHER_APP_KEY }
    );

    PushNotification.setGlobal(globalPusher);
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
const subscribeUser = async () => {
    try {
        const globalPusher = PushNotification.getGlobal();

        const subscription = await globalPusher.subscribeIfNotExist();
        console.log('PERMISSION_GRANTED');
        console.log(subscription);

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
    if (!ServiceWorker.getGlobal().getRegistration()) {
        console.warn('USER_NOT_SUBSCRIBED_YET');
        return;
    }

    try {
        await PushNotification.getGlobal().unsubscribeIfExist();
        console.log('Unsubscription successful');
    } catch (error) {
        console.log('UNSUBSCRIPTION_FAILED: Error unsubscribing', error);
        throw new Error('UNSUBSCRIPTION_FAILED');
    }
};


const subsriptionStatus = () => {
    return Notification.permission
}

export { initSubscribeUser, subscribeUser, unsubscribeUser, subsriptionStatus };
