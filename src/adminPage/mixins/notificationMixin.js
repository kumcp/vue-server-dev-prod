export default {
    methods: {
        /**
         * Send a mock test notification to server. This is just a simple API request
         */
        sendTestNotification() {
            // This is the mock test of notification only
            // API should be structured in better way
            // To simplify, we use fetch as a native JS function. You can also use
            // some other library like axios, ...
            return fetch('/push/send-test-notification', { method: 'GET' });
        },
        subsribeServerNotification(clientEndpoint) {
            return fetch('/push/subsribe-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({
                    endpoint: clientEndpoint
                })
            });
        }
    }
};
