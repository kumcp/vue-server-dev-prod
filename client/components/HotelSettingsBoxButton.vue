<template>
    <div class="component-box">
        <div class="card">
            <div class="card-header">
                <h5 class="card-title">{{ title || 'Title' }}</h5>
                <div class="card-header-button"></div>
            </div>

            <div class="card-body">
                <!-- Button to trigger box -->
                <button type="button" class="btn btn-outline-primary" @click="buttonClicked">
                    {{ buttonText || 'show Hotel Settings Box' }}
                </button>

                <!-- Settings box component -->
                <hotel-settings-box
                    v-show="showHotelSettingBox"
                    @backPreviousPage="backClicked"
                    @applied="applyHotelSettings"
                ></hotel-settings-box>
            </div>
        </div>
    </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import HotelSettingsBox from './HotelSettingsBox.vue';

export default {
    props: {},
    components: {
        HotelSettingsBox
    },
    data() {
        return {
            showHotelSettingBox: false,
            buttonText: 'show Hotel Settings',
            title: 'title'
        };
    },
    methods: {
        buttonClicked() {
            this.showHotelSettingBox = true;
        },
        backClicked() {
            this.showHotelSettingBox = false;
        },
        applyHotelSettings(objectApplied) {
            console.log('HotelSettingsBoxButton: emited appliedChangeSetting', objectApplied);
            this.$emit('appliedChangeSetting', objectApplied);
        }
    }
};
</script>

<style>
.template-exporting {
    padding: 6px;
}

.template-exporting .card-title {
    display: block;
    float: left;
    margin-bottom: 0px;
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
