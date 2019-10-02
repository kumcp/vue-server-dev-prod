<template>
    <div class="component-test">
        <template-exporting title="Title" placeholder="Choose template file"></template-exporting>

        <hotel-settings-box-button
            :hotelList="[
                { id: 1, name: 'hotel1' },
                { id: 2, name: 'hotel2' },
                { id: 3, name: 'hotel3' },
                { id: 4, name: 'hote4' },
                { id: 5, name: 'hotel5' },
                { id: 6, name: 'hotel1' },
                { id: 7, name: 'hotel7' },
                { id: 8, name: 'bb55' },
                { id: 9, name: 'hotel9' },
                { id: 10, name: 'hotel10' },
                { id: 11, name: 'hotel12test' },
                { id: 12, name: 'hotel12' }
            ]"
            :destinationHotel="{
                name: 'Test destinationHotel'
            }"
        ></hotel-settings-box-button>
    </div>
</template>

<script>
import TemplateExporting from '@/components/TemplateExporting.vue';
import HotelSettingsBoxButton from '@/components/HotelSettingsBoxButton.vue';

export default {
    components: {
        TemplateExporting,
        HotelSettingsBoxButton
    },
    data() {
        return {};
    },
    methods: {
        downloadClicked() {
            console.log('Download clicked');
        },
        uploadClicked() {
            console.log('Upload clicked');
        }
    }
};
</script>
