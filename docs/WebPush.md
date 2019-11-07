## To implement web push, you will need to follow these steps:

1. Add `web-push` library.
2. Implement `web-push` code on server side to emit event/send notifications (See [here](../server/webPushSWImplement.js) )
3. Register `service-worker` on client side. (See [key here](../public/manifest.json) ). Fill into `<GCM_SENDER_ID>`
4. Handle register `web-push` on client side. (See [key here](../public/public-key.json) and [implement code here](../src/adminPage/push-service-worker.js) ).
5. Implemet `push-service-worker` code on client side to listen event/receive notificaitions and handle logic (See [here](../src/globalMixins/push-notification.js))

## Detail

(updating)
