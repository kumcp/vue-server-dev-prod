<template>
    <div class="service-worker">
        <h1>This is a test page for Service Worker</h1>
        <button-card
            title="Test notification"
            @onClickSendNotification="sendNotification"
        ></button-card>
    </div>
</template>

<script>
import ButtonCard from '@/components/Card/ButtonCard.vue';
import NotificationMixin from '../mixins/notificationMixin';

const { initSubscribeUser } = require('../../globalMixins/push-notification');

export default {
    name: 'notificationPage',
    components: {
        ButtonCard
    },
    data() {
        return {
            clientEndpoint: null
        };
    },
    mixins: [NotificationMixin],
    async mounted() {
        try {
            this.clientEndpoint = await initSubscribeUser(navigator, Notification);
            console.log('SubscribeUser successfull');

            this.subsribeServerNotification(this.clientEndpoint);
        } catch (err) {
            console.error(err);
        }
    },
    methods: {
        async sendNotification() {
            if (!this.clientEndpoint) {
                this.clientEndpoint = await initSubscribeUser(navigator, Notification);
                console.log('Re Subscribe User successfull');

                // This is the mock flow. In real case, please make sure user has been subscibed
                await this.subsribeServerNotification(this.clientEndpoint);
            }

            await this.sendTestNotification();
        }
    }
};
</script>
