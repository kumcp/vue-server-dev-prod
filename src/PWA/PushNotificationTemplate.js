const EventTag = {
    MESSAGE: 'message',
    NOTIFICATION: 'notification',
    WARNING: 'warning',
    SUCCESSFUL: 'successful',
    TEST: 'test',
    ACTION_LIST: 'action-list'
};

class PushNotificationTemplate {
    static validate(clients, event) {
        return PushNotificationTemplate.checkBrowserShouldShow(clients, event);
    }

    /**
     * Check if notification should show with the current browser
     *
     * @param {*} windowClients window tab clients from browser
     * @param {*} event push event payload received from server
     *
     * @returns {Boolean} should show noti or not
     */
    static checkBrowserShouldShow(windowClients, event) {
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
                .map(client => PushNotificationTemplate.checkBrowserShouldShow(client, event))
                .filter(result => result).length > 0;

        return shouldShowPushNoti;
    }

    /**
     * Validate for each tab page
     * NOTE: notification shows once
     * @param {*} client window tab client from browser
     * @param {*} event push event payload received from server
     */
    static checkTabShouldShow(client, event) {
        if (event && 'focus' in client) {
            return !client.focused;
        }
        return true;
    }

    static generateTemplate(clients, event) {
        let body = {};
        if (event.data) {
            body = event.data.json();
        }

        return {
            title: body.title || 'You got a notification',
            body: body.message,
            tag: body.tag || EventTag.TEST, // will group all notification together without create new one, so not annoying user
            renotify: body.renotify || false, // still keep notify user but without create new one.
            icon: body.icon || '/img/icons/android-chrome-192x192.png',
            badge: body.badge || '/img/icons/favicon-32x32.png',
            vibrate: body.vibrate || [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                url: body.url
            },
            actions: body.actions || []
        };
    }
}

export default PushNotificationTemplate;
