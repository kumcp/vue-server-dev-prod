const express = require('express');

// Import WebPush class
const WebPush = require('./common/WebPushServer');

// Load config
const webPushConfig = require('./config/webPushMockConfig');

WebPush.initGlobal(webPushConfig);

const subscribers = [];

/**
 * Attach to Express server
 * Include:
 *
 * 1. Service worker registration URL
 * ```
 * GET /service-worker
 * ```
 * return registration entry point
 *
 * 2. Test URL
 * ```
 * GET /push/send-test-notification
 * ```
 * Send a test notification SIGNAL
 *
 * 3. Subscribe Endpoint
 * ```
 * POST /push/subscribe-user
 * {
 *     endpoint: "<endpoint>"
 * }
 * ```
 * subscribe user for receiving push notifications
 *
 * 4. Unsubscribe Endpoint
 * ```
 * POST /push/unsubscribe-user
 * {
 *     endpoint: "<endpoint>"
 * }
 * ```
 * unsubscribe user for not receiving push notifications
 *
 * @param {*} app
 */
const attachWebPushURL = app => {
    app.use('/service-worker', express.static(`${__dirname}/../dist/service-worker.js`));

    app.get('/push/send-test-notification', (req, res) => {
        console.log('Receive test notification');

        subscribers.map(subscriber => {
            const payload = JSON.stringify({
                message: 'Test',
                tag: 'Tag'
            });
            const subscriberKey = JSON.parse(subscriber);
            return WebPush.getGlobalInstance().sendPushNotification(subscriberKey, payload);
        });

        return res.json({ message: 'RECEIVED' });
    });

    app.post('/push/subscribe-user', (req, res) => {
        subscribers.push(JSON.stringify(req.body.endpoint));

        return res.json({ message: 'SUBCRIBED' });
    });

    app.post('/push/unsubscribe-user', (req, res) => {
        subscribers.filter(subscribe => subscribe !== JSON.stringify(req.body.endpoint));

        return res.json({ message: 'UNSUBCRIBED' });
    });
};

module.exports = {
    attachWebPushURL
};
