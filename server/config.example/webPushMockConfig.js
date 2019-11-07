module.exports = {
    gcmAPIKey: '<GOOGLE_CLOUD_MESSAGE_SERVER_KEY>',
    TTL: 2419200, // Default to 4 weeks!
    vapidDetails: {
        subject: `mailto:<your-email>`,
        publicKey: '<WEB_PUSHER_CERTIFICATE_PUBLIC_KEY>',
        privateKey: '<WEB_PUSHER_CERTIFICATE_PRIVATE_KEY>'
    }
};
