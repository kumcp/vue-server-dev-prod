/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
const EventTag = {
    MESSAGE: 'message',
    NOTIFICATION: 'notification',
    WARNING: 'warning',
    SUCCESSFUL: 'successful',
    TEST: 'test'
};

/**
 * Check if notification should show with the current tab and the current event
 *
 * @param {*} client push client
 * @param {*} event push even
 * @returns {Boolean} should show noti or not
 */
const checkClientShouldShowNoti = (client, event) => {
    if (
        event &&
        (client.url.indexOf('management/message') > 0 ||
            client.url.indexOf('management/operator/message') > 0 ||
            client.url.indexOf('guest/chatbot') > 0) &&
        'focus' in client
    ) {
        return !client.focused;
    }
    return true;
};

/**
 * Check if notification should show with the current browser
 *
 * @param {*} windowClients window tab clients from browser
 * @param {*} client push client
 * @returns {Boolean} should show noti or not
 */
const checkBrowserShouldShowNoti = (windowClients, event) => {
    if (windowClients.length === 0) {
        // Always show push notification when open no tab
        // Show notification when client not open browser or focus on our page.
        return true;
    }

    // If All event tag is valid -> show
    if (Object.values(EventTag).indexOf(event.tag) > -1) {
        return true;
    }

    const shouldShowPushNoti =
        windowClients
            .map(client => checkClientShouldShowNoti(client, event))
            .filter(result => result).length > 0;

    return shouldShowPushNoti;
};

/**
 * Action right before receiving push notification
 */
self.addEventListener('push', event => {
    console.log(`Received notification ${event}`);
    let body = {
        message: 'You got a notification',
        tag: 'new notification'
    };

    if (event.data) {
        body = event.data.json();
    }

    const options = {
        body: body.message,
        tag: body.tag, // will group all notification together without create new one, so not annoying user
        renotify: false, // still keep notify user but without create new one.
        icon: '/img/icons/android-chrome-192x192.png',
        badge: '/img/icons/favicon-32x32.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1,
            url: JSON.parse(event.data.text()).url
        }
    };
    const title = body.title || 'Notification';

    const promiseChain = clients
        .matchAll({
            type: 'window'
        })
        .then(windowClients => {
            if (checkBrowserShouldShowNoti(windowClients, event)) {
                return self.registration.showNotification(title, options);
            }
            return Promise.resolve();

            // DO NOTHING CAUSE APPLICATION IS ALREADY OPEN
            // THIS WILL CAUSE A DIALOG TO SHOW ON MOBILE BROWSER CAUSE SERVICE WORKER HAS
            // NOT SHOW THE NOTIFICATION YET
            // Generally as soon as you receive a push message from GCM (Google Cloud Messaging)
            // you have to show a push notification in the browser
        });
    event.waitUntil(promiseChain);
});

/**
 * Action when click to notification.
 */
self.addEventListener('notificationclick', event => {
    console.log('[Service Worker] Notification click Received.');
    const { notification, action } = event;

    const urlEndpoint = notification.data.url;

    self.registration.getNotifications().then(notifications => {
        notifications.forEach(noti => {
            noti.close();
        });
    });

    if (action !== 'close') {
        const promiseChain = clients
            .matchAll({
                type: 'window',
                includeUncontrolled: true
            })
            .then(windowClients => {
                const matchingClient = windowClients.find(windowClient => {
                    return windowClient.url === urlEndpoint;
                });

                if (matchingClient) {
                    return matchingClient.focus();
                }
                return clients.openWindow(urlEndpoint);
            });
        event.waitUntil(promiseChain);
    }
});
