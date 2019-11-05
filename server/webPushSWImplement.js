const express = require('express');

// Import WebPush class
const WebPush = require('./common/WebPush');

// Load config
const webPushConfig = require('./config/webPushMockConfig');

WebPush.initGlobalWebPush(webPushConfig);

const subscribers = [];

/**
 * Attach to Express server
 *
 * @param {*} app
 */
const attachWebPushURL = app => {
    app.use('/service-worker', express.static(`${__dirname}/../dist/push-service-worker.js`));

    app.get('/push/send-test-notification', (req, res) => {
        console.log('Receive test notification');

        subscribers.map(subscriber => {
            const payload = JSON.stringify({
                message: 'Test',
                tag: 'Tag'
            });
            const subsciberKey = JSON.parse(subscriber);
            return WebPush.getGlobalWebPush().sendPushNotification(subsciberKey, payload);
        });

        return res.json({ message: 'RECEIVED' });
    });

    app.post('/push/subsribe-user', (req, res) => {
        subscribers.push(JSON.stringify(req.body.endpoint));

        return res.json({ message: 'SUBCRIBED' });
    });
};

module.exports = {
    attachWebPushURL
};
