<template>
    <div class="template-exporting">
        <card-layout>
            <template v-slot:card-header>
                <div class="card-title">{{ title }}</div>
            </template>

            <template v-slot:card-body>
                <color-button class="btn-outline-primary" @click="onClickSendNotification"
                    >Send Push Notification</color-button
                >
                <br />
                Status:
                <p v-if="subscribing">Subscribed</p>
                <p v-else>Unsubscribed</p>
                <br />
                <color-button
                    v-if="!subscribing"
                    class="btn-outline-primary"
                    @click="onClickSubscribeNotification"
                    >Subscribe</color-button
                >
                <color-button
                    v-if="subscribing"
                    class="btn-outline-primary"
                    @click="onClickUnsubscribeNotification"
                    >Unsubscribe</color-button
                >
            </template>
        </card-layout>
    </div>
</template>

<script>
import ColorButton from '@/components/Input/ColorButton.vue';
import CardLayout from '@/components/ComponentLayout/CardLayout.vue';

export default {
    name: 'ButtonCard',
    components: {
        ColorButton,
        CardLayout
    },
    props: {
        title: {
            type: String,
            required: true,
            default: () => {
                console.error('TemplateExporting: Missing title. Generated default');
                return 'Title';
            }
        },
        buttonText: {
            type: String,
            default() {
                console.warn('ButtonCard: Missing buttonText. Generated default');
                return 'buttonText';
            }
        },
        subscribing: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            file: {}
        };
    },
    methods: {
        onClickSendNotification() {
            return this.$emitWarning('onClickSendNotification');
        },
        onClickSubscribeNotification() {
            return this.$emitWarning('onClickSubscribeNotification');
        },
        onClickUnsubscribeNotification() {
            return this.$emitWarning('onClickUnsubscribeNotification');
        }
    }
};
</script>

<style scoped>
.template-exporting {
    padding: 1em;
}

.template-exporting .card-title {
    display: block;
    float: left;
    padding: 0.3rem;
    font-size: 1.5rem;
}

.card-header-button {
    float: right;
}

.card-header-button button {
    margin-left: 6px;
}

.template-exporting .content {
    display: block;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    border: 1px solid #000;
    padding: 6px;
}
</style>
