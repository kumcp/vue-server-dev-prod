<template>
    <div class="service-worker">
        <h1>This is a test page for Service Worker</h1>
        <button-card
            title="Test push notification"
            :subscribing="subscribing"
            @onClickSendNotification="sendNotification"
            @onClickSubscribeNotification="subscribe"
            @onClickUnsubscribeNotification="unsubscribe"
        ></button-card>
    </div>
</template>

<script>
import ButtonCard from '../components/Card/ButtonCard.vue';
import NotificationMixin from '../mixins/notificationMixin';
import {
    initSubscribeUser,
    subscribeUser,
    unsubscribeUser,
    subsriptionStatus
} from '../../globalMixins/push-notification';

export default {
    name: 'notificationPage',
    components: {
        ButtonCard
    },
    data() {
        return {
            clientEndpoint: null,
            subscribing: false
        };
    },
    mixins: [NotificationMixin],
    async mounted() {
        try {
            await initSubscribeUser(navigator, Notification);
            await this.subscribe();
            console.log('SubscribeUser successfull');
            this.subscribing = subsriptionStatus() === 'granted';
        } catch (err) {
            console.error(err);
        }
    },
    methods: {
        async sendNotification() {
            await this.sendTestNotification();
        },
        async subscribe() {
            try {
                this.clientEndpoint = await subscribeUser();
                this.subsribeServerNotification(this.clientEndpoint);
                this.subscribing = true;
            } catch (err) {
                console.error(err);
            }
        },
        unsubscribe() {
            unsubscribeUser();
            this.subscribing = false;
            this.unsubsribeServerNotification(this.clientEndpoint);
        }
    }
};
</script>
